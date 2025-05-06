package com.language_translator

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer
import android.util.Log
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import android.os.Handler
import android.os.Looper


class VoiceToTextModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext), RecognitionListener {

  private var speechRecognizer: SpeechRecognizer? = null
  private var reactContext: ReactApplicationContext = reactContext

  override fun getName(): String = "VoiceToText"

  @ReactMethod
  fun startListening() {
    if (SpeechRecognizer.isRecognitionAvailable(reactContext)) {
      Handler(Looper.getMainLooper()).post {
        speechRecognizer = SpeechRecognizer.createSpeechRecognizer(reactContext)
        speechRecognizer?.setRecognitionListener(this)

        val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
          putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
          putExtra(RecognizerIntent.EXTRA_CALLING_PACKAGE, reactContext.packageName)
        }

        speechRecognizer?.startListening(intent)
      }
    } else {
      sendError("Speech recognition not available on this device")
    }
  }

  @ReactMethod
  fun stopListening() {
    Handler(Looper.getMainLooper()).post {
      speechRecognizer?.stopListening()
      speechRecognizer?.cancel()
      speechRecognizer?.destroy()
      speechRecognizer = null
    }
  }


  private fun sendError(message: String) {
    reactContext
      .getJSModule(RCTDeviceEventEmitter::class.java)
      .emit("onSpeechError", message)
  }

  private fun sendResult(text: String) {
    reactContext
      .getJSModule(RCTDeviceEventEmitter::class.java)
      .emit("onSpeechResults", text)
  }

  override fun onResults(results: Bundle?) {
    val matches = results?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
    matches?.firstOrNull()?.let {
      sendResult(it)
    } ?: sendError("No results found")
  }

  override fun onError(error: Int) {
    sendError("Error code: $error")
  }

  // Unused but required
  override fun onReadyForSpeech(params: Bundle?) {}
  override fun onBeginningOfSpeech() {}
  override fun onRmsChanged(rmsdB: Float) {}
  override fun onBufferReceived(buffer: ByteArray?) {}
  override fun onEndOfSpeech() {}
  override fun onPartialResults(partialResults: Bundle?) {}
  override fun onEvent(eventType: Int, params: Bundle?) {}
}
