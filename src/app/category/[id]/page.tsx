'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RecipeCard from '@/components/custom/recipe-card';
import { categories, recipes } from '@/lib/recipes-data';
import { Category } from '@/lib/types';

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.id as string;
  const [searchQuery, setSearchQuery] = useState('');

  // Find category info
  const category = categories.find((c) => c.id === categoryId);

  // Filter recipes by category and search
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory = recipe.category.includes(categoryId as Category);
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Categoria não encontrada</h2>
          <Button onClick={() => router.push('/home')} className="bg-[#38B000] hover:bg-[#2d8c00]">
            Voltar para Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push('/home')}
                className="hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{category.icon}</span>
                <h1 className="text-xl font-bold text-gray-900">{category.name}</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Banner */}
        <div className={`bg-gradient-to-br ${category.color} rounded-2xl p-8 mb-8 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">{category.name}</h2>
              <p className="text-white/90 text-lg">
                {filteredRecipes.length} receitas disponíveis
              </p>
            </div>
            <div className="text-6xl">{category.icon}</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar nesta categoria..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-base border-2 rounded-2xl"
            />
          </div>
        </div>

        {/* Recipes Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Nenhuma receita encontrada
            </h3>
            <p className="text-gray-600 mb-6">
              Tente ajustar sua busca ou explore outras categorias
            </p>
            <Button
              onClick={() => router.push('/home')}
              className="bg-[#38B000] hover:bg-[#2d8c00]"
            >
              Voltar para Home
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
