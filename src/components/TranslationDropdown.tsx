import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { Theme } from '../theme/theme';
import { TranslationOption } from '../constants/translations';

type TranslationDropdownProps = {
  options: TranslationOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  theme: Theme;
};

export function TranslationDropdown({
  options,
  selectedValue,
  onSelect,
  theme,
}: TranslationDropdownProps) {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === selectedValue);

  const close = () => setOpen(false);
  const handleSelect = (value: string) => {
    onSelect(value);
    close();
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.trigger,
          {
            borderColor: theme.colors.chipBorder,
            backgroundColor: theme.colors.surfaceAlt,
          },
        ]}
        onPress={() => setOpen(true)}
        activeOpacity={0.7}
      >
        <Text style={[styles.triggerText, { color: theme.colors.text }]}>
          {selectedOption?.value ?? 'KJV'}
        </Text>
      </TouchableOpacity>

      <Modal transparent visible={open} animationType="fade">
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={close} />
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.chipBorder,
              },
            ]}
          >
            {options.map((option) => {
              const isActive = option.value === selectedValue;
              return (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionRow,
                    isActive && { backgroundColor: theme.colors.bookPillBg },
                  ]}
                  onPress={() => handleSelect(option.value)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      { color: isActive ? theme.colors.sectionTitle : theme.colors.text },
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    minWidth: 70,
    alignItems: 'center',
  },
  triggerText: {
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  modalContent: {
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 8,
  },
  optionRow: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: 14,
  },
});
