import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList } from 'react-native';
import { COLORS, FONTS, SIZES, SPACING } from '../constants/theme';
import { Language } from '../types';
import { SUPPORTED_LANGUAGES } from '../constants/languages';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../context/ThemeContext';

interface LanguageSelectorProps {
  speakerLanguage: Language;
  listenerLanguage: Language;
  onSpeakerLanguageChange: (language: Language) => void;
  onListenerLanguageChange: (language: Language) => void;
  mode: 'speaker' | 'listener';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  speakerLanguage,
  listenerLanguage,
  onSpeakerLanguageChange,
  onListenerLanguageChange,
  mode,
}) => {
  const { themeColors } = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeSelector, setActiveSelector] = useState<'speaker' | 'listener'>('speaker');

  const renderLanguageItem = ({ item }: { item: Language }) => {
    let isActiveLang: boolean = activeSelector === 'listener' ? (listenerLanguage.code === item.code) : (speakerLanguage.code === item.code)
    return (
      <TouchableOpacity
        style={[styles.languageItem, { borderBottomColor: themeColors.borderColor }]}
        onPress={() => {
          if (activeSelector === 'speaker') {
            onSpeakerLanguageChange(item);
          } else {
            onListenerLanguageChange(item);
          }
          setIsModalVisible(false);
        }}
      >
        <Text style={[styles.languageName, { color: isActiveLang ? themeColors.primary : themeColors.text }]}>{item.name}</Text>
        <Text style={[styles.languageNativeName, { color: isActiveLang ? themeColors.primary : themeColors.text }]}>{item.nativeName}</Text>
      </TouchableOpacity>
    );
  }

  const openLanguageModal = (selector: 'speaker' | 'listener') => {
    setActiveSelector(selector);
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.languageRow}>
        <TouchableOpacity
          style={[styles.selector, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.borderColor }]}
          onPress={() => openLanguageModal(mode)}
        >
          <Text style={[styles.selectorLabel, { color: themeColors.primary }]}>{`From`}</Text>
          <Text style={[styles.selectedLanguage, { color: themeColors.text }]}>
            {mode === 'speaker' ? speakerLanguage.name : listenerLanguage.name}
          </Text>
          <Text style={[styles.selectedNativeName, { color: themeColors.text }]}>
            {mode === 'speaker' ? speakerLanguage.nativeName : listenerLanguage.nativeName}
          </Text>
        </TouchableOpacity>

        <View style={styles.arrowContainer}>
          <Icon name="swap-horiz" size={24} color={themeColors.primary} />
        </View>

        <TouchableOpacity
          style={[styles.selector, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.borderColor }]}
          onPress={() => openLanguageModal(mode === 'speaker' ? 'listener' : 'speaker')}
        >
          <Text style={[styles.selectorLabel, { color: themeColors.primary }]}>{`To`}</Text>
          <Text style={[styles.selectedLanguage, { color: themeColors.text }]}>
            {mode === 'speaker' ? listenerLanguage.name : speakerLanguage.name}
          </Text>
          <Text style={[styles.selectedNativeName, { color: themeColors.text }]}>
            {mode === 'speaker' ? listenerLanguage.nativeName : speakerLanguage.nativeName}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
          <View style={[styles.modalContent, { backgroundColor: themeColors.background }]}>
            <Text style={[styles.modalTitle, { color: themeColors.text }]}>
              Select {activeSelector === 'speaker' ? 'Speaker' : 'Listener'} Language
            </Text>
            <FlatList
              data={SUPPORTED_LANGUAGES}
              renderItem={renderLanguageItem}
              keyExtractor={(item) => item.code}
              style={styles.languageList}
            />
            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: themeColors.primary }]}
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
    marginVertical: SPACING.sm,
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selector: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    padding: SPACING.md,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  selectorLabel: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.small,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
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
  arrowContainer: {
    paddingHorizontal: SPACING.md,
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