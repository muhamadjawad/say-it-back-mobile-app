/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { TranslatorScreen } from './src/screens/TranslatorScreen';
import { COLORS } from './src/constants/theme';

export default function App() {
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
