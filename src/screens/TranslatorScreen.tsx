import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import { COLORS, SPACING, FONTS, SIZES } from '../constants/theme';
import { ModeToggle } from '../components/ModeToggle';
import { LanguageSelector } from '../components/LanguageSelector';
import { Mode, Language } from '../types';
import { DEFAULT_SPEAKER_LANGUAGE, DEFAULT_LISTENER_LANGUAGE } from '../constants/languages';

export const TranslatorScreen: React.FC = () => {
  const [mode, setMode] = useState<Mode>('speaker');
  const [speakerLanguage, setSpeakerLanguage] = useState<Language>(DEFAULT_SPEAKER_LANGUAGE);
  const [listenerLanguage, setListenerLanguage] = useState<Language>(DEFAULT_LISTENER_LANGUAGE);
  const [translatedText, setTranslatedText] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // This will be replaced with actual translation logic later
  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    // For demo purposes, showing a sample translated text
    if (newMode === 'speaker') {
      setTranslatedText('مرحباً، كيف حالك اليوم؟');
    } else {
      setTranslatedText('Hello, how are you today?');
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
          <ScrollView style={styles.translationBox}>
            <Text style={[styles.translatedText, { fontSize: SIZES.large * zoomLevel }]}>
              {translatedText || 'Translation will appear here...'}
            </Text>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    lineHeight: SIZES.large * 1.5,
  },
}); 