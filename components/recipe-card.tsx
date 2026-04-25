import React from 'react';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useThemeColors } from '@/hooks/use-theme-color';
import { Radius, Spacing, Touch } from '@/constants/theme';

interface RecipeCardProps {
  id: string;
  name: string;
  thumbnail: string;
  onPress: () => void;
  showRemoveFavorite?: boolean;
  onRemoveFavorite?: () => void;
}

export const RecipeCard = React.memo(function RecipeCard({
  id: _id,
  name,
  thumbnail,
  onPress,
  showRemoveFavorite,
  onRemoveFavorite,
}: RecipeCardProps) {
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
      accessibilityLabel={`Resep ${name}`}
      accessibilityRole="button"
      accessibilityHint="Buka detail resep"
    >
      <Image
        source={{ uri: thumbnail }}
        style={styles.image}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.info}>
        <ThemedText style={styles.name} numberOfLines={2}>
          {name}
        </ThemedText>
        {showRemoveFavorite && (
          <Pressable
            style={({ pressed }) => [
              styles.removeButton,
              { backgroundColor: colors.dangerSoft },
              pressed && styles.removePressed,
            ]}
            onPress={(e) => {
              e.stopPropagation();
              onRemoveFavorite?.();
            }}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityLabel={`Hapus ${name} dari favorit`}
            accessibilityRole="button"
          >
            <ThemedText style={[styles.removeText, { color: colors.danger }]}>
              ✕ Hapus
            </ThemedText>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: Radius.lg,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.sm,
    overflow: 'hidden',
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  pressed: {
    opacity: 0.85,
  },
  image: {
    width: 110,
    height: 110,
  },
  info: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 21,
  },
  removeButton: {
    marginTop: Spacing.sm,
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.sm,
    minHeight: Touch.minHeight / 1.2,
    justifyContent: 'center',
  },
  removePressed: {
    opacity: 0.7,
  },
  removeText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
