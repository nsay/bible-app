import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Theme } from '../theme/theme';

type ErrorBannerProps = {
  message: string;
  onDismiss: () => void;
  theme: Theme;
};

export function ErrorBanner({ message, onDismiss, theme }: ErrorBannerProps) {
  return (
    <View style={[styles.errorBanner, { backgroundColor: theme.colors.errorBg }]}>
      <Text style={[styles.errorText, { color: theme.colors.errorText }]}>{message}</Text>
      <TouchableOpacity onPress={onDismiss}>
        <Text style={[styles.dismissText, { color: theme.colors.dismissText }]}>Dismiss</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  errorBanner: {
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  errorText: {
    flex: 1,
    marginRight: 12,
  },
  dismissText: {
    fontWeight: '600',
  },
});
