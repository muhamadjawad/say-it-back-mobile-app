import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES, SPACING } from '../constants/theme';
import { Mode } from '../types';

interface ModeToggleProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

export const ModeToggle: React.FC<ModeToggleProps> = ({ mode, onModeChange }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, mode === 'speaker' && styles.activeButton]}
        onPress={() => onModeChange('speaker')}
      >
        <Text style={[styles.text, mode === 'speaker' && styles.activeText]}>
          Speaker
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, mode === 'listener' && styles.activeButton]}
        onPress={() => onModeChange('listener')}
      >
        <Text style={[styles.text, mode === 'listener' && styles.activeText]}>
          Listener
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
  activeText: {
    color: COLORS.white,
  },
}); 