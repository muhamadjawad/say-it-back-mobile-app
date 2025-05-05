import { useState } from 'react';
import { Mode, Language } from '@src/types';
import { DEFAULT_SPEAKER_LANGUAGE, DEFAULT_LISTENER_LANGUAGE } from '@src/constants/languages';
import { translateText } from '@src/services/translationService';

export const useTranslate = () => {
  const [mode, setMode] = useState<Mode>('speaker');
  const [speakerLanguage, setSpeakerLanguage] = useState<Language>(DEFAULT_SPEAKER_LANGUAGE);
  const [listenerLanguage, setListenerLanguage] = useState<Language>(DEFAULT_LISTENER_LANGUAGE);
  const [translatedText, setTranslatedText] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [inputText, setInputText] = useState('');

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    setTranslatedText('');
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setIsTranslating(true);
    try {
      const sourceLang = mode === 'speaker' ? speakerLanguage.code : listenerLanguage.code;
      const targetLang = mode === 'speaker' ? listenerLanguage.code : speakerLanguage.code;

      const translated = await translateText(inputText, sourceLang, targetLang);
      setTranslatedText(translated);
    } catch (error) {
      console.error('Translation failed:', error);
      setTranslatedText('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  return {
    mode,
    speakerLanguage,
    listenerLanguage,
    translatedText,
    isTranslating,
    inputText,
    setInputText,
    setSpeakerLanguage,
    setListenerLanguage,
    handleModeChange,
    handleTranslate,
  };
}; 