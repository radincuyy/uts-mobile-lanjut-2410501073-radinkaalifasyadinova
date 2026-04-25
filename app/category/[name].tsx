import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';

import { ThemedView } from '@/components/themed-view';
import { RecipeCard } from '@/components/recipe-card';
import { LoadingIndicator } from '@/components/loading-indicator';
import { ErrorMessage } from '@/components/error-message';
import { getMealsByCategory } from '@/lib/api/mealdb';
import { useThemeColors } from '@/hooks/use-theme-color';
import { Spacing } from '@/constants/theme';
import type { MealSummary } from '@/types/meal';

export default function CategoryScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const [meals, setMeals] = useState<MealSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMeals = useCallback(async () => {
    if (!name) return;
    try {
      setError(null);
      const data = await getMealsByCategory(name);
      setMeals(data);
    } catch (err) {
      setError('Gagal memuat data resep');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [name]);

  useEffect(() => { fetchMeals(); }, [fetchMeals]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchMeals();
  }, [fetchMeals]);

  const renderItem = useCallback(
    ({ item }: { item: MealSummary }) => (
      <RecipeCard
        id={item.idMeal}
        name={item.strMeal}
        thumbnail={item.strMealThumb}
        onPress={() => router.push(`/recipe/${item.idMeal}`)}
      />
    ),
    [router]
  );

  const keyExtractor = useCallback((item: MealSummary) => item.idMeal, []);

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <Stack.Screen options={{ title: name || 'Kategori' }} />
        <LoadingIndicator message={`Memuat resep ${name}...`} />
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.container}>
        <Stack.Screen options={{ title: name || 'Kategori' }} />
        <ErrorMessage message={error} onRetry={fetchMeals} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: `${name} (${meals.length})` }} />
      <FlatList
        data={meals}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        removeClippedSubviews
        initialNumToRender={8}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        windowSize={5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.tint}
            colors={[colors.tint]}
          />
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { paddingVertical: Spacing.sm, paddingBottom: Spacing['3xl'] },
});
