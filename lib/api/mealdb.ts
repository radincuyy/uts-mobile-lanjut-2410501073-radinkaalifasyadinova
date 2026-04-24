import type { Category, MealSummary, MealDetail } from '@/types/meal';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${BASE_URL}/categories.php`);

  if (!response.ok) {
    throw new Error('Gagal memuat data kategori');
  }

  const data = await response.json();
  return data.categories || [];
}

export async function getMealsByCategory(category: string): Promise<MealSummary[]> {
  const response = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);

  if (!response.ok) {
    throw new Error('Gagal memuat data resep');
  }

  const data = await response.json();
  return data.meals || [];
}

export async function getMealById(id: string): Promise<MealDetail | null> {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);

  if (!response.ok) {
    throw new Error('Gagal memuat detail resep');
  }

  const data = await response.json();

  if (!data.meals || data.meals.length === 0) {
    return null;
  }

  return data.meals[0];
}

export async function searchMeals(query: string): Promise<MealDetail[]> {
  const response = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);

  if (!response.ok) {
    throw new Error('Gagal mencari resep');
  }

  const data = await response.json();
  return data.meals || [];
}
