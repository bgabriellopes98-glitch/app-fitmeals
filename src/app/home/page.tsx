'use client';

import { useState, useEffect } from 'react';
import { Search, Sparkles, User, Heart, ShoppingCart, Crown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CategoryCard from '@/components/custom/category-card';
import RecipeCard from '@/components/custom/recipe-card';
import PremiumModal from '@/components/custom/premium-modal';
import PremiumBadge from '@/components/custom/premium-badge';
import LanguageSettings from '@/components/custom/language-settings';
import { categories, recipes, getCategoryTranslations, getTranslatedRecipe } from '@/lib/recipes-data';
import { Category, Recipe } from '@/lib/types';
import { getUserPlan, isPremiumUser } from '@/lib/subscription';
import { getCurrentLanguage, translations } from '@/lib/i18n';
import Link from 'next/link';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [premiumFeature, setPremiumFeature] = useState('');
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  
  const userPlan = getUserPlan();
  const isPremium = isPremiumUser();

  useEffect(() => {
    setLang(getCurrentLanguage());
  }, []);

  const t = translations[lang];
  const categoryTranslations = getCategoryTranslations(lang);

  // Translate recipes dynamically
  const translatedRecipes: Recipe[] = recipes.map((recipe) => {
    const translation = getTranslatedRecipe(recipe.id, lang);
    if (translation) {
      return {
        ...recipe,
        name: translation.name,
        ingredients: translation.ingredients,
        instructions: translation.instructions,
      };
    }
    return recipe;
  });

  // Translate categories dynamically
  const translatedCategories = categories.map((category) => ({
    ...category,
    name: categoryTranslations[category.id as keyof typeof categoryTranslations] || category.name,
  }));

  // Filter recipes based on search and category
  const filteredRecipes = translatedRecipes.filter((recipe) => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || recipe.category.includes(selectedCategory as Category);
    return matchesSearch && matchesCategory;
  });

  // Count recipes per category
  const getCategoryCount = (categoryId: string) => {
    return recipes.filter((r) => r.category.includes(categoryId as Category)).length;
  };

  const handlePremiumFeatureClick = (feature: string) => {
    if (!isPremium) {
      setPremiumFeature(feature);
      setShowPremiumModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-[#38B000] rounded-full p-2">
                <span className="text-xl">🥗</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">{t.appName}</h1>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {!isPremium && (
                <Link href="/pricing">
                  <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-yellow-900 font-bold gap-2">
                    <Crown className="w-4 h-4" />
                    <span className="hidden sm:inline">{t.upgrade}</span>
                  </Button>
                </Link>
              )}
              <LanguageSettings />
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
              </Button>
              <Link href="/profile">
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Premium Banner (only for free users) */}
        {!isPremium && (
          <Link href="/pricing">
            <div className="mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl p-6 text-yellow-900 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-6 h-6" />
                    <h3 className="text-xl font-bold">{t.unlockPremium}</h3>
                  </div>
                  <p className="text-yellow-900/90 font-medium">
                    {t.premiumBannerDesc}
                  </p>
                </div>
                <div className="text-4xl hidden sm:block">⭐</div>
              </div>
            </div>
          </Link>
        )}

        {/* Premium Status (for premium users) */}
        {isPremium && (
          <div className="mb-6 bg-gradient-to-r from-[#38B000] to-[#2d8c00] rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-6 h-6 text-yellow-300" />
                  <h3 className="text-xl font-bold">{t.youArePremium}</h3>
                </div>
                <p className="text-white/90">
                  {t.premiumStatusDesc}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {t.greeting}
          </h2>
          <p className="text-gray-600">
            {t.greetingSubtitle}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-base border-2 rounded-2xl"
            />
          </div>
        </div>

        {/* AI Assistant Button */}
        <Link href="/ai-assistant">
          <div className="mb-4 bg-gradient-to-r from-[#38B000] to-[#2d8c00] rounded-2xl p-6 text-white cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-6 h-6" />
                  <h3 className="text-xl font-bold">{t.aiAssistant}</h3>
                </div>
                <p className="text-white/90">
                  {t.aiAssistantDesc}
                </p>
              </div>
              <div className="text-4xl">🤖</div>
            </div>
          </div>
        </Link>

        {/* Premium Features Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {/* Create Custom Diet */}
          <div 
            onClick={() => handlePremiumFeatureClick('create-diet')}
            className={`bg-white border-2 rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${
              isPremium ? 'border-[#38B000]' : 'border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="bg-purple-100 rounded-full p-2">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{t.createCustomDiet}</h3>
              </div>
              {!isPremium && <PremiumBadge size="sm" />}
            </div>
            <p className="text-gray-600 text-sm">
              {isPremium 
                ? t.createCustomDietDesc
                : t.createCustomDietLocked
              }
            </p>
          </div>

          {/* Weekly Meal Plan */}
          <div 
            onClick={() => handlePremiumFeatureClick('weekly-meal-plan')}
            className={`bg-white border-2 rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${
              isPremium ? 'border-[#38B000]' : 'border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 rounded-full p-2">
                  <span className="text-2xl">📅</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{t.weeklyMealPlan}</h3>
              </div>
              {!isPremium && <PremiumBadge size="sm" />}
            </div>
            <p className="text-gray-600 text-sm">
              {isPremium 
                ? t.weeklyMealPlanDesc
                : t.weeklyMealPlanLocked
              }
            </p>
          </div>
        </div>

        {/* Ingredient Search Button */}
        <Link href="/ingredient-search">
          <div className="mb-8 bg-white border-2 border-[#38B000] rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-[#38B000] rounded-full p-2">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{t.ingredientSearch}</h3>
                </div>
                <p className="text-gray-600">
                  {t.ingredientSearchDesc}
                </p>
              </div>
              <div className="text-4xl">🥘</div>
            </div>
          </div>
        </Link>

        {/* Categories */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.categories}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {translatedCategories.map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                icon={category.icon}
                color={category.color}
                count={getCategoryCount(category.id)}
              />
            ))}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            <Button
              onClick={() => setSelectedCategory('all')}
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              className={selectedCategory === 'all' ? 'bg-[#38B000] hover:bg-[#2d8c00]' : ''}
            >
              {t.all}
            </Button>
            {translatedCategories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as Category)}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                className={selectedCategory === category.id ? 'bg-[#38B000] hover:bg-[#2d8c00]' : ''}
              >
                {category.icon} {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Recipes Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              {selectedCategory === 'all' ? t.allRecipes : translatedCategories.find(c => c.id === selectedCategory)?.name}
            </h3>
            <span className="text-gray-600">
              {filteredRecipes.length} {t.recipes} {!isPremium && `(8 ${t.available})`}
            </span>
          </div>

          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {t.noRecipesFound}
              </p>
            </div>
          )}

          {/* Premium Upsell for more recipes */}
          {!isPremium && filteredRecipes.length > 0 && (
            <div className="mt-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-8 text-center">
              <Crown className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h4 className="text-2xl font-bold text-gray-900 mb-2">
                {t.wantMoreRecipes}
              </h4>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {t.wantMoreRecipesDesc}
              </p>
              <Link href="/pricing">
                <Button className="bg-gradient-to-r from-[#38B000] to-[#2d8c00] hover:from-[#2d8c00] hover:to-[#1f6100] text-white font-bold px-8 h-12">
                  {t.viewPremiumPlans}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Premium Modal */}
      <PremiumModal 
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        feature={premiumFeature}
      />
    </div>
  );
}
