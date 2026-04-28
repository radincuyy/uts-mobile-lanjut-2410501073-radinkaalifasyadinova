import { ThemedText } from "@/components/themed-text";
import { Radius, Spacing, Touch } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-color";
import { Pressable, StyleSheet, View } from "react-native";

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorMessage({
  message = "Gagal memuat data",
  onRetry,
}: ErrorMessageProps) {
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <ThemedText style={[styles.message, { color: colors.textSecondary }]}>
        {message}
      </ThemedText>
      {onRetry && (
        <Pressable
          style={({ pressed }) => [
            styles.retryButton,
            { backgroundColor: colors.tint },
            pressed && styles.retryPressed,
          ]}
          onPress={onRetry}
          accessibilityLabel="Coba lagi memuat data"
          accessibilityRole="button"
        >
          <ThemedText style={styles.retryText}>Coba Lagi</ThemedText>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing["2xl"],
  },
  emoji: {
    fontSize: 56,
    marginBottom: Spacing.lg,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: Spacing.xl,
    lineHeight: 24,
  },
  retryButton: {
    paddingHorizontal: Spacing["3xl"],
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    minHeight: Touch.minHeight,
    justifyContent: "center",
  },
  retryPressed: {
    opacity: 0.8,
  },
  retryText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
