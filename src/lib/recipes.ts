import { supabase, Recipe } from './supabase';

export async function getUserRecipes(userId: string) {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Recipe[];
}

export async function getRecipeById(recipeId: string) {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', recipeId)
    .single();
  
  if (error) throw error;
  return data as Recipe;
}

export async function createRecipe(recipe: Omit<Recipe, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('recipes')
    .insert([recipe])
    .select()
    .single();
  
  if (error) throw error;
  return data as Recipe;
}

export async function updateRecipe(recipeId: string, updates: Partial<Recipe>) {
  const { data, error } = await supabase
    .from('recipes')
    .update(updates)
    .eq('id', recipeId)
    .select()
    .single();
  
  if (error) throw error;
  return data as Recipe;
}

export async function deleteRecipe(recipeId: string) {
  const { error } = await supabase
    .from('recipes')
    .delete()
    .eq('id', recipeId);
  
  if (error) throw error;
}

export async function toggleFavorite(recipeId: string, isFavorite: boolean) {
  const { data, error } = await supabase
    .from('recipes')
    .update({ is_favorite: isFavorite })
    .eq('id', recipeId)
    .select()
    .single();
  
  if (error) throw error;
  return data as Recipe;
}

export async function getFavoriteRecipes(userId: string) {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('user_id', userId)
    .eq('is_favorite', true)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Recipe[];
}
