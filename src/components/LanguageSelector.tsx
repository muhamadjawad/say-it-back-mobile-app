import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList } from 'react-native';
import { COLORS, FONTS, SIZES, SPACING } from '../constants/theme';
import { Language } from '../types';
import { SUPPORTED_LANGUAGES } from '../constants/languages';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeSelector, setActiveSelector] = useState<'speaker' | 'listener'>('speaker');

  const renderLanguageItem = ({ item }: { item: Language }) => {
    let isActiveLang: boolean = activeSelector === 'listener' ? (listenerLanguage.code === item.code) : (speakerLanguage.code === item.code)
    return (
      <TouchableOpacity
        style={styles.languageItem}
        onPress={() => {
          console.log("activeSelector", activeSelector)
          if (activeSelector === 'speaker') {
            onSpeakerLanguageChange(item);
          } else {
            onListenerLanguageChange(item);
          }
          setIsModalVisible(false);
        }}
      >
        <Text style={[styles.languageName, { color: isActiveLang ? COLORS.primary : COLORS.black }]}>{item.name}</Text>
        <Text style={[styles.languageNativeName, { color: isActiveLang ? COLORS.primary : COLORS.black }]}>{item.nativeName}</Text>
      </TouchableOpacity >
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
          style={styles.selector}
          onPress={() => openLanguageModal('speaker')}
        >
          <Text style={styles.selectorLabel}>From</Text>
          <Text style={styles.selectedLanguage}>
            {mode === 'speaker' ? speakerLanguage.name : listenerLanguage.name}
          </Text>
          <Text style={styles.selectedNativeName}>
            {mode === 'speaker' ? speakerLanguage.nativeName : listenerLanguage.nativeName}
          </Text>
        </TouchableOpacity>

        <View style={styles.arrowContainer}>
          <Icon name="arrow-forward" size={24} color={COLORS.primary} />
        </View>

        <TouchableOpacity
          style={styles.selector}
          onPress={() => openLanguageModal('listener')}
        >
          <Text style={styles.selectorLabel}>To</Text>
          <Text style={styles.selectedLanguage}>
            {mode === 'speaker' ? listenerLanguage.name : speakerLanguage.name}
          </Text>
          <Text style={styles.selectedNativeName}>
            {mode === 'speaker' ? listenerLanguage.nativeName : speakerLanguage.nativeName}
          </Text>
        </TouchableOpacity>
      </View>

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