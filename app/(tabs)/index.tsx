import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CategoryCard } from '@/components/category-card';
import { LoadingIndicator } from '@/components/loading-indicator';
import { ErrorMessage } from '@/components/error-message';
import { getCategories } from '@/lib/api/mealdb';
import { useThemeColors } from '@/hooks/use-theme-color';
import { Spacing } from '@/constants/theme';
import type { Category } from '@/types/meal';

export default function HomeScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setError(null);
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError('Gagal memuat data kategori');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCategories();
  }, [fetchCategories]);

  const renderItem = useCallback(
    ({ item }: { item: Category }) => (
      <CategoryCard
        name={item.strCategory}
        thumbnail={item.strCategoryThumb}
        onPress={() => router.push(`/category/${item.strCategory}`)}
      />
    ),
    [router]
  );

  const keyExtractor = useCallback((item: Category) => item.idCategory, []);

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <LoadingIndicator message="Memuat kategori..." />
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.container}>
        <ErrorMessage message={error} onRetry={fetchCategories} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.tint}
            colors={[colors.tint]}
          />
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <ThemedText type="subtitle" style={styles.greeting}>
              Mau masak apa hari ini?
            </ThemedText>
            <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
              Pilih kategori untuk melihat resep
            </ThemedText>
          </View>
        }
        removeClippedSubviews
        initialNumToRender={8}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        windowSize={5}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: Spacing.sm, paddingBottom: Spacing['3xl'] },
  header: {
    paddingHorizontal: Spacing.sm,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  greeting: { fontSize: 22, marginBottom: Spacing.xs },
  subtitle: { fontSize: 14, lineHeight: 20 },
});
