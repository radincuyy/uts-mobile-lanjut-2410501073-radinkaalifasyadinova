import React from 'react';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useThemeColors } from '@/hooks/use-theme-color';
import { Radius, Spacing } from '@/constants/theme';

interface CategoryCardProps {
  name: string;
  thumbnail: string;
  onPress: () => void;
}

export const CategoryCard = React.memo(function CategoryCard({
  name,
  thumbnail,
  onPress,
}: CategoryCardProps) {
  const colors = useThemeColors();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.cardBorder,
        },
        pressed && styles.pressed,
      ]}
      onPress={onPress}
      accessibilityLabel={`Kategori ${name}`}
      accessibilityRole="button"
      accessibilityHint={`Buka daftar resep ${name}`}
    >
      <Image
        source={{ uri: thumbnail }}
        style={styles.image}
        contentFit="cover"
        transition={200}
      />
      <View style={[styles.nameContainer, { backgroundColor: colors.card }]}>
        <ThemedText style={styles.name} numberOfLines={1}>
          {name}
        </ThemedText>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: Spacing.sm,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  image: {
    width: '100%',
    height: 130,
  },
  nameContainer: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    alignItems: 'center',
    minHeight: 48, // Touch target minimum
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
});
