import Foundation
import Speech
import React

@objc(VoiceToText)
class VoiceToText: NSObject, RCTBridgeModule, SFSpeechRecognizerDelegate {
  private let speechRecognizer = SFSpeechRecognizer(locale: Locale(identifier: "en-US"))
  private var recognitionRequest: SFSpeechAudioBufferRecognitionRequest?
  private var recognitionTask: SFSpeechRecognitionTask?
  private let audioEngine = AVAudioEngine()
  private var hasPermission = false

  static func moduleName() -> String! {
    return "VoiceToText"
  }

  static func requiresMainQueueSetup() -> Bool {
    return true
  }

  @objc(startListening)
  func startListening() {
    SFSpeechRecognizer.requestAuthorization { authStatus in
      DispatchQueue.main.async {
        switch authStatus {
        case .authorized:
          self.startSpeechRecognition()
        default:
          self.sendError("Speech recognition not authorized")
        }
      }
    }
  }

  @objc(stopListening)
  func stopListening() {
    audioEngine.stop()
    recognitionRequest?.endAudio()
    recognitionTask?.cancel()
    recognitionTask = nil
  }

  private func startSpeechRecognition() {
    do {
      recognitionRequest = SFSpeechAudioBufferRecognitionRequest()

      let audioSession = AVAudioSession.sharedInstance()
      try audioSession.setCategory(.record, mode: .measurement, options: .duckOthers)
      try audioSession.setActive(true, options: .notifyOthersOnDeactivation)

      let inputNode = audioEngine.inputNode
      guard let recognitionRequest = recognitionRequest else {
        sendError("Unable to create recognition request")
        return
      }

      recognitionRequest.shouldReportPartialResults = false

      recognitionTask = speechRecognizer?.recognitionTask(with: recognitionRequest) { result, error in
        if let result = result {
          if result.isFinal {
            self.sendResult(result.bestTranscription.formattedString)
            self.stopListening()
          }
        } else if let error = error {
          self.sendError(error.localizedDescription)
        }
      }

      let recordingFormat = inputNode.outputFormat(forBus: 0)
      inputNode.installTap(onBus: 0, bufferSize: 1024, format: recordingFormat) { buffer, _ in
        self.recognitionRequest?.append(buffer)
      }

      audioEngine.prepare()
      try audioEngine.start()
    } catch {
      sendError("Audio engine couldn't start: \(error.localizedDescription)")
    }
  }

  private func sendResult(_ text: String) {
    DispatchQueue.main.async {
      RCTSharedApplication()?.sendEvent(
        withName: "onSpeechResults",
        body: text
      )
    }
  }

  private func sendError(_ error: String) {
    DispatchQueue.main.async {
      RCTSharedApplication()?.sendEvent(
        withName: "onSpeechError",
        body: error
      )
    }
  }

  @objc
  func supportedEvents() -> [String] {
    return ["onSpeechResults", "onSpeechError"]
  }
}
