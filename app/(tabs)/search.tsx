import React, { useCallback, useState } from 'react';
import { FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { RecipeCard } from '@/components/recipe-card';
import { LoadingIndicator } from '@/components/loading-indicator';
import { ErrorMessage } from '@/components/error-message';
import { searchMeals } from '@/lib/api/mealdb';
import { useThemeColors } from '@/hooks/use-theme-color';
import { Radius, Spacing, Touch } from '@/constants/theme';
import type { MealDetail } from '@/types/meal';

export default function SearchScreen() {
  const router = useRouter();
  const colors = useThemeColors();

  const [query, setQuery] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [results, setResults] = useState<MealDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const validateInput = useCallback((text: string): boolean => {
    if (text.trim() === '') {
      setValidationError('Query pencarian tidak boleh kosong');
      return false;
    }
    if (text.trim().length < 3) {
      setValidationError('Minimal 3 karakter untuk mencari resep');
      return false;
    }
    setValidationError(null);
    return true;
  }, []);

  const handleSearch = useCallback(async () => {
    if (!validateInput(query)) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const data = await searchMeals(query.trim());
      setResults(data);
    } catch (err) {
      setError('Gagal mencari resep');
    } finally {
      setLoading(false);
    }
  }, [query, validateInput]);

  const renderItem = useCallback(
    ({ item }: { item: MealDetail }) => (
      <RecipeCard
        id={item.idMeal}
        name={item.strMeal}
        thumbnail={item.strMealThumb}
        onPress={() => router.push(`/recipe/${item.idMeal}`)}
      />
    ),
    [router]
  );

  const keyExtractor = useCallback((item: MealDetail) => item.idMeal, []);

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.searchSection, { borderBottomColor: colors.separator }]}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.backgroundSecondary,
              borderColor: validationError ? colors.danger : colors.cardBorder,
              color: colors.text,
            },
          ]}
          placeholder="Cari resep... (contoh: chicken)"
          placeholderTextColor={colors.textMuted}
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            if (validationError) setValidationError(null);
          }}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          accessibilityLabel="Input pencarian resep"
          editable={!loading}
        />
        {validationError && (
          <ThemedText style={[styles.validationError, { color: colors.danger }]}>
            {validationError}
          </ThemedText>
        )}
        <Pressable
          style={({ pressed }) => [
            styles.searchButton,
            { backgroundColor: loading ? colors.textMuted : colors.tint },
            pressed && !loading && styles.buttonPressed,
          ]}
          onPress={handleSearch}
          disabled={loading}
          accessibilityLabel="Cari resep"
          accessibilityRole="button"
        >
          <ThemedText style={styles.buttonText}>
            {loading ? 'Mencari...' : 'Cari Resep'}
          </ThemedText>
        </Pressable>
      </View>

      {loading && <LoadingIndicator message="Mencari resep..." />}

      {error && !loading && (
        <ErrorMessage message={error} onRetry={handleSearch} />
      )}

      {!loading && !error && hasSearched && (
        <FlatList
          data={results}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          removeClippedSubviews
          windowSize={5}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          ListHeaderComponent={
            <ThemedText style={[styles.resultCount, { color: colors.textSecondary }]}>
              {results.length > 0
                ? `Ditemukan ${results.length} resep`
                : 'Tidak ada resep ditemukan'}
            </ThemedText>
          }
          ListEmptyComponent={
            <View style={styles.emptyResult}>
              <ThemedText style={[styles.emptyTitle, { color: colors.textSecondary }]}>
                Tidak ditemukan
              </ThemedText>
              <ThemedText style={[styles.emptyText, { color: colors.textMuted }]}>
                Tidak ada resep dengan kata kunci "{query}"
              </ThemedText>
            </View>
          }
        />
      )}

      {!loading && !error && !hasSearched && (
        <View style={styles.initialState}>
          <ThemedText style={[styles.initialTitle, { color: colors.textSecondary }]}>
            Cari Resep Makanan
          </ThemedText>
          <ThemedText style={[styles.initialText, { color: colors.textMuted }]}>
            Ketik nama resep dan tekan "Cari Resep"
          </ThemedText>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchSection: { padding: Spacing.lg, borderBottomWidth: 0.5 },
  input: {
    height: Touch.minHeight, borderWidth: 1.5, borderRadius: Radius.md,
    paddingHorizontal: Spacing.lg, fontSize: 16,
  },
  validationError: { fontSize: 12, marginTop: Spacing.xs, marginLeft: Spacing.xs },
  searchButton: {
    marginTop: Spacing.md, paddingVertical: Spacing.md, borderRadius: Radius.md,
    alignItems: 'center', minHeight: Touch.minHeight, justifyContent: 'center',
  },
  buttonPressed: { opacity: 0.85 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  list: { paddingVertical: Spacing.sm, paddingBottom: Spacing['3xl'] },
  resultCount: { fontSize: 13, paddingHorizontal: Spacing.lg, paddingBottom: Spacing.sm },
  emptyResult: { alignItems: 'center', padding: Spacing['3xl'] },
  emptyTitle: { fontSize: 18, fontWeight: '600', marginBottom: Spacing.sm },
  emptyText: { fontSize: 14, textAlign: 'center', lineHeight: 22 },
  initialState: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing['3xl'],
  },
  initialTitle: { fontSize: 20, fontWeight: '600', marginBottom: Spacing.sm },
  initialText: { fontSize: 15, textAlign: 'center', lineHeight: 22 },
});
