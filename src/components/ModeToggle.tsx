import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES, SPACING } from '../constants/theme';
import { Mode, Language } from '../types';
import { ROLE_LABELS } from '../constants/roleLabels';

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
  const speakerRole = ROLE_LABELS[speakerLanguage.code]?.speaker || 'Speaker';
  const listenerRole = ROLE_LABELS[listenerLanguage.code]?.listener || 'Listener';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, mode === 'speaker' && styles.activeButton]}
        onPress={() => onModeChange('speaker')}
      >
        <Text style={[styles.text, mode === 'speaker' && styles.activeText]}>
          Speaker
        </Text>
        <Text style={[styles.nativeText, mode === 'speaker' && styles.activeText]}>
          ({speakerRole})
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, mode === 'listener' && styles.activeButton]}
        onPress={() => onModeChange('listener')}
      >
        <Text style={[styles.text, mode === 'listener' && styles.activeText]}>
          Listener
        </Text>
        <Text style={[styles.nativeText, mode === 'listener' && styles.activeText]}>
          ({listenerRole})
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.medium,
    padding: SPACING.xs,
    marginVertical: SPACING.md,
  },
  button: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: SIZES.medium - SPACING.xs,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: COLORS.primary,
  },
  text: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
  },
  nativeText: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.small,
    color: COLORS.darkGray,
    marginTop: 2,
  },
  activeText: {
    color: COLORS.white,
  },
}); 