export type Mode = 'speaker' | 'listener';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export interface TranslationResult {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
  timestamp: number;
}

export interface AppState {
  mode: Mode;
  speakerLanguage: Language;
  listenerLanguage: Language;
  isRecording: boolean;
  translationHistory: TranslationResult[];
} 