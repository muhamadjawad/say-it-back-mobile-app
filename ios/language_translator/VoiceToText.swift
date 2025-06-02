import Foundation
import Speech
import AVFoundation
import React

@objc(VoiceToText)
class VoiceToText: RCTEventEmitter, SFSpeechRecognizerDelegate {
    private var speechRecognizer: SFSpeechRecognizer?
    private var recognitionRequest: SFSpeechAudioBufferRecognitionRequest?
    private var recognitionTask: SFSpeechRecognitionTask?
    private let audioEngine = AVAudioEngine()
    private var isAutoRestart = false
    
    // Required override for RCTEventEmitter
    override func supportedEvents() -> [String]! {
        return ["onSpeechResults", "onSpeechError"]
    }
    
    // Required by RCTBridgeModule
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
    
    // MARK: - Exposed Methods
    
    @objc(requestMicPermission:reject:)
    func requestMicPermission(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        SFSpeechRecognizer.requestAuthorization { authStatus in
            AVAudioSession.sharedInstance().requestRecordPermission { granted in
                DispatchQueue.main.async {
                    resolve(authStatus == .authorized && granted)
                }
            }
        }
    }
    
    @objc(startListening:isAutoRestart:)
    func startListening(_ languageCode: String?, isAutoRestart: Bool) {
        self.isAutoRestart = isAutoRestart
        
        // Cancel previous tasks if any
        stopListening()
        
        // Setup recognizer with language
        let locale = languageCode != nil ? Locale(identifier: languageCode!) : Locale.current
        speechRecognizer = SFSpeechRecognizer(locale: locale)
        speechRecognizer?.delegate = self
        
        guard let recognizer = speechRecognizer, recognizer.isAvailable else {
            sendError("Speech recognition not available")
            return
        }
        
        // Setup audio session
        do {
            let audioSession = AVAudioSession.sharedInstance()
            try audioSession.setCategory(.record, mode: .measurement, options: .duckOthers)
            try audioSession.setActive(true, options: .notifyOthersOnDeactivation)
        } catch {
            sendError("Audio session setup failed: \(error.localizedDescription)")
            return
        }
        
        // Create recognition request
        recognitionRequest = SFSpeechAudioBufferRecognitionRequest()
        guard let recognitionRequest = recognitionRequest else {
            sendError("Unable to create recognition request")
            return
        }
        
        recognitionRequest.shouldReportPartialResults = false
        
        // Configure audio engine
        let inputNode = audioEngine.inputNode
        let recordingFormat = inputNode.outputFormat(forBus: 0)
        
        inputNode.installTap(onBus: 0, bufferSize: 1024, format: recordingFormat) { buffer, _ in
            recognitionRequest.append(buffer)
        }
        
        audioEngine.prepare()
        
        do {
            try audioEngine.start()
        } catch {
            sendError("Audio engine couldn't start: \(error.localizedDescription)")
            return
        }
        
        // Start recognition task
        recognitionTask = recognizer.recognitionTask(with: recognitionRequest) { [weak self] result, error in
            guard let self = self else { return }
            
            if let result = result {
                if result.isFinal {
                    self.sendResult(result.bestTranscription.formattedString)
                    self.stopListening()
                    
                    // Auto-restart if enabled
                    if self.isAutoRestart {
                        DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
                            self.startListening(languageCode, isAutoRestart: true)
                        }
                    }
                }
            } else if let error = error {
                self.sendError(error.localizedDescription)
                self.stopListening()
            }
        }
    }
    
    @objc(stopListening)
    func stopListening() {
        audioEngine.stop()
        audioEngine.inputNode.removeTap(onBus: 0)
        recognitionRequest?.endAudio()
        recognitionTask?.cancel()
        
        recognitionRequest = nil
        recognitionTask = nil
        isAutoRestart = false
    }
    
    // MARK: - Helper Methods
    
    private func sendResult(_ text: String) {
        sendEvent(withName: "onSpeechResults", body: text)
    }
    
    private func sendError(_ message: String) {
        sendEvent(withName: "onSpeechError", body: message)
    }
    
    // MARK: - SFSpeechRecognizerDelegate
    
    func speechRecognizer(_ speechRecognizer: SFSpeechRecognizer, availabilityDidChange available: Bool) {
        if !available {
            sendError("Speech recognition became unavailable")
            stopListening()
        }
    }
}