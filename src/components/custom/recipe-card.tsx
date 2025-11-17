'use client';

import { Recipe } from '@/lib/types';
import { Clock, Flame } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipe/${recipe.id}`}>
      <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {/* Calories Badge */}
          <div className="absolute top-3 right-3 bg-[#38B000] text-white px-3 py-1.5 rounded-full font-bold text-sm shadow-lg flex items-center gap-1">
            <Flame className="w-4 h-4" />
            {recipe.calories} kcal
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
            {recipe.name}
          </h3>

          {/* Macros */}
          <div className="flex gap-3 mb-3 text-xs">
            <div className="flex flex-col">
              <span className="text-gray-500">Proteína</span>
              <span className="font-bold text-[#38B000]">{recipe.macros.protein}g</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500">Carbs</span>
              <span className="font-bold text-gray-900">{recipe.macros.carbs}g</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500">Gordura</span>
              <span className="font-bold text-gray-900">{recipe.macros.fat}g</span>
            </div>
          </div>

          {/* Prep Time */}
          <div className="flex items-center gap-1 text-gray-600 text-sm">
            <Clock className="w-4 h-4" />
            <span>{recipe.prepTime} min</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
