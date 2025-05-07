import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { COLORS, FONTS, SIZES, SPACING } from '../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SnackBarErrorType } from '@src/types/translation';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SnackbarProps {
  visible: boolean;
  message: string;
  type?: SnackBarErrorType;
  duration?: number;
  onDismiss: () => void;
}

export const Snackbar: React.FC<SnackbarProps> = ({
  visible,
  message,
  type = 'error',
  duration = 3000,
  onDismiss,
}) => {
  const translateY = new Animated.Value(100);

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(translateY, {
          toValue: 100,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          onDismiss();
        });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const getIconName = () => {
    switch (type) {
      case 'error':
        return 'error-outline';
      case 'success':
        return 'check-circle-outline';
      case 'info':
        return 'info-outline';
      default:
        return 'error-outline';
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'error':
        return COLORS.error;
      case 'success':
        return COLORS.success;
      case 'info':
        return COLORS.info;
      default:
        return COLORS.error;
    }
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          transform: [{ translateY }],
        },
      ]}
    >
      <Icon name={getIconName()} size={22} color={COLORS.white} style={styles.icon} />
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: SPACING.xl,
    left: SPACING.lg,
    right: SPACING.lg,
    padding: SPACING.md,
    borderRadius: SIZES.medium,
    flexDirection: 'row',
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
  icon: {
    marginRight: SPACING.sm,
  },
  message: {
    flex: 1,
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.white,
  },
}); 