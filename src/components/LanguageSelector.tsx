import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList } from 'react-native';
import { COLORS, FONTS, SIZES, SPACING } from '../constants/theme';
import { Language } from '../types';
import { SUPPORTED_LANGUAGES } from '../constants/languages';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
  label: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
  label,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const renderLanguageItem = ({ item }: { item: Language }) => (
    <TouchableOpacity
      style={styles.languageItem}
      onPress={() => {
        onLanguageChange(item);
        setIsModalVisible(false);
      }}
    >
      <Text style={styles.languageName}>{item.name}</Text>
      <Text style={styles.languageNativeName}>{item.nativeName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.selectedLanguage}>{selectedLanguage.name}</Text>
        <Text style={styles.selectedNativeName}>{selectedLanguage.nativeName}</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Language</Text>
            <FlatList
              data={SUPPORTED_LANGUAGES}
              renderItem={renderLanguageItem}
              keyExtractor={(item) => item.code}
              style={styles.languageList}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.md,
  },
  label: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
    marginBottom: SPACING.xs,
  },
  selector: {
    backgroundColor: COLORS.lightGray,
    padding: SPACING.md,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  selectedLanguage: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  selectedNativeName: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.small,
    color: COLORS.darkGray,
    marginTop: SPACING.xs,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    padding: SPACING.lg,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.large,
    color: COLORS.black,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  languageList: {
    maxHeight: '70%',
  },
  languageItem: {
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  languageName: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  languageNativeName: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.small,
    color: COLORS.darkGray,
    marginTop: SPACING.xs,
  },
  closeButton: {
    marginTop: SPACING.md,
    padding: SPACING.md,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.medium,
    alignItems: 'center',
  },
  closeButtonText: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
}); 