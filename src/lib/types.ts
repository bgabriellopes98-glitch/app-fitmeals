// FitMeals AI - Types
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert';
export type Goal = 'lose' | 'gain' | 'maintain';
export type Category = 'breakfast' | 'lunch' | 'dinner' | 'snacks' | 'desserts' | 'lowcarb' | 'protein' | 'under300';

export interface Macros {
  protein: number;
  carbs: number;
  fat: number;
}

export interface Recipe {
  id: string;
  name: string;
  image: string;
  prepTime: number; // minutes
  calories: number;
  macros: Macros;
  mealType: MealType[];
  category: Category[];
  ingredients: string[];
  instructions: string[];
  servings: number;
  isFavorite?: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  goal: Goal;
  dailyCalories: number;
  avatar?: string;
}

export interface MealHistory {
  id: string;
  recipeId: string;
  date: string;
  mealType: MealType;
}

export interface ShoppingList {
  id: string;
  ingredient: string;
  checked: boolean;
}
