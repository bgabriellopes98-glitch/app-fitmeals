// Internationalization system for FitMeals AI

export type Language = 'pt' | 'en';

export const translations = {
  pt: {
    // Header
    appName: 'FitMeals AI',
    upgrade: 'Upgrade',
    
    // Home Page
    greeting: 'Olá, Chef! 👋',
    greetingSubtitle: 'Descubra receitas fitness perfeitas para seus objetivos',
    searchPlaceholder: 'Buscar receitas...',
    
    // AI Assistant
    aiAssistant: 'Assistente IA',
    aiAssistantDesc: 'Crie receitas personalizadas ou receba recomendações baseadas em suas metas',
    
    // Premium
    unlockPremium: 'Desbloqueie o Premium',
    premiumBannerDesc: 'Crie dietas personalizadas, acesse 100+ receitas exclusivas e muito mais!',
    youArePremium: 'Você é Premium! 🎉',
    premiumStatusDesc: 'Aproveite todos os recursos exclusivos e receitas ilimitadas',
    
    // Features
    createCustomDiet: 'Criar Dieta Personalizada',
    createCustomDietDesc: 'Crie sua dieta exclusiva baseada em seus objetivos e preferências',
    createCustomDietLocked: 'Desbloqueie para criar dietas personalizadas com IA',
    weeklyMealPlan: 'Cardápio Semanal',
    weeklyMealPlanDesc: 'Gere automaticamente um planejamento completo para a semana',
    weeklyMealPlanLocked: 'Desbloqueie para gerar cardápios semanais automáticos',
    ingredientSearch: 'Busca por Ingredientes',
    ingredientSearchDesc: 'Informe o que você tem em casa e descubra receitas perfeitas para você',
    
    // Categories
    categories: 'Categorias',
    allRecipes: 'Todas as Receitas',
    all: 'Todas',
    recipes: 'receitas',
    available: 'disponíveis',
    noRecipesFound: 'Nenhuma receita encontrada. Tente outra busca!',
    
    // Premium Upsell
    wantMoreRecipes: 'Quer mais receitas?',
    wantMoreRecipesDesc: 'Desbloqueie acesso a mais de 100 receitas exclusivas premium e crie suas próprias receitas com IA',
    viewPremiumPlans: 'Ver Planos Premium',
    
    // Settings
    settings: 'Configurações',
    language: 'Idioma',
    portuguese: 'Português',
    english: 'Inglês',
    
    // Recipe Details
    calories: 'Calorias',
    protein: 'Proteína',
    carbs: 'Carboidratos',
    fat: 'Gordura',
    prepTime: 'Tempo de Preparo',
    minutes: 'min',
    ingredients: 'Ingredientes',
    instructions: 'Modo de Preparo',
    servings: 'Porções',
    
    // Category Names
    breakfast: 'Café da Manhã',
    lunch: 'Almoço',
    dinner: 'Jantar',
    snacks: 'Lanches Rápidos',
    desserts: 'Sobremesas Fitness',
    lowcarb: 'Low Carb',
    proteinCategory: 'Proteicas',
    under300: 'Até 300 kcal',
  },
  en: {
    // Header
    appName: 'FitMeals AI',
    upgrade: 'Upgrade',
    
    // Home Page
    greeting: 'Hello, Chef! 👋',
    greetingSubtitle: 'Discover perfect fitness recipes for your goals',
    searchPlaceholder: 'Search recipes...',
    
    // AI Assistant
    aiAssistant: 'AI Assistant',
    aiAssistantDesc: 'Create personalized recipes or get recommendations based on your goals',
    
    // Premium
    unlockPremium: 'Unlock Premium',
    premiumBannerDesc: 'Create custom diets, access 100+ exclusive recipes and much more!',
    youArePremium: 'You are Premium! 🎉',
    premiumStatusDesc: 'Enjoy all exclusive features and unlimited recipes',
    
    // Features
    createCustomDiet: 'Create Custom Diet',
    createCustomDietDesc: 'Create your exclusive diet based on your goals and preferences',
    createCustomDietLocked: 'Unlock to create personalized diets with AI',
    weeklyMealPlan: 'Weekly Meal Plan',
    weeklyMealPlanDesc: 'Automatically generate a complete weekly plan',
    weeklyMealPlanLocked: 'Unlock to generate automatic weekly meal plans',
    ingredientSearch: 'Ingredient Search',
    ingredientSearchDesc: 'Tell us what you have at home and discover perfect recipes for you',
    
    // Categories
    categories: 'Categories',
    allRecipes: 'All Recipes',
    all: 'All',
    recipes: 'recipes',
    available: 'available',
    noRecipesFound: 'No recipes found. Try another search!',
    
    // Premium Upsell
    wantMoreRecipes: 'Want more recipes?',
    wantMoreRecipesDesc: 'Unlock access to over 100 exclusive premium recipes and create your own recipes with AI',
    viewPremiumPlans: 'View Premium Plans',
    
    // Settings
    settings: 'Settings',
    language: 'Language',
    portuguese: 'Portuguese',
    english: 'English',
    
    // Recipe Details
    calories: 'Calories',
    protein: 'Protein',
    carbs: 'Carbs',
    fat: 'Fat',
    prepTime: 'Prep Time',
    minutes: 'min',
    ingredients: 'Ingredients',
    instructions: 'Instructions',
    servings: 'Servings',
    
    // Category Names
    breakfast: 'Breakfast',
    lunch: 'Lunch',
    dinner: 'Dinner',
    snacks: 'Quick Snacks',
    desserts: 'Fitness Desserts',
    lowcarb: 'Low Carb',
    proteinCategory: 'High Protein',
    under300: 'Under 300 kcal',
  },
};

// Get current language from localStorage
export const getCurrentLanguage = (): Language => {
  if (typeof window === 'undefined') return 'pt';
  const stored = localStorage.getItem('fitmeals-language');
  return (stored as Language) || 'pt';
};

// Set language in localStorage
export const setLanguage = (lang: Language) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('fitmeals-language', lang);
  }
};

// Get translation
export const t = (key: string, lang?: Language): string => {
  const currentLang = lang || getCurrentLanguage();
  const keys = key.split('.');
  let value: any = translations[currentLang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};
