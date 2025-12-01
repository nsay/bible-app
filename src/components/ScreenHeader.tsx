import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Theme } from '../theme/theme';
import { TranslationOption } from '../constants/translations';
import { TranslationDropdown } from './TranslationDropdown';

type ScreenHeaderProps = {
  theme: Theme;
  translationOptions: TranslationOption[];
  selectedTranslation: string;
  onSelectTranslation: (value: string) => void;
  onToggleMenu: () => void;
  referenceLabel: string;
  onPressReference: () => void;
};

export function ScreenHeader({
  theme,
  translationOptions,
  selectedTranslation,
  onSelectTranslation,
  onToggleMenu,
  referenceLabel,
  onPressReference,
}: ScreenHeaderProps) {
  return (
    <View style={styles.headerRow}>
      <TouchableOpacity style={styles.menuButton} onPress={onToggleMenu}>
        <Text style={[styles.menuIcon, { color: theme.colors.sectionTitle }]}>☰</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.referenceButton} onPress={onPressReference} activeOpacity={0.85}>
        <Text style={[styles.referenceText, { color: theme.colors.sectionTitle }]} numberOfLines={1}>
          {referenceLabel}
        </Text>
        <Feather name="chevron-down" size={16} color={theme.colors.sectionTitle} />
      </TouchableOpacity>

      <View style={styles.actionsRow}>
        <TranslationDropdown
          options={translationOptions}
          selectedValue={selectedTranslation}
          onSelect={onSelectTranslation}
          theme={theme}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  menuButton: {
    padding: 6,
  },
  menuIcon: {
    fontSize: 22,
  },
  referenceText: {
    fontSize: 16,
    fontWeight: '600',
  },
  referenceButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 6,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexShrink: 0,
  },
});
