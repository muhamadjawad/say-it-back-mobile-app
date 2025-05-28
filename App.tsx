/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { TranslatorScreen } from './src/screens/TranslatorScreen';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import SplashScreen from 'react-native-splash-screen';

const AppContent = () => {
  const { themeColors } = useTheme();

  useEffect(() => {
    if (__DEV__) {
      SplashScreen.hide(); // Instantly hide in development
    } else {
      setTimeout(() => {
        SplashScreen.hide(); // Hide after 2 seconds in production
      }, 2000);
    }
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <StatusBar barStyle={themeColors.statusBar} backgroundColor={themeColors.background} />
      <TranslatorScreen />
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
