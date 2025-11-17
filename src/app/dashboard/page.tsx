'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getUserRecipes } from '@/lib/recipes';
import { Recipe } from '@/lib/supabase';
import { Search, Sparkles, Heart, Clock, Users, Flame, LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Mock data como fallback
const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    user_id: 'mock-user',
    title: 'Frango Grelhado com Legumes',
    description: 'Peito de frango grelhado acompanhado de legumes assados. Refeição completa e balanceada.',
    ingredients: ['frango', 'brócolis', 'cenoura', 'azeite', 'alho', 'sal', 'pimenta'],
    instructions: ['Tempere o frango', 'Grelhe por 6-8 minutos de cada lado', 'Asse os legumes', 'Sirva quente'],
    prep_time: 15,
    cook_time: 25,
    servings: 2,
    calories: 320,
    protein: 45,
    carbs: 12,
    fat: 8,
    category: 'almoço',
    difficulty: 'fácil',
    is_favorite: false,
    image_url: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800&h=600&fit=crop',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    user_id: 'mock-user',
    title: 'Salada Proteica de Atum',
    description: 'Salada fresca com atum, ovos cozidos e vegetais variados. Perfeita para o almoço.',
    ingredients: ['atum', 'ovo', 'alface', 'tomate', 'pepino', 'azeite', 'limão'],
    instructions: ['Cozinhe os ovos', 'Misture todos os ingredientes', 'Tempere com azeite e limão', 'Sirva gelado'],
    prep_time: 10,
    cook_time: 10,
    servings: 1,
    calories: 280,
    protein: 35,
    carbs: 8,
    fat: 12,
    category: 'almoço',
    difficulty: 'fácil',
    is_favorite: true,
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    user_id: 'mock-user',
    title: 'Smoothie Verde Energético',
    description: 'Smoothie nutritivo com espinafre, banana e proteína. Ideal para o pós-treino.',
    ingredients: ['espinafre', 'banana', 'whey protein', 'leite', 'aveia', 'mel'],
    instructions: ['Adicione todos os ingredientes no liquidificador', 'Bata até ficar homogêneo', 'Sirva imediatamente'],
    prep_time: 5,
    cook_time: 0,
    servings: 1,
    calories: 250,
    protein: 30,
    carbs: 28,
    fat: 4,
    category: 'lanche',
    difficulty: 'fácil',
    is_favorite: false,
    image_url: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800&h=600&fit=crop',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    user_id: 'mock-user',
    title: 'Omelete de Claras com Vegetais',
    description: 'Omelete leve feito com claras de ovos e vegetais frescos. Perfeito para o café da manhã.',
    ingredients: ['claras de ovo', 'tomate', 'cebola', 'pimentão', 'espinafre', 'queijo cottage'],
    instructions: ['Bata as claras', 'Refogue os vegetais', 'Adicione as claras', 'Cozinhe até firmar'],
    prep_time: 5,
    cook_time: 10,
    servings: 1,
    calories: 180,
    protein: 25,
    carbs: 10,
    fat: 3,
    category: 'café da manhã',
    difficulty: 'fácil',
    is_favorite: true,
    image_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=600&fit=crop',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    user_id: 'mock-user',
    title: 'Bowl de Quinoa e Salmão',
    description: 'Bowl nutritivo com quinoa, salmão grelhado e vegetais coloridos. Rico em ômega-3.',
    ingredients: ['quinoa', 'salmão', 'abacate', 'tomate cereja', 'rúcula', 'limão', 'azeite'],
    instructions: ['Cozinhe a quinoa', 'Grelhe o salmão', 'Monte o bowl com todos os ingredientes', 'Tempere e sirva'],
    prep_time: 10,
    cook_time: 20,
    servings: 1,
    calories: 420,
    protein: 38,
    carbs: 35,
    fat: 18,
    category: 'almoço',
    difficulty: 'médio',
    is_favorite: false,
    image_url: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=800&h=600&fit=crop',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    user_id: 'mock-user',
    title: 'Wrap Integral de Peru',
    description: 'Wrap saudável com peito de peru, vegetais e molho leve. Prático e nutritivo.',
    ingredients: ['tortilha integral', 'peito de peru', 'alface', 'tomate', 'cenoura ralada', 'iogurte grego'],
    instructions: ['Aqueça a tortilha', 'Adicione os ingredientes', 'Enrole firmemente', 'Corte ao meio e sirva'],
    prep_time: 8,
    cook_time: 2,
    servings: 1,
    calories: 290,
    protein: 28,
    carbs: 32,
    fat: 6,
    category: 'lanche',
    difficulty: 'fácil',
    is_favorite: false,
    image_url: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&h=600&fit=crop',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Função para remover duplicatas, priorizando receitas com imagem
function removeDuplicateRecipes(recipes: Recipe[]): Recipe[] {
  const recipeMap = new Map<string, Recipe>();
  
  // Ordena receitas: primeiro as com imagem, depois por data mais recente
  const sortedRecipes = [...recipes].sort((a, b) => {
    // Prioriza receitas com imagem
    if (a.image_url && !b.image_url) return -1;
    if (!a.image_url && b.image_url) return 1;
    
    // Se ambas têm ou não têm imagem, ordena por data mais recente
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
  
  // Mantém apenas a primeira ocorrência de cada título (que será a com imagem ou mais recente)
  for (const recipe of sortedRecipes) {
    if (!recipeMap.has(recipe.title)) {
      recipeMap.set(recipe.title, recipe);
    }
  }
  
  return Array.from(recipeMap.values());
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchIngredients, setSearchIngredients] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    loadUserAndRecipes();
  }, []);

  async function loadUserAndRecipes() {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        router.push('/login');
        return;
      }
      setUser(currentUser);
      
      try {
        const userRecipes = await getUserRecipes(currentUser.id);
        if (userRecipes && userRecipes.length > 0) {
          // Remove duplicatas antes de definir as receitas
          const uniqueRecipes = removeDuplicateRecipes(userRecipes);
          setRecipes(uniqueRecipes);
          setFilteredRecipes(uniqueRecipes);
          setUsingMockData(false);
        } else {
          // Se não houver receitas, use dados mock
          setRecipes(MOCK_RECIPES);
          setFilteredRecipes(MOCK_RECIPES);
          setUsingMockData(true);
        }
      } catch (fetchError) {
        console.warn('Erro ao buscar receitas do Supabase, usando dados de exemplo:', fetchError);
        // Em caso de erro de fetch, use dados mock
        setRecipes(MOCK_RECIPES);
        setFilteredRecipes(MOCK_RECIPES);
        setUsingMockData(true);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      // Em caso de erro geral, use dados mock
      setRecipes(MOCK_RECIPES);
      setFilteredRecipes(MOCK_RECIPES);
      setUsingMockData(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.warn('Erro ao fazer logout:', error);
    } finally {
      router.push('/login');
    }
  }

  function searchRecipesByIngredients() {
    if (!searchIngredients.trim()) {
      setFilteredRecipes(recipes);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const searchTerms = searchIngredients
      .toLowerCase()
      .split(',')
      .map(term => term.trim())
      .filter(term => term.length > 0);

    const filtered = recipes.filter(recipe => {
      const recipeIngredients = recipe.ingredients.map(ing => ing.toLowerCase());
      return searchTerms.some(term => 
        recipeIngredients.some(ing => ing.includes(term))
      );
    });

    setFilteredRecipes(filtered);
  }

  function clearSearch() {
    setSearchIngredients('');
    setFilteredRecipes(recipes);
    setIsSearching(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#38B000] to-[#1f6100]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          <p className="text-white text-lg">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#38B000] to-[#2d8c00] rounded-full p-2">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">FitMeals AI</h1>
                <p className="text-sm text-gray-600">Olá, {user?.email || 'Usuário'}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mock Data Warning */}
      {usingMockData && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800">
                <strong>Modo demonstração:</strong> Exibindo receitas de exemplo. Configure suas credenciais do Supabase para ver suas receitas reais.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Search Section */}
        <div className="bg-gradient-to-br from-[#38B000] to-[#2d8c00] rounded-2xl shadow-2xl p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 rounded-full p-2">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Assistente IA</h2>
          </div>
          <p className="text-white/90 mb-6">
            Digite os ingredientes que você tem em casa e encontre receitas perfeitas!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchIngredients}
                onChange={(e) => setSearchIngredients(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchRecipesByIngredients()}
                placeholder="Ex: frango, arroz, brócolis..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-all"
              />
            </div>
            <button
              onClick={searchRecipesByIngredients}
              className="px-6 py-3 bg-white text-[#38B000] font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
            >
              Buscar Receitas
            </button>
            {isSearching && (
              <button
                onClick={clearSearch}
                className="px-6 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-all"
              >
                Limpar
              </button>
            )}
          </div>

          {isSearching && (
            <div className="mt-4 text-white/90">
              <p className="text-sm">
                Encontradas <span className="font-bold">{filteredRecipes.length}</span> receita(s) com seus ingredientes
              </p>
            </div>
          )}
        </div>

        {/* Recipes Grid */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {isSearching ? 'Resultados da Busca' : 'Suas Receitas'}
          </h3>
        </div>

        {filteredRecipes.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
              <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {isSearching ? 'Nenhuma receita encontrada' : 'Nenhuma receita ainda'}
              </h3>
              <p className="text-gray-600">
                {isSearching 
                  ? 'Tente buscar com outros ingredientes ou adicione novas receitas.'
                  : 'Comece adicionando suas primeiras receitas fitness!'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
              >
                {/* Recipe Image */}
                <div className="relative h-48 bg-gradient-to-br from-[#38B000]/20 to-[#2d8c00]/20 overflow-hidden">
                  {recipe.image_url ? (
                    <img
                      src={recipe.image_url}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Sparkles className="w-16 h-16 text-[#38B000]/40" />
                    </div>
                  )}
                  {recipe.is_favorite && (
                    <div className="absolute top-3 right-3 bg-red-500 rounded-full p-2 shadow-lg">
                      <Heart className="w-4 h-4 text-white fill-white" />
                    </div>
                  )}
                </div>

                {/* Recipe Content */}
                <div className="p-5">
                  <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                    {recipe.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {recipe.description}
                  </p>

                  {/* Recipe Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Clock className="w-4 h-4 text-[#38B000]" />
                      <span>{recipe.prep_time + recipe.cook_time} min</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Users className="w-4 h-4 text-[#38B000]" />
                      <span>{recipe.servings} porções</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span>{recipe.calories} kcal</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="font-semibold text-[#38B000]">P:</span>
                      <span>{recipe.protein}g</span>
                    </div>
                  </div>

                  {/* Ingredients Preview */}
                  <div className="border-t border-gray-100 pt-3">
                    <p className="text-xs text-gray-500 mb-1">Ingredientes:</p>
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {recipe.ingredients.slice(0, 3).join(', ')}
                      {recipe.ingredients.length > 3 && '...'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
