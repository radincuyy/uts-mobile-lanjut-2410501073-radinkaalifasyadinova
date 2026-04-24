import { create } from 'zustand';
import type { MealDetail } from '@/types/meal';

interface FavoritesState {
  favorites: MealDetail[];
  addFavorite: (meal: MealDetail) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],

  addFavorite: (meal: MealDetail) => {
    const { favorites } = get();
    const alreadyExists = favorites.some((fav) => fav.idMeal === meal.idMeal);

    if (!alreadyExists) {
      set({ favorites: [...favorites, meal] });
    }
  },

  removeFavorite: (id: string) => {
    set((state) => ({
      favorites: state.favorites.filter((fav) => fav.idMeal !== id),
    }));
  },

  isFavorite: (id: string) => {
    return get().favorites.some((fav) => fav.idMeal === id);
  },
}));
