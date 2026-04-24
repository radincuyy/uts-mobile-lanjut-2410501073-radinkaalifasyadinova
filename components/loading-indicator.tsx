import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useThemeColors } from '@/hooks/use-theme-color';
import { Spacing } from '@/constants/theme';

interface LoadingIndicatorProps {
  message?: string;
}

export function LoadingIndicator({ message = 'Memuat...' }: LoadingIndicatorProps) {
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.tint} />
      <ThemedText style={[styles.message, { color: colors.textSecondary }]}>
        {message}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing['2xl'],
  },
  message: {
    marginTop: Spacing.md,
    fontSize: 14,
  },
});
