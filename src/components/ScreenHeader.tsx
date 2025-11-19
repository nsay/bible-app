import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Theme } from '../theme/theme';

type ScreenHeaderProps = {
  theme: Theme;
  title: string;
  subtitle: string;
  onToggleTheme: () => void;
};

export function ScreenHeader({ theme, title, subtitle, onToggleTheme }: ScreenHeaderProps) {
  return (
    <View style={styles.headerRow}>
      <View>
        <Text style={[styles.appTitle, { color: theme.colors.title }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: theme.colors.subtitle }]}>{subtitle}</Text>
      </View>

      <TouchableOpacity
        onPress={onToggleTheme}
        style={[styles.themeToggle, { borderColor: theme.colors.chipBorder }]}
      >
        <Text style={styles.toggleEmoji}>{theme.mode === 'dark' ? '☀️' : '🌙'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
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
