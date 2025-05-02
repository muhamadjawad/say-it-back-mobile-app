import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Text, ScrollView, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import { COLORS, SPACING, FONTS, SIZES } from '../constants/theme';
import { ModeToggle } from '../components/ModeToggle';
import { LanguageSelector } from '../components/LanguageSelector';
// import { VoiceRecorder } from '../components/VoiceRecorder';
import { Mode, Language } from '../types';
import { DEFAULT_SPEAKER_LANGUAGE, DEFAULT_LISTENER_LANGUAGE } from '../constants/languages';
import { translateText } from '../services/translationService';

export const TranslatorScreen: React.FC = () => {
  const [mode, setMode] = useState<Mode>('speaker');
  const [speakerLanguage, setSpeakerLanguage] = useState<Language>(DEFAULT_SPEAKER_LANGUAGE);
  const [listenerLanguage, setListenerLanguage] = useState<Language>(DEFAULT_LISTENER_LANGUAGE);
  const [translatedText, setTranslatedText] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
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
      console.log("translated", translated)
      setTranslatedText(translated);
    } catch (error) {
      console.error('Translation failed:', error);
      setTranslatedText('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const getZoomLabel = (value: number) => {
    switch (value) {
      case 1: return '1x';
      case 1.5: return '1.5x';
      case 2: return '2x';
      case 3: return '3x';
      default: return `${value}x`;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <ModeToggle mode={mode} onModeChange={handleModeChange} />

          <LanguageSelector
            label="Speaker Language"
            selectedLanguage={speakerLanguage}
            onLanguageChange={setSpeakerLanguage}
          />

          <LanguageSelector
            label="Listener Language"
            selectedLanguage={listenerLanguage}
            onLanguageChange={setListenerLanguage}
          />

          {/* Temporary text input for testing */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Enter text to translate..."
              multiline
            />
            <Text style={styles.translateButton} onPress={handleTranslate}>
              Translate
            </Text>
          </View>

          {/* <VoiceRecorder onRecordingComplete={handleRecordingComplete} /> */}

          <View style={styles.translationContainer}>
            <View style={styles.zoomControls}>
              <Text style={styles.zoomLabel}>Zoom: {getZoomLabel(zoomLevel)}</Text>
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={3}
                step={0.5}
                value={zoomLevel}
                onValueChange={setZoomLevel}
                minimumTrackTintColor={COLORS.primary}
                maximumTrackTintColor={COLORS.gray}
                thumbTintColor={COLORS.primary}
              />
            </View>

            <Text style={styles.translationLabel}>
              {mode === 'speaker' ? 'Translated Text (Listener)' : 'Translated Text (Speaker)'}
            </Text>
            <View style={styles.translationBox}>
              <Text style={[
                styles.translatedText,
                {
                  fontSize: SIZES.large * zoomLevel,
                  lineHeight: SIZES.large * zoomLevel * 1.5,
                  paddingVertical: zoomLevel > 2 ? SPACING.md : 0
                }
              ]}>
                {isTranslating ? 'Translating...' : (translatedText || 'Translation will appear here...')}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  translationContainer: {
    marginTop: SPACING.xl,
    flex: 1,
  },
  zoomControls: {
    marginBottom: SPACING.md,
  },
  zoomLabel: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
    marginBottom: SPACING.xs,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  translationLabel: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
    marginBottom: SPACING.sm,
  },
  translationBox: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.medium,
    padding: SPACING.md,
    minHeight: 200,
  },
  translatedText: {
    fontFamily: FONTS.regular,
    color: COLORS.black,
  },
  inputContainer: {
    marginVertical: SPACING.md,
  },
  input: {
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.medium,
    padding: SPACING.md,
    fontFamily: FONTS.regular,
    fontSize: SIZES.medium,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  translateButton: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    padding: SPACING.md,
    borderRadius: SIZES.medium,
    textAlign: 'center',
    marginTop: SPACING.sm,
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
  },
}); 