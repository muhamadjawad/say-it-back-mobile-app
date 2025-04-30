import { Language } from '../types';

export const SUPPORTED_LANGUAGES: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
  },
];

export const DEFAULT_SPEAKER_LANGUAGE = SUPPORTED_LANGUAGES[0]; // English
export const DEFAULT_LISTENER_LANGUAGE = SUPPORTED_LANGUAGES[1]; // Arabic 