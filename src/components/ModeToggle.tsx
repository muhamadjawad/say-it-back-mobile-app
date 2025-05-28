import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES, SPACING } from '../constants/theme';
import { Mode, Language } from '../types';
import { ROLE_LABELS } from '../constants/roleLabels';
import { useTheme } from '../context/ThemeContext';

interface ModeToggleProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  speakerLanguage: Language;
  listenerLanguage: Language;
}

export const ModeToggle: React.FC<ModeToggleProps> = ({
  mode,
  onModeChange,
  speakerLanguage,
  listenerLanguage,
}) => {
  const { themeColors } = useTheme();
  const speakerRole = ROLE_LABELS[speakerLanguage.code]?.speaker || 'Speaker';
  const listenerRole = ROLE_LABELS[listenerLanguage.code]?.listener || 'Listener';

  return (
    <View style={[styles.container, { backgroundColor: themeColors.cardBackground }]}>
      <TouchableOpacity
        style={[styles.button, mode === 'speaker' && styles.activeButton]}
        onPress={() => onModeChange('speaker')}
      >
        <Text style={[styles.text, { color: themeColors.text }, mode === 'speaker' && styles.activeText]}>
          Speaker
        </Text>
        <Text style={[styles.nativeText, { color: themeColors.text }, mode === 'speaker' && styles.activeText]}>
          ({speakerRole})
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, mode === 'listener' && styles.activeButton]}
        onPress={() => onModeChange('listener')}
      >
        <Text style={[styles.text, { color: themeColors.text }, mode === 'listener' && styles.activeText]}>
          Listener
        </Text>
        <Text style={[styles.nativeText, { color: themeColors.text }, mode === 'listener' && styles.activeText]}>
          ({listenerRole})
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: SIZES.medium,
    padding: SPACING.xs,
    marginVertical: SPACING.md,
  },
  button: {
    flex: 1,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderRadius: SIZES.medium - SPACING.xs,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    marginHorizontal: 2,
  },
  activeButton: {
    backgroundColor: COLORS.primary,
  },
  text: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
  },
  nativeText: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.small,
    marginTop: 2,
  },
  activeText: {
    color: COLORS.white,
  },
}); 