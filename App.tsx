/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { TranslatorScreen } from './src/screens/TranslatorScreen';
import { COLORS } from './src/constants/theme';
import SplashScreen from 'react-native-splash-screen';

export default function App() {

  useEffect(() => {
    if (__DEV__) {
      SplashScreen.hide(); // Instantly hide in development
    } else {
      setTimeout(() => {
        SplashScreen.hide(); // Hide after 2 seconds in production
      }, 2000);
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <TranslatorScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
