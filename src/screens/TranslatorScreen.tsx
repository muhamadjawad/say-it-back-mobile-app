import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Slider from '@react-native-community/slider';
import { COLORS, SPACING, FONTS, SIZES } from '@src/constants/theme';
import { ModeToggle } from '@src/components/ModeToggle';
import { LanguageSelector } from '@src/components/LanguageSelector';
import { useTranslate } from '@src/hooks/useTranslate';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const TranslatorScreen: React.FC = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [isMicActive, setIsMicActive] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const {
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
  } = useTranslate();

  const handleMicPress = () => {
    setIsMicActive(!isMicActive);
    scrollViewRef.current?.scrollToEnd({ animated: true });
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

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
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
        </View>

        <View style={styles.content}>
          {/* Temporary text input for testing */}
          {/* <View style={styles.inputContainer}>
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
          </View> */}

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

      <TouchableOpacity
        style={styles.micButton}
        onPress={handleMicPress}
      >
        <Icon
          name="mic"
          size={32}
          color={isMicActive ? COLORS.primary : COLORS.darkGray}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  translationContainer: {
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
    minHeight: SCREEN_HEIGHT * 0.7,
  },
  translatedText: {
    fontFamily: FONTS.regular,
    color: COLORS.black,
  },
  inputContainer: {
    marginBottom: SPACING.md,
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
  micButton: {
    position: 'absolute',
    bottom: SPACING.xl,
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});