import { NativeModules, NativeEventEmitter, Platform, PermissionsAndroid } from 'react-native';

const { VoiceToText } = NativeModules;
const eventEmitter = new NativeEventEmitter(VoiceToText);

export const requestMicPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Microphone Permission',
        message: 'App needs access to your microphone for speech recognition',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

export const startListening = () => VoiceToText.startListening();
export const stopListening = () => VoiceToText.stopListening();

export const onSpeechResults = (callback: (text: string) => void) =>
  eventEmitter.addListener('onSpeechResults', callback);

export const onSpeechError = (callback: (error: string) => void) =>
  eventEmitter.addListener('onSpeechError', callback);
