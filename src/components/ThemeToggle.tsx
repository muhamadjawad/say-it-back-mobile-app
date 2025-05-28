import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Animated } from 'react-native';
import { COLORS, FONTS, SIZES, SPACING, ThemeType } from '../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getHeight, getWidth } from '@src/utils/funcs/helper';

interface ThemeToggleProps {
  theme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onThemeChange }) => {
  const toggleAnim = useRef(new Animated.Value(theme === 'dark' ? 1 : 0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(toggleAnim, {
      toValue: theme === 'dark' ? 1 : 0,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  }, [theme]);

  const handlePress = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    // Scale animation
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.8,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
    ]).start();

    onThemeChange(newTheme);
  };

  const toggleStyle = {
    transform: [
      {
        translateX: toggleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 28],
        }),
      },
      {
        scale: scaleAnim,
      },
    ],
    backgroundColor: toggleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [COLORS.primaryLight, COLORS.primary],
    }),
  };

  const containerStyle = {
    backgroundColor: toggleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [COLORS.lightGray, '#2C2C2C'],
    }),
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme === 'dark' ? COLORS.white : COLORS.black }]}>
        Say It Back
      </Text>
      <Animated.View style={[styles.toggleContainer, containerStyle]}>
        <TouchableOpacity
          onPress={() => { handlePress() }}
          activeOpacity={0.8}
          style={{ justifyContent: 'center' }}
        >
          <Animated.View style={[styles.toggleButton, toggleStyle]}>
            <View style={styles.toggleButtonInner}>
              <Icon
                name={theme === 'light' ? 'wb-sunny' : 'nightlight-round'}
                size={20}
                color={COLORS.white}
              />
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.large,
  },
  toggleContainer: {
    width: getWidth(16),
    height: getHeight(5),
    borderRadius: 10,
    // padding: 2,
    paddingHorizontal: getWidth(1),
    // alignItems: 'center',
    justifyContent: 'center',
  },
  toggleButton: {
    width: '55%',
    height: '90%',
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  toggleButtonInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
}); 