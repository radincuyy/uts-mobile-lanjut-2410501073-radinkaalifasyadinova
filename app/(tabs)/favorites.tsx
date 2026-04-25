import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { RecipeCard } from '@/components/recipe-card';
import { useFavoritesStore } from '@/lib/store/favorites';
import { useThemeColors } from '@/hooks/use-theme-color';
import { Spacing } from '@/constants/theme';
import type { MealDetail } from '@/types/meal';

export default function FavoritesScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const favorites = useFavoritesStore((state) => state.favorites);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  const renderItem = useCallback(
    ({ item }: { item: MealDetail }) => (
      <RecipeCard
        id={item.idMeal}
        name={item.strMeal}
        thumbnail={item.strMealThumb}
        showRemoveFavorite
        onRemoveFavorite={() => removeFavorite(item.idMeal)}
        onPress={() => router.push(`/recipe/${item.idMeal}`)}
      />
    ),
    [removeFavorite, router]
  );

  const keyExtractor = useCallback((item: MealDetail) => item.idMeal, []);

  if (favorites.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.emptyState}>
          <ThemedText type="defaultSemiBold" style={[styles.emptyTitle, { color: colors.textSecondary }]}>
            Belum ada favorit
          </ThemedText>
          <ThemedText style={[styles.emptySubtitle, { color: colors.textMuted }]}>
            Jelajahi resep dan tekan tombol "Tambah ke Favorit" untuk menyimpan resep favorit Anda
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <ThemedText style={[styles.count, { color: colors.textSecondary }]}>
            {favorites.length} resep favorit
          </ThemedText>
        }
        removeClippedSubviews
        windowSize={5}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { paddingVertical: Spacing.sm, paddingBottom: Spacing['3xl'] },
  count: { fontSize: 13, paddingHorizontal: Spacing.lg, paddingBottom: Spacing.sm },
  emptyState: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing['3xl'],
  },
  emptyTitle: { fontSize: 20, marginBottom: Spacing.md },
  emptySubtitle: { fontSize: 14, textAlign: 'center', lineHeight: 22 },
});
