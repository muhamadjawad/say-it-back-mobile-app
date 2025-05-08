import { Language } from '../types';

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en-US', name: 'English', nativeName: 'English' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'es-ES', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr-FR', name: 'French', nativeName: 'Français' },
  { code: 'de-DE', name: 'German', nativeName: 'Deutsch' },
  { code: 'hi-IN', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ur-PK', name: 'Urdu', nativeName: 'اُردُو' },
  { code: 'bn-BD', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'zh-CN', name: 'Chinese', nativeName: '中文' },
  { code: 'ja-JP', name: 'Japanese', nativeName: '日本語' },
  { code: 'ru-RU', name: 'Russian', nativeName: 'Русский' },
  { code: 'pt-PT', name: 'Portuguese', nativeName: 'Português' },
  { code: 'it-IT', name: 'Italian', nativeName: 'Italiano' },
  { code: 'ko-KR', name: 'Korean', nativeName: '한국어' },
  { code: 'tr-TR', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'id-ID', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  { code: 'fa-IR', name: 'Persian', nativeName: 'فارسی' },
  { code: 'ta-IN', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'vi-VN', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'th-TH', name: 'Thai', nativeName: 'ไทย' },
];

export const DEFAULT_SPEAKER_LANGUAGE = SUPPORTED_LANGUAGES[0]; // English
export const DEFAULT_LISTENER_LANGUAGE = SUPPORTED_LANGUAGES[6]; // Urdu 