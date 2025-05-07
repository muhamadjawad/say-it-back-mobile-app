import { TranslationRequest, TranslationResponse, TranslationError } from '../types/translation';

const MYMEMORY_API_URL = 'https://api.mymemory.translated.net/get';

export const translateText = async (
  text: string,
  sourceLanguage: string,
  targetLanguage: string
): Promise<string> => {
  try {
    const url = `${MYMEMORY_API_URL}?q=${encodeURIComponent(text)}&langpair=${sourceLanguage}|${targetLanguage}`;

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Translation failed');
    }

    const data: TranslationResponse = await response.json();
    
    if (data.responseStatus !== 200) {
      throw new Error(data.responseDetails || 'Translation failed');
    }

    return data.responseData.translatedText;
  } catch (error) {
    // console.error('Translation error:', error);
    throw error;
  }
}; 