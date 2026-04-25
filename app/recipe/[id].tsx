import { useCallback, useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { LoadingIndicator } from '@/components/loading-indicator';
import { ErrorMessage } from '@/components/error-message';
import { getMealById } from '@/lib/api/mealdb';
import { useFavoritesStore } from '@/lib/store/favorites';
import { useThemeColors } from '@/hooks/use-theme-color';
import { Radius, Spacing, Touch } from '@/constants/theme';
import { getIngredients } from '@/types/meal';
import type { MealDetail } from '@/types/meal';

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useThemeColors();
  const [meal, setMeal] = useState<MealDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const addFavorite = useFavoritesStore((s) => s.addFavorite);
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite);
  const isFavorited = id ? isFavorite(id) : false;

  const fetchMeal = useCallback(async () => {
    if (!id) return;
    try {
      setError(null);
      setLoading(true);
      const data = await getMealById(id);
      setMeal(data);
    } catch (err) {
      setError('Gagal memuat detail resep');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchMeal(); }, [fetchMeal]);

  const handleToggleFavorite = () => {
    if (!meal) return;
    if (isFavorited) removeFavorite(meal.idMeal);
    else addFavorite(meal);
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <Stack.Screen options={{ title: 'Memuat...' }} />
        <LoadingIndicator message="Memuat detail resep..." />
      </ThemedView>
    );
  }

  if (error || !meal) {
    return (
      <ThemedView style={styles.container}>
        <Stack.Screen options={{ title: 'Error' }} />
        <ErrorMessage message={error || 'Resep tidak ditemukan'} onRetry={fetchMeal} />
      </ThemedView>
    );
  }

  const ingredients = getIngredients(meal);

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: meal.strMeal }} />
      <ScrollView>
        <Image source={{ uri: meal.strMealThumb }} style={styles.image} contentFit="cover" transition={200} />

        <View style={styles.content}>
          <ThemedText style={styles.title}>{meal.strMeal}</ThemedText>

          <View style={styles.badges}>
            <View style={[styles.badge, { backgroundColor: colors.tintSoft, borderColor: colors.tint }]}>
              <ThemedText style={[styles.badgeText, { color: colors.tint }]}>
                {meal.strCategory}
              </ThemedText>
            </View>
            <View style={[styles.badge, { backgroundColor: colors.badge, borderColor: colors.separator }]}>
              <ThemedText style={[styles.badgeText, { color: colors.textSecondary }]}>
                {meal.strArea}
              </ThemedText>
            </View>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.favButton,
              {
                backgroundColor: isFavorited ? colors.dangerSoft : colors.successSoft,
                borderColor: isFavorited ? colors.danger : colors.success,
              },
              pressed && styles.favPressed,
            ]}
            onPress={handleToggleFavorite}
            accessibilityLabel={isFavorited ? 'Hapus dari favorit' : 'Tambah ke favorit'}
            accessibilityRole="button"
          >
            <ThemedText style={[
              styles.favText,
              { color: isFavorited ? colors.danger : colors.success },
            ]}>
              {isFavorited ? 'Hapus dari Favorit' : 'Tambah ke Favorit'}
            </ThemedText>
          </Pressable>

          <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <ThemedText style={[styles.sectionTitle, { color: colors.tint }]}>
              Bahan-bahan ({ingredients.length})
            </ThemedText>
            {ingredients.map((item, index) => (
              <View
                key={`${item.name}-${item.measure}`}
                style={[
                  styles.ingredientRow,
                  { borderBottomColor: colors.separator },
                  index === ingredients.length - 1 && { borderBottomWidth: 0 },
                ]}
              >
                <View style={[styles.dot, { backgroundColor: colors.tint }]} />
                <ThemedText style={styles.ingredientName}>{item.name}</ThemedText>
                <ThemedText style={[styles.ingredientMeasure, { color: colors.textSecondary }]}>
                  {item.measure}
                </ThemedText>
              </View>
            ))}
          </View>

          <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <ThemedText style={[styles.sectionTitle, { color: colors.tint }]}>
              Instruksi
            </ThemedText>
            <ThemedText style={[styles.instructions, { color: colors.text }]}>
              {meal.strInstructions}
            </ThemedText>
          </View>

          {meal.strTags && (
            <View style={styles.tagsRow}>
              {meal.strTags.split(',').map((tag, i) => (
                <View key={i} style={[styles.tag, { backgroundColor: colors.badge, borderColor: colors.cardBorder }]}>
                  <ThemedText style={[styles.tagText, { color: colors.textSecondary }]}>
                    {tag.trim()}
                  </ThemedText>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: { width: '100%', height: 280 },
  content: { padding: Spacing.lg, paddingBottom: Spacing['4xl'] },
  title: { fontSize: 24, fontWeight: '800', marginBottom: Spacing.md, lineHeight: 32 },
  badges: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.lg },
  badge: {
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.full, borderWidth: 1,
  },
  badgeText: { fontSize: 13, fontWeight: '600' },
  favButton: {
    paddingVertical: Spacing.md, borderRadius: Radius.md, alignItems: 'center',
    marginBottom: Spacing.xl, minHeight: Touch.minHeight, justifyContent: 'center',
    borderWidth: 1.5,
  },
  favPressed: { opacity: 0.8 },
  favText: { fontSize: 16, fontWeight: '700' },
  section: {
    borderRadius: Radius.lg, padding: Spacing.lg,
    marginBottom: Spacing.lg, borderWidth: 1,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: Spacing.md },
  ingredientRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: Spacing.sm, borderBottomWidth: 0.5,
  },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: Spacing.sm },
  ingredientName: { flex: 1, fontSize: 14, fontWeight: '500' },
  ingredientMeasure: { fontSize: 13 },
  instructions: { fontSize: 14, lineHeight: 24 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  tag: {
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm,
    borderRadius: Radius.full, borderWidth: 1,
  },
  tagText: { fontSize: 12 },
});
