export interface TranslationRequest {
  q: string;
  source: string;
  target: string;
}

export interface TranslationResponse {
  responseData: {
    translatedText: string;
    match: number;
  };
  quotaFinished: boolean;
  mtLangSupported: null | boolean;
  responseDetails: string;
  responseStatus: number;
  responderId: null | string;
  exception_code: null | string;
  matches: Array<{
    id: number | string;
    segment: string;
    translation: string;
    source: string;
    target: string;
    quality: number;
    reference: string | null;
    'usage-count': number;
    subject: boolean | null;
    'created-by': string;
    'last-updated-by': string;
    'create-date': string;
    'last-update-date': string;
    match: number;
    penalty: number | null;
    model?: string;
  }>;
}

export interface TranslationError {
  error: string;
}

export type SnackBarErrorType = 'error' | 'success' | 'info'