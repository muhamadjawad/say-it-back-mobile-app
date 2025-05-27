//translatorscreen
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
  Text,
  Clipboard,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { COLORS, SPACING, FONTS, SIZES } from '@src/constants/theme';
import { ModeToggle } from '@src/components/ModeToggle';
import { LanguageSelector } from '@src/components/LanguageSelector';
import { Snackbar } from '@src/components/Snackbar';
import { useTranslate } from '@src/hooks/useTranslate';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TRANSLATION_PLACEHOLDERS } from '@src/constants/placeholders';
import {
  startListening,
  stopListening,
  onSpeechResults,
  onSpeechError,
  requestMicPermission,
} from '@src/native/voiceToText';
import { SnackBarErrorType } from '@src/types/translation';
import useSnackBar from '@src/hooks/useSnackBar';
import TextZoom from '@src/components/TextZoom';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const TranslatorScreen: React.FC = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [isMicActive, setIsMicActive] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);


  const { hideSnackbar, showSnackbar, snackbar } = useSnackBar()

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
  } = useTranslate({ showSnackbar });

  const handleCopy = () => {
    Clipboard.setString(translatedText);
    showSnackbar('Content copied to clipboard', 'success');
  };

  useEffect(() => {
    const permissionCheck = async () => {
      const granted = await requestMicPermission();
      if (!granted) {
        showSnackbar('Microphone permission is required for voice translation', 'error');
      }
    };

    permissionCheck();

    const resultListener = onSpeechResults(async (iText: string) => {
      setInputText(iText);
      handleTranslate(iText);

      // Auto-restart listening without sound
      await startListening(
        mode === 'speaker' ? speakerLanguage.code : listenerLanguage.code,
        true // This indicates auto-restart (no sound)
      );
    });

    const errorListener = onSpeechError(async (error: any) => {
      let errorMessage = 'Unable to process speech. Please try again.';

      if (error?.code === 'no-speech') {
        errorMessage = 'No speech detected. Please try speaking again.';
      } else if (error?.code === 'network') {
        errorMessage = 'Network error. Please check your internet connection.';
      } else if (error?.code === 'not-allowed') {
        errorMessage = 'Microphone access was denied. Please enable it in settings.';
      }

      await startListening(
        mode === 'speaker' ? speakerLanguage.code : listenerLanguage.code,
        false // Manual start (with sound) autostart key
      )
      // showSnackbar(errorMessage, 'error');
      // setIsMicActive(false);
    });

    return () => {
      resultListener.remove();
      errorListener.remove();
    };
  }, [isMicActive, handleTranslate, showSnackbar, setInputText, mode, speakerLanguage, listenerLanguage]);

  const handleMicPress = async () => {
    if (!isMicActive) {
      setIsMicActive(true);
      // Manual start with sound
      await startListening(
        mode === 'speaker' ? speakerLanguage.code : listenerLanguage.code,
        false // Manual start (with sound) autostart key
      );
    } else {
      setIsMicActive(false);
      await stopListening(); // Will play stop sound
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

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const isRTL = (): boolean => {

    let outputLangCode: string = mode === 'speaker' ? listenerLanguage.code : speakerLanguage.code

    return ['ar', 'ur-PK', 'fa-IR', 'he-IL'].includes(outputLangCode)

  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          isFullScreen && styles.fullScreenContent
        ]}
      >
        {!isFullScreen && (
          <>
            {!isMicActive && <View style={styles.header}>
              <ModeToggle
                mode={mode}
                onModeChange={handleModeChange}
                speakerLanguage={speakerLanguage}
                listenerLanguage={listenerLanguage}
              />

              <LanguageSelector
                speakerLanguage={speakerLanguage}
                listenerLanguage={listenerLanguage}
                onSpeakerLanguageChange={setSpeakerLanguage}
                onListenerLanguageChange={setListenerLanguage}
                mode={mode}
              />
            </View>
            }
          </>
        )}


        <View style={[
          styles.content,
          isFullScreen && styles.fullScreenContent
        ]}>
          <View style={styles.translationContainer}>
            {!isFullScreen && (

              <TextZoom

                getZoomLabel={getZoomLabel}
                setZoomLevel={setZoomLevel}
                zoomLevel={zoomLevel}
              />
            )}

            {!isFullScreen && (
              <Text style={styles.translationLabel}>
                {mode === 'speaker' ? 'Translated Text (Listener)' : 'Translated Text (Speaker)'}
              </Text>
            )}

            <View style={[
              styles.translationBox,
              isFullScreen && styles.fullScreenTranslationBox
            ]}>
              <View style={styles.textAreaControls}>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={handleCopy}
                >
                  <Icon name="content-copy" size={24} color={translatedText ? COLORS.primary : COLORS.gray} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={toggleFullScreen}
                >
                  <Icon
                    name={isFullScreen ? "fullscreen-exit" : "fullscreen"}
                    size={24}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.textScrollView}>
                <Text style={[
                  styles.translatedText,
                  {
                    fontSize: SIZES.large * zoomLevel,
                    lineHeight: SIZES.large * zoomLevel * 1.5,
                    paddingVertical: zoomLevel > 2 ? SPACING.md : 0,
                    fontStyle: 'italic',
                    color: isTranslating ? COLORS.darkGray : COLORS.black,
                    textAlign: isRTL() ? 'right' : 'left',
                  }
                ]}>
                  {isTranslating ? 'Translating...' : translatedText || TRANSLATION_PLACEHOLDERS[mode === 'speaker' ? listenerLanguage.code : speakerLanguage.code]}
                </Text>
              </ScrollView>
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

      <Snackbar
        visible={snackbar.visible}
        message={snackbar.message}
        type={snackbar.type}
        onDismiss={hideSnackbar}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xs,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  content: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
  },
  translationContainer: {
    flex: 1,
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
  fullScreenContent: {
    padding: 0,
  },
  fullScreenTranslationBox: {
    minHeight: SCREEN_HEIGHT - 100, // Account for mic button
    margin: 0,
    borderRadius: 0,
  },
  textAreaControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  controlButton: {
    padding: SPACING.sm,
  },
  textScrollView: {
    flex: 1,
    paddingHorizontal: SPACING.sm
  },
});