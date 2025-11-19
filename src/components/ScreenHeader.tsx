import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Theme } from '../theme/theme';
import { TranslationOption } from '../constants/translations';
import { TranslationDropdown } from './TranslationDropdown';

type ScreenHeaderProps = {
  theme: Theme;
  title: string;
  subtitle: string;
  onToggleTheme: () => void;
  translationOptions: TranslationOption[];
  selectedTranslation: string;
  onSelectTranslation: (value: string) => void;
};

export function ScreenHeader({
  theme,
  title,
  subtitle,
  onToggleTheme,
  translationOptions,
  selectedTranslation,
  onSelectTranslation,
}: ScreenHeaderProps) {
  return (
    <View style={styles.headerRow}>
      <View>
        <Text style={[styles.appTitle, { color: theme.colors.title }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: theme.colors.subtitle }]}>{subtitle}</Text>
      </View>

      <View style={styles.actionsRow}>
        <TranslationDropdown
          options={translationOptions}
          selectedValue={selectedTranslation}
          onSelect={onSelectTranslation}
          theme={theme}
        />
        <TouchableOpacity
          onPress={onToggleTheme}
          style={[styles.themeToggle, { borderColor: theme.colors.chipBorder }]}
        >
          <Text style={styles.toggleEmoji}>{theme.mode === 'dark' ? '☀️' : '🌙'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    gap: 12,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  themeToggle: {
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  toggleEmoji: {
    fontSize: 18,
  },
});
