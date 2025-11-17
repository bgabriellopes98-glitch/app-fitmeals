'use client';

import { useParams, useRouter } from 'next/navigation';
import { recipes } from '@/lib/recipes-data';
import { ArrowLeft, Clock, Flame, Heart, Share2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState } from 'react';

export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  const recipe = recipes.find((r) => r.id === params.id);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Receita não encontrada</h2>
          <Button onClick={() => router.push('/home')} className="bg-[#38B000] hover:bg-[#2d8c00]">
            Voltar para Home
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    alert('Ingredientes adicionados à lista de compras! 🛒');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.name,
        text: `Confira essa receita fitness: ${recipe.name}`,
        url: window.location.href,
      });
    } else {
      alert('Link copiado para área de transferência!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Image */}
      <div className="relative h-[300px] sm:h-[400px] w-full">
        <Image
          src={recipe.image}
          alt={recipe.name}
          fill
          className="object-cover"
          priority
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Back Button */}
        <Button
          onClick={() => router.back()}
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-white/90 hover:bg-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            onClick={() => setIsFavorite(!isFavorite)}
            variant="ghost"
            size="icon"
            className="bg-white/90 hover:bg-white"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button
            onClick={handleShare}
            variant="ghost"
            size="icon"
            className="bg-white/90 hover:bg-white"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>

        {/* Title and Calories */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              {recipe.name}
            </h1>
            <div className="bg-[#38B000] text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg flex items-center gap-2 whitespace-nowrap">
              <Flame className="w-5 h-5" />
              {recipe.calories} kcal
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Info */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-[#38B000]" />
              <p className="text-sm text-gray-600">Tempo</p>
              <p className="font-bold text-gray-900">{recipe.prepTime} min</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🍽️</div>
              <p className="text-sm text-gray-600">Porções</p>
              <p className="font-bold text-gray-900">{recipe.servings}</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">
                {recipe.mealType.includes('breakfast') && '☕'}
                {recipe.mealType.includes('lunch') && '🍽️'}
                {recipe.mealType.includes('dinner') && '🌙'}
                {recipe.mealType.includes('snack') && '🥪'}
              </div>
              <p className="text-sm text-gray-600">Refeição</p>
              <p className="font-bold text-gray-900 text-xs">
                {recipe.mealType.join(', ')}
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">💪</div>
              <p className="text-sm text-gray-600">Categoria</p>
              <p className="font-bold text-gray-900 text-xs">Fitness</p>
            </div>
          </div>
        </div>

        {/* Macros */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Macronutrientes</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-[#38B000] to-[#2d8c00] rounded-xl p-4 text-white text-center">
              <p className="text-3xl font-bold mb-1">{recipe.macros.protein}g</p>
              <p className="text-sm opacity-90">Proteína</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white text-center">
              <p className="text-3xl font-bold mb-1">{recipe.macros.carbs}g</p>
              <p className="text-sm opacity-90">Carboidratos</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white text-center">
              <p className="text-3xl font-bold mb-1">{recipe.macros.fat}g</p>
              <p className="text-sm opacity-90">Gorduras</p>
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Ingredientes</h2>
            <Button
              onClick={handleAddToCart}
              variant="outline"
              size="sm"
              className="border-[#38B000] text-[#38B000] hover:bg-[#38B000] hover:text-white"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Adicionar à lista
            </Button>
          </div>
          <ul className="space-y-3">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#38B000] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <span className="text-gray-700">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Modo de Preparo</h2>
          <ol className="space-y-4">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#38B000] to-[#2d8c00] text-white flex items-center justify-center font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray-700 pt-1">{instruction}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Meal Replacement Suggestion */}
        <div className="bg-gradient-to-r from-[#38B000] to-[#2d8c00] rounded-2xl p-6 text-white shadow-lg">
          <h2 className="text-xl font-bold mb-3">💡 Sugestão de Substituição</h2>
          <p className="text-white/90 mb-4">
            Esta receita é perfeita para substituir o seu{' '}
            <span className="font-bold">
              {recipe.mealType.includes('breakfast') && 'café da manhã'}
              {recipe.mealType.includes('lunch') && 'almoço'}
              {recipe.mealType.includes('dinner') && 'jantar'}
              {recipe.mealType.includes('snack') && 'lanche'}
            </span>
            , fornecendo {recipe.calories} calorias e {recipe.macros.protein}g de proteína.
          </p>
          <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-sm text-white/90">
              <strong>Dica:</strong> Ideal para quem busca uma refeição balanceada e nutritiva 
              que se encaixa perfeitamente em uma dieta fitness.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
