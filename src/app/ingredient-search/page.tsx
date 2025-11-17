'use client';

import { useState } from 'react';
import { Search, ChefHat, Plus, X, ArrowLeft, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import RecipeCard from '@/components/custom/recipe-card';
import { recipes } from '@/lib/recipes-data';
import { Recipe } from '@/lib/types';
import Link from 'next/link';

// Ingredientes comuns sugeridos
const commonIngredients = [
  'Ovo', 'Frango', 'Carne', 'Peixe', 'Atum',
  'Arroz', 'Batata', 'Batata Doce', 'Macarrão', 'Pão',
  'Aveia', 'Banana', 'Maçã', 'Abacate',
  'Leite', 'Queijo', 'Iogurte', 'Cream Cheese',
  'Alface', 'Tomate', 'Cebola', 'Alho', 'Espinafre', 'Brócolis',
  'Azeite', 'Manteiga', 'Maionese',
  'Feijão', 'Lentilha', 'Grão de Bico'
];

export default function IngredientSearchPage() {
  const [ingredientInput, setIngredientInput] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [matchedRecipes, setMatchedRecipes] = useState<Array<{ recipe: Recipe; matchCount: number; matchPercentage: number }>>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Adicionar ingrediente
  const addIngredient = (ingredient: string) => {
    const trimmed = ingredient.trim();
    if (trimmed && !selectedIngredients.includes(trimmed.toLowerCase())) {
      setSelectedIngredients([...selectedIngredients, trimmed.toLowerCase()]);
      setIngredientInput('');
    }
  };

  // Remover ingrediente
  const removeIngredient = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
  };

  // Buscar receitas compatíveis
  const searchRecipes = () => {
    if (selectedIngredients.length === 0) return;

    const results = recipes.map(recipe => {
      // Contar quantos ingredientes da receita o usuário tem
      const recipeIngredients = recipe.ingredients.map(ing => ing.toLowerCase());
      
      let matchCount = 0;
      selectedIngredients.forEach(userIng => {
        const hasMatch = recipeIngredients.some(recipeIng => 
          recipeIng.includes(userIng) || userIng.includes(recipeIng.split(' ')[0])
        );
        if (hasMatch) matchCount++;
      });

      const matchPercentage = Math.round((matchCount / recipeIngredients.length) * 100);

      return {
        recipe,
        matchCount,
        matchPercentage
      };
    })
    .filter(result => result.matchCount > 0) // Apenas receitas com pelo menos 1 ingrediente
    .sort((a, b) => {
      // Ordenar por: 1) maior % de match, 2) maior número de ingredientes matched
      if (b.matchPercentage !== a.matchPercentage) {
        return b.matchPercentage - a.matchPercentage;
      }
      return b.matchCount - a.matchCount;
    });

    setMatchedRecipes(results);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/home">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <ChefHat className="w-6 h-6 text-[#38B000]" />
                <h1 className="text-xl font-bold text-gray-900">Busca por Ingredientes</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Intro Section */}
        <div className="mb-8 bg-gradient-to-r from-[#38B000] to-[#2d8c00] rounded-2xl p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="bg-white/20 rounded-full p-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">O que você tem em casa?</h2>
              <p className="text-white/90">
                Adicione os ingredientes disponíveis e descubra as melhores receitas que você pode fazer agora mesmo!
              </p>
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Adicione seus ingredientes</h3>
          
          {/* Input Field */}
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Ex: ovo, frango, aveia..."
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addIngredient(ingredientInput);
                  }
                }}
                className="h-12 text-base"
              />
            </div>
            <Button 
              onClick={() => addIngredient(ingredientInput)}
              className="bg-[#38B000] hover:bg-[#2d8c00] h-12 px-6"
            >
              <Plus className="w-5 h-5 mr-2" />
              Adicionar
            </Button>
          </div>

          {/* Selected Ingredients */}
          {selectedIngredients.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Ingredientes selecionados:</p>
              <div className="flex flex-wrap gap-2">
                {selectedIngredients.map((ingredient, index) => (
                  <Badge 
                    key={index}
                    variant="secondary"
                    className="text-sm py-2 px-3 bg-[#38B000]/10 text-[#38B000] hover:bg-[#38B000]/20"
                  >
                    {ingredient}
                    <button
                      onClick={() => removeIngredient(ingredient)}
                      className="ml-2 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Common Ingredients Suggestions */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Sugestões rápidas:</p>
            <div className="flex flex-wrap gap-2">
              {commonIngredients
                .filter(ing => !selectedIngredients.includes(ing.toLowerCase()))
                .slice(0, 12)
                .map((ingredient, index) => (
                  <Badge 
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-gray-100 text-sm py-1.5 px-3"
                    onClick={() => addIngredient(ingredient)}
                  >
                    + {ingredient}
                  </Badge>
                ))}
            </div>
          </div>

          {/* Search Button */}
          {selectedIngredients.length > 0 && (
            <Button 
              onClick={searchRecipes}
              className="w-full mt-6 bg-[#38B000] hover:bg-[#2d8c00] h-12 text-base font-semibold"
            >
              <Search className="w-5 h-5 mr-2" />
              Buscar Receitas ({selectedIngredients.length} ingredientes)
            </Button>
          )}
        </div>

        {/* Results Section */}
        {hasSearched && (
          <div>
            {matchedRecipes.length > 0 ? (
              <>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Receitas Encontradas
                  </h3>
                  <p className="text-gray-600">
                    Encontramos {matchedRecipes.length} receita(s) que você pode fazer com seus ingredientes!
                  </p>
                </div>

                <div className="space-y-6">
                  {matchedRecipes.map(({ recipe, matchCount, matchPercentage }) => (
                    <div key={recipe.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                      {/* Match Badge */}
                      <div className="bg-gradient-to-r from-[#38B000] to-[#2d8c00] px-6 py-3">
                        <div className="flex items-center justify-between text-white">
                          <div className="flex items-center gap-2">
                            <div className="bg-white/20 rounded-full px-3 py-1 text-sm font-semibold">
                              {matchPercentage}% compatível
                            </div>
                            <span className="text-sm text-white/90">
                              {matchCount} de {recipe.ingredients.length} ingredientes
                            </span>
                          </div>
                          {matchPercentage >= 70 && (
                            <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-400">
                              ⭐ Recomendado
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Recipe Card */}
                      <div className="p-4">
                        <RecipeCard recipe={recipe} />
                      </div>

                      {/* Missing Ingredients */}
                      {matchPercentage < 100 && (
                        <div className="px-6 pb-4">
                          <p className="text-sm text-gray-600 mb-2">
                            Ingredientes que você ainda precisa:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {recipe.ingredients
                              .filter(recipeIng => {
                                const hasIngredient = selectedIngredients.some(userIng => 
                                  recipeIng.toLowerCase().includes(userIng) || 
                                  userIng.includes(recipeIng.toLowerCase().split(' ')[0])
                                );
                                return !hasIngredient;
                              })
                              .map((ingredient, index) => (
                                <Badge 
                                  key={index}
                                  variant="outline"
                                  className="text-xs text-gray-600"
                                >
                                  {ingredient}
                                </Badge>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl">
                <div className="text-6xl mb-4">😔</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Nenhuma receita encontrada
                </h3>
                <p className="text-gray-600 mb-4">
                  Não encontramos receitas com os ingredientes selecionados.
                </p>
                <p className="text-sm text-gray-500">
                  Tente adicionar mais ingredientes ou remover alguns para ampliar as opções.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!hasSearched && selectedIngredients.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl">
            <div className="text-6xl mb-4">🥘</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Comece adicionando ingredientes
            </h3>
            <p className="text-gray-600">
              Digite os ingredientes que você tem em casa e descubra receitas incríveis!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
