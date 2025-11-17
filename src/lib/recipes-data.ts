// FitMeals AI - Mock Recipes Database
import { Recipe } from './types';

// Recipe translations interface
interface RecipeTranslations {
  pt: {
    name: string;
    ingredients: string[];
    instructions: string[];
  };
  en: {
    name: string;
    ingredients: string[];
    instructions: string[];
  };
}

// Base recipes with translations
const recipeTranslations: { [key: string]: RecipeTranslations } = {
  '1': {
    pt: {
      name: 'Omelete Proteica com Espinafre',
      ingredients: [
        '3 ovos inteiros',
        '1 xícara de espinafre fresco',
        '1 colher de azeite',
        'Sal e pimenta a gosto',
        '30g de queijo cottage'
      ],
      instructions: [
        'Bata os ovos em uma tigela',
        'Aqueça o azeite em uma frigideira',
        'Adicione o espinafre e refogue por 1 minuto',
        'Despeje os ovos e cozinhe em fogo baixo',
        'Adicione o queijo cottage e dobre ao meio',
        'Sirva imediatamente'
      ]
    },
    en: {
      name: 'Protein Omelet with Spinach',
      ingredients: [
        '3 whole eggs',
        '1 cup fresh spinach',
        '1 tablespoon olive oil',
        'Salt and pepper to taste',
        '30g cottage cheese'
      ],
      instructions: [
        'Beat eggs in a bowl',
        'Heat olive oil in a pan',
        'Add spinach and sauté for 1 minute',
        'Pour eggs and cook on low heat',
        'Add cottage cheese and fold in half',
        'Serve immediately'
      ]
    }
  },
  '2': {
    pt: {
      name: 'Frango Grelhado com Batata Doce',
      ingredients: [
        '150g de peito de frango',
        '200g de batata doce',
        'Temperos: alho, páprica, sal',
        '1 colher de azeite',
        'Brócolis a gosto'
      ],
      instructions: [
        'Tempere o frango com alho, páprica e sal',
        'Grelhe o frango por 6-8 minutos de cada lado',
        'Cozinhe a batata doce no vapor por 15 minutos',
        'Refogue o brócolis rapidamente',
        'Monte o prato e sirva'
      ]
    },
    en: {
      name: 'Grilled Chicken with Sweet Potato',
      ingredients: [
        '150g chicken breast',
        '200g sweet potato',
        'Seasonings: garlic, paprika, salt',
        '1 tablespoon olive oil',
        'Broccoli to taste'
      ],
      instructions: [
        'Season chicken with garlic, paprika and salt',
        'Grill chicken for 6-8 minutes each side',
        'Steam sweet potato for 15 minutes',
        'Quickly sauté broccoli',
        'Plate and serve'
      ]
    }
  },
  '3': {
    pt: {
      name: 'Panqueca de Banana Fitness',
      ingredients: [
        '1 banana madura',
        '2 ovos',
        '1 colher de aveia',
        'Canela a gosto',
        'Mel (opcional)'
      ],
      instructions: [
        'Amasse a banana em uma tigela',
        'Adicione os ovos e a aveia',
        'Misture bem até formar uma massa',
        'Aqueça uma frigideira antiaderente',
        'Despeje a massa e cozinhe dos dois lados',
        'Polvilhe canela e sirva'
      ]
    },
    en: {
      name: 'Fitness Banana Pancake',
      ingredients: [
        '1 ripe banana',
        '2 eggs',
        '1 tablespoon oats',
        'Cinnamon to taste',
        'Honey (optional)'
      ],
      instructions: [
        'Mash banana in a bowl',
        'Add eggs and oats',
        'Mix well until batter forms',
        'Heat non-stick pan',
        'Pour batter and cook both sides',
        'Sprinkle cinnamon and serve'
      ]
    }
  },
  '4': {
    pt: {
      name: 'Salada de Atum com Abacate',
      ingredients: [
        '1 lata de atum em água',
        '1/2 abacate',
        'Folhas verdes variadas',
        'Tomate cereja',
        'Limão e azeite'
      ],
      instructions: [
        'Escorra o atum',
        'Corte o abacate em cubos',
        'Monte a salada com as folhas',
        'Adicione o atum e o abacate',
        'Tempere com limão e azeite'
      ]
    },
    en: {
      name: 'Tuna Salad with Avocado',
      ingredients: [
        '1 can tuna in water',
        '1/2 avocado',
        'Mixed greens',
        'Cherry tomatoes',
        'Lemon and olive oil'
      ],
      instructions: [
        'Drain tuna',
        'Dice avocado',
        'Arrange salad with greens',
        'Add tuna and avocado',
        'Season with lemon and olive oil'
      ]
    }
  },
  '5': {
    pt: {
      name: 'Brownie Proteico Low Carb',
      ingredients: [
        '2 ovos',
        '30g de whey protein chocolate',
        '2 colheres de cacau em pó',
        '1/4 xícara de adoçante',
        '1/4 xícara de farinha de amêndoas',
        '1 colher de óleo de coco'
      ],
      instructions: [
        'Pré-aqueça o forno a 180°C',
        'Misture todos os ingredientes secos',
        'Adicione os ovos e o óleo',
        'Mexa até formar uma massa homogênea',
        'Despeje em uma forma pequena',
        'Asse por 20-25 minutos',
        'Deixe esfriar antes de cortar'
      ]
    },
    en: {
      name: 'Low Carb Protein Brownie',
      ingredients: [
        '2 eggs',
        '30g chocolate whey protein',
        '2 tablespoons cocoa powder',
        '1/4 cup sweetener',
        '1/4 cup almond flour',
        '1 tablespoon coconut oil'
      ],
      instructions: [
        'Preheat oven to 180°C',
        'Mix all dry ingredients',
        'Add eggs and oil',
        'Stir until smooth batter forms',
        'Pour into small pan',
        'Bake for 20-25 minutes',
        'Let cool before cutting'
      ]
    }
  },
  '6': {
    pt: {
      name: 'Wrap de Frango com Cream Cheese',
      ingredients: [
        '1 tortilha integral',
        '100g de frango desfiado',
        '2 colheres de cream cheese light',
        'Alface e tomate',
        'Temperos a gosto'
      ],
      instructions: [
        'Aqueça a tortilha levemente',
        'Espalhe o cream cheese',
        'Adicione o frango desfiado',
        'Coloque alface e tomate',
        'Enrole e corte ao meio',
        'Sirva imediatamente'
      ]
    },
    en: {
      name: 'Chicken Wrap with Cream Cheese',
      ingredients: [
        '1 whole wheat tortilla',
        '100g shredded chicken',
        '2 tablespoons light cream cheese',
        'Lettuce and tomato',
        'Seasonings to taste'
      ],
      instructions: [
        'Warm tortilla slightly',
        'Spread cream cheese',
        'Add shredded chicken',
        'Place lettuce and tomato',
        'Roll and cut in half',
        'Serve immediately'
      ]
    }
  },
  '7': {
    pt: {
      name: 'Smoothie Verde Detox',
      ingredients: [
        '1 xícara de espinafre',
        '1/2 banana',
        '1/2 maçã verde',
        '200ml de água de coco',
        '1 colher de chia',
        'Gelo a gosto'
      ],
      instructions: [
        'Coloque todos os ingredientes no liquidificador',
        'Bata até ficar homogêneo',
        'Adicione gelo se desejar',
        'Sirva imediatamente'
      ]
    },
    en: {
      name: 'Green Detox Smoothie',
      ingredients: [
        '1 cup spinach',
        '1/2 banana',
        '1/2 green apple',
        '200ml coconut water',
        '1 tablespoon chia',
        'Ice to taste'
      ],
      instructions: [
        'Place all ingredients in blender',
        'Blend until smooth',
        'Add ice if desired',
        'Serve immediately'
      ]
    }
  },
  '8': {
    pt: {
      name: 'Salmão com Legumes Assados',
      ingredients: [
        '150g de salmão',
        'Brócolis, cenoura e abobrinha',
        'Limão e ervas',
        '1 colher de azeite',
        'Sal e pimenta'
      ],
      instructions: [
        'Pré-aqueça o forno a 200°C',
        'Tempere o salmão com limão, sal e ervas',
        'Corte os legumes em pedaços',
        'Disponha tudo em uma assadeira',
        'Regue com azeite',
        'Asse por 25-30 minutos'
      ]
    },
    en: {
      name: 'Salmon with Roasted Vegetables',
      ingredients: [
        '150g salmon',
        'Broccoli, carrot and zucchini',
        'Lemon and herbs',
        '1 tablespoon olive oil',
        'Salt and pepper'
      ],
      instructions: [
        'Preheat oven to 200°C',
        'Season salmon with lemon, salt and herbs',
        'Cut vegetables into pieces',
        'Arrange everything on baking sheet',
        'Drizzle with olive oil',
        'Bake for 25-30 minutes'
      ]
    }
  },
  // Premium recipes translations
  'p1': {
    pt: {
      name: 'Bowl de Açaí Proteico',
      ingredients: [
        '200g de polpa de açaí',
        '1 scoop de whey protein',
        '1 banana congelada',
        'Granola sem açúcar',
        'Frutas vermelhas',
        'Pasta de amendoim'
      ],
      instructions: [
        'Bata o açaí com whey e banana no liquidificador',
        'Despeje em uma tigela',
        'Decore com granola, frutas e pasta de amendoim',
        'Sirva imediatamente'
      ]
    },
    en: {
      name: 'Protein Açaí Bowl',
      ingredients: [
        '200g açaí pulp',
        '1 scoop whey protein',
        '1 frozen banana',
        'Sugar-free granola',
        'Berries',
        'Peanut butter'
      ],
      instructions: [
        'Blend açaí with whey and banana',
        'Pour into bowl',
        'Top with granola, berries and peanut butter',
        'Serve immediately'
      ]
    }
  },
  'p2': {
    pt: {
      name: 'Tapioca Recheada com Queijo e Ovo',
      ingredients: [
        '3 colheres de goma de tapioca',
        '1 ovo',
        '30g de queijo minas',
        'Orégano',
        'Tomate picado'
      ],
      instructions: [
        'Aqueça uma frigideira antiaderente',
        'Espalhe a tapioca uniformemente',
        'Adicione o ovo mexido e o queijo',
        'Dobre ao meio e sirva'
      ]
    },
    en: {
      name: 'Tapioca Stuffed with Cheese and Egg',
      ingredients: [
        '3 tablespoons tapioca starch',
        '1 egg',
        '30g minas cheese',
        'Oregano',
        'Diced tomato'
      ],
      instructions: [
        'Heat non-stick pan',
        'Spread tapioca evenly',
        'Add scrambled egg and cheese',
        'Fold in half and serve'
      ]
    }
  },
  'p3': {
    pt: {
      name: 'Overnight Oats com Frutas Vermelhas',
      ingredients: [
        '1/2 xícara de aveia',
        '200ml de leite desnatado',
        'Frutas vermelhas',
        '1 colher de chia',
        'Mel a gosto'
      ],
      instructions: [
        'Misture aveia, leite e chia em um pote',
        'Deixe na geladeira durante a noite',
        'Pela manhã, adicione frutas e mel',
        'Sirva gelado'
      ]
    },
    en: {
      name: 'Overnight Oats with Berries',
      ingredients: [
        '1/2 cup oats',
        '200ml skim milk',
        'Berries',
        '1 tablespoon chia',
        'Honey to taste'
      ],
      instructions: [
        'Mix oats, milk and chia in jar',
        'Refrigerate overnight',
        'In the morning, add berries and honey',
        'Serve cold'
      ]
    }
  },
  'p4': {
    pt: {
      name: 'Crepioca de Frango',
      ingredients: [
        '1 ovo',
        '2 colheres de tapioca',
        '80g de frango desfiado',
        'Cream cheese light',
        'Cebolinha'
      ],
      instructions: [
        'Misture ovo e tapioca',
        'Despeje em frigideira quente',
        'Adicione frango e cream cheese',
        'Dobre e sirva'
      ]
    },
    en: {
      name: 'Chicken Crepioca',
      ingredients: [
        '1 egg',
        '2 tablespoons tapioca',
        '80g shredded chicken',
        'Light cream cheese',
        'Chives'
      ],
      instructions: [
        'Mix egg and tapioca',
        'Pour into hot pan',
        'Add chicken and cream cheese',
        'Fold and serve'
      ]
    }
  },
  'p5': {
    pt: {
      name: 'Iogurte Grego com Granola e Mel',
      ingredients: [
        '200g de iogurte grego natural',
        '3 colheres de granola',
        '1 colher de mel',
        'Frutas frescas'
      ],
      instructions: [
        'Coloque o iogurte em uma tigela',
        'Adicione a granola por cima',
        'Regue com mel',
        'Decore com frutas'
      ]
    },
    en: {
      name: 'Greek Yogurt with Granola and Honey',
      ingredients: [
        '200g plain Greek yogurt',
        '3 tablespoons granola',
        '1 tablespoon honey',
        'Fresh fruits'
      ],
      instructions: [
        'Place yogurt in bowl',
        'Add granola on top',
        'Drizzle with honey',
        'Garnish with fruits'
      ]
    }
  },
  'p21': {
    pt: {
      name: 'Filé de Tilápia com Quinoa',
      ingredients: [
        '150g de filé de tilápia',
        '1/2 xícara de quinoa',
        'Legumes grelhados',
        'Limão e ervas',
        'Azeite'
      ],
      instructions: [
        'Cozinhe a quinoa',
        'Tempere o peixe com limão',
        'Grelhe por 4 minutos cada lado',
        'Grelhe os legumes',
        'Monte o prato'
      ]
    },
    en: {
      name: 'Tilapia Fillet with Quinoa',
      ingredients: [
        '150g tilapia fillet',
        '1/2 cup quinoa',
        'Grilled vegetables',
        'Lemon and herbs',
        'Olive oil'
      ],
      instructions: [
        'Cook quinoa',
        'Season fish with lemon',
        'Grill for 4 minutes each side',
        'Grill vegetables',
        'Plate the dish'
      ]
    }
  }
};

// Helper function to get translated recipe
export const getTranslatedRecipe = (recipeId: string, lang: 'pt' | 'en' = 'pt') => {
  return recipeTranslations[recipeId]?.[lang];
};

export const recipes: Recipe[] = [
  // RECEITAS GRATUITAS (8 originais)
  {
    id: '1',
    name: 'Omelete Proteica com Espinafre',
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=800&h=600&fit=crop',
    prepTime: 10,
    calories: 245,
    macros: { protein: 28, carbs: 6, fat: 12 },
    mealType: ['breakfast'],
    category: ['breakfast', 'protein', 'under300'],
    servings: 1,
    ingredients: recipeTranslations['1'].pt.ingredients,
    instructions: recipeTranslations['1'].pt.instructions
  },
  {
    id: '2',
    name: 'Frango Grelhado com Batata Doce',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800&h=600&fit=crop',
    prepTime: 25,
    calories: 420,
    macros: { protein: 45, carbs: 38, fat: 8 },
    mealType: ['lunch', 'dinner'],
    category: ['lunch', 'dinner', 'protein'],
    servings: 1,
    ingredients: recipeTranslations['2'].pt.ingredients,
    instructions: recipeTranslations['2'].pt.instructions
  },
  {
    id: '3',
    name: 'Panqueca de Banana Fitness',
    image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=800&h=600&fit=crop',
    prepTime: 8,
    calories: 195,
    macros: { protein: 12, carbs: 28, fat: 4 },
    mealType: ['breakfast', 'snack'],
    category: ['breakfast', 'snacks', 'under300'],
    servings: 1,
    ingredients: recipeTranslations['3'].pt.ingredients,
    instructions: recipeTranslations['3'].pt.instructions
  },
  {
    id: '4',
    name: 'Salada de Atum com Abacate',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop',
    prepTime: 5,
    calories: 285,
    macros: { protein: 32, carbs: 8, fat: 14 },
    mealType: ['lunch', 'snack'],
    category: ['lunch', 'snacks', 'lowcarb', 'protein', 'under300'],
    servings: 1,
    ingredients: recipeTranslations['4'].pt.ingredients,
    instructions: recipeTranslations['4'].pt.instructions
  },
  {
    id: '5',
    name: 'Brownie Proteico Low Carb',
    image: 'https://images.unsplash.com/photo-1564355808853-7310d9d5f3ff?w=800&h=600&fit=crop',
    prepTime: 30,
    calories: 180,
    macros: { protein: 15, carbs: 12, fat: 8 },
    mealType: ['snack', 'dessert'],
    category: ['desserts', 'snacks', 'lowcarb', 'protein', 'under300'],
    servings: 6,
    ingredients: recipeTranslations['5'].pt.ingredients,
    instructions: recipeTranslations['5'].pt.instructions
  },
  {
    id: '6',
    name: 'Wrap de Frango com Cream Cheese',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&h=600&fit=crop',
    prepTime: 15,
    calories: 340,
    macros: { protein: 38, carbs: 28, fat: 10 },
    mealType: ['lunch', 'snack'],
    category: ['lunch', 'snacks', 'protein'],
    servings: 1,
    ingredients: recipeTranslations['6'].pt.ingredients,
    instructions: recipeTranslations['6'].pt.instructions
  },
  {
    id: '7',
    name: 'Smoothie Verde Detox',
    image: 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=800&h=600&fit=crop',
    prepTime: 5,
    calories: 165,
    macros: { protein: 8, carbs: 32, fat: 2 },
    mealType: ['breakfast', 'snack'],
    category: ['breakfast', 'snacks', 'under300'],
    servings: 1,
    ingredients: recipeTranslations['7'].pt.ingredients,
    instructions: recipeTranslations['7'].pt.instructions
  },
  {
    id: '8',
    name: 'Salmão com Legumes Assados',
    image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=800&h=600&fit=crop',
    prepTime: 35,
    calories: 450,
    macros: { protein: 42, carbs: 18, fat: 24 },
    mealType: ['lunch', 'dinner'],
    category: ['lunch', 'dinner', 'protein'],
    servings: 1,
    ingredients: recipeTranslations['8'].pt.ingredients,
    instructions: recipeTranslations['8'].pt.instructions
  },

  // ========== 100 RECEITAS PREMIUM ==========
  
  // CAFÉ DA MANHÃ PREMIUM (20 receitas)
  {
    id: 'p1',
    name: 'Bowl de Açaí Proteico',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&h=600&fit=crop',
    prepTime: 10,
    calories: 320,
    macros: { protein: 18, carbs: 42, fat: 10 },
    mealType: ['breakfast'],
    category: ['breakfast', 'protein'],
    servings: 1,
    isPremium: true,
    ingredients: recipeTranslations['p1'].pt.ingredients,
    instructions: recipeTranslations['p1'].pt.instructions
  },
  {
    id: 'p2',
    name: 'Tapioca Recheada com Queijo e Ovo',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&h=600&fit=crop',
    prepTime: 12,
    calories: 280,
    macros: { protein: 22, carbs: 35, fat: 8 },
    mealType: ['breakfast'],
    category: ['breakfast', 'protein', 'under300'],
    servings: 1,
    isPremium: true,
    ingredients: recipeTranslations['p2'].pt.ingredients,
    instructions: recipeTranslations['p2'].pt.instructions
  },
  {
    id: 'p3',
    name: 'Overnight Oats com Frutas Vermelhas',
    image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=800&h=600&fit=crop',
    prepTime: 5,
    calories: 265,
    macros: { protein: 14, carbs: 38, fat: 7 },
    mealType: ['breakfast'],
    category: ['breakfast', 'under300'],
    servings: 1,
    isPremium: true,
    ingredients: recipeTranslations['p3'].pt.ingredients,
    instructions: recipeTranslations['p3'].pt.instructions
  },
  {
    id: 'p4',
    name: 'Crepioca de Frango',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&h=600&fit=crop',
    prepTime: 15,
    calories: 295,
    macros: { protein: 32, carbs: 28, fat: 6 },
    mealType: ['breakfast', 'lunch'],
    category: ['breakfast', 'lunch', 'protein', 'under300'],
    servings: 1,
    isPremium: true,
    ingredients: recipeTranslations['p4'].pt.ingredients,
    instructions: recipeTranslations['p4'].pt.instructions
  },
  {
    id: 'p5',
    name: 'Iogurte Grego com Granola e Mel',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=600&fit=crop',
    prepTime: 3,
    calories: 240,
    macros: { protein: 20, carbs: 28, fat: 6 },
    mealType: ['breakfast', 'snack'],
    category: ['breakfast', 'snacks', 'protein', 'under300'],
    servings: 1,
    isPremium: true,
    ingredients: recipeTranslations['p5'].pt.ingredients,
    instructions: recipeTranslations['p5'].pt.instructions
  },
  {
    id: 'p6',
    name: 'Pão de Queijo Fit',
    image: 'https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?w=800&h=600&fit=crop',
    prepTime: 25,
    calories: 180,
    macros: { protein: 12, carbs: 18, fat: 6 },
    mealType: ['breakfast', 'snack'],
    category: ['breakfast', 'snacks', 'under300'],
    servings: 6,
    isPremium: true,
    ingredients: [
      '1 xícara de polvilho azedo',
      '1/2 xícara de queijo ralado light',
      '1 ovo',
      '3 colheres de leite desnatado',
      'Sal a gosto'
    ],
    instructions: [
      'Misture todos os ingredientes',
      'Faça bolinhas pequenas',
      'Disponha em assadeira',
      'Asse a 180°C por 20 minutos'
    ]
  },
  {
    id: 'p7',
    name: 'Vitamina de Abacate com Cacau',
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800&h=600&fit=crop',
    prepTime: 5,
    calories: 290,
    macros: { protein: 10, carbs: 32, fat: 14 },
    mealType: ['breakfast', 'snack'],
    category: ['breakfast', 'snacks', 'under300'],
    servings: 1,
    isPremium: true,
    ingredients: [
      '1/2 abacate',
      '200ml de leite desnatado',
      '1 colher de cacau em pó',
      'Adoçante a gosto',
      'Gelo'
    ],
    instructions: [
      'Bata todos os ingredientes no liquidificador',
      'Ajuste a doçura',
      'Sirva gelado'
    ]
  },
  {
    id: 'p8',
    name: 'Omelete de Claras com Cogumelos',
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800&h=600&fit=crop',
    prepTime: 10,
    calories: 165,
    macros: { protein: 24, carbs: 4, fat: 5 },
    mealType: ['breakfast'],
    category: ['breakfast', 'protein', 'lowcarb', 'under300'],
    servings: 1,
    isPremium: true,
    ingredients: [
      '4 claras de ovo',
      '100g de cogumelos',
      'Cebola e alho',
      'Azeite spray',
      'Ervas finas'
    ],
    instructions: [
      'Refogue os cogumelos com cebola e alho',
      'Bata as claras',
      'Despeje na frigideira',
      'Adicione os cogumelos e dobre'
    ]
  },
  {
    id: 'p9',
    name: 'Mingau de Aveia com Canela',
    image: 'https://images.unsplash.com/photo-1593252719532-347415d8e8c4?w=800&h=600&fit=crop',
    prepTime: 8,
    calories: 220,
    macros: { protein: 12, carbs: 35, fat: 4 },
    mealType: ['breakfast'],
    category: ['breakfast', 'under300'],
    servings: 1,
    isPremium: true,
    ingredients: [
      '1/2 xícara de aveia',
      '250ml de leite desnatado',
      'Canela em pó',
      'Banana fatiada',
      'Mel'
    ],
    instructions: [
      'Cozinhe a aveia com o leite',
      'Mexa até engrossar',
      'Adicione canela',
      'Sirva com banana e mel'
    ]
  },
  {
    id: 'p10',
    name: 'Toast de Abacate com Ovo Pochê',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&h=600&fit=crop',
    prepTime: 12,
    calories: 310,
    macros: { protein: 16, carbs: 28, fat: 16 },
    mealType: ['breakfast'],
    category: ['breakfast', 'protein'],
    servings: 1,
    isPremium: true,
    ingredients: [
      '2 fatias de pão integral',
      '1/2 abacate',
      '1 ovo',
      'Limão',
      'Pimenta e sal'
    ],
    instructions: [
      'Toste o pão',
      'Amasse o abacate com limão',
      'Faça o ovo pochê',
      'Monte o toast e tempere'
    ]
  },
  {
    id: 'p11',
    name: 'Panqueca de Whey Protein',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop',
    prepTime: 10,
    calories: 235,
    macros: { protein: 28, carbs: 22, fat: 5 },
    mealType: ['breakfast'],
    category: ['breakfast', 'protein', 'under300'],
    servings: 1,
    isPremium: true,
    ingredients: [
      '1 scoop de whey protein',
      '1 ovo',
      '2 colheres de aveia',
      'Fermento em pó',
      'Leite desnatado'
    ],
    instructions: [
      'Misture todos os ingredientes',
      'Aqueça frigideira antiaderente',
      'Despeje a massa',
      'Vire quando bolhas aparecerem'
    ]
  },
  {
    id: 'p12',
    name: 'Smoothie Bowl de Manga',
    image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=800&h=600&fit=crop',
    prepTime: 8,
    calories: 275,
    macros: { protein: 12, carbs: 48, fat: 5 },
    mealType: ['breakfast'],
    category: ['breakfast', 'under300'],
    servings: 1,
    isPremium: true,
    ingredients: [
      '1 manga congelada',
      '1/2 banana',
      '100ml de leite de coco',
      'Granola',
      'Coco ralado'
    ],
    instructions: [
      'Bata manga e banana com leite',
      'Despeje em tigela',
      'Decore com granola e coco',
      'Sirva imediatamente'
    ]
  },
  {
    id: 'p13',
    name: 'Waffle Proteico',
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=800&h=600&fit=crop',
    prepTime: 15,
    calories: 260,
    macros: { protein: 22, carbs: 28, fat: 7 },
    mealType: ['breakfast'],
    category: ['breakfast', 'protein', 'under300'],
    servings: 2,
    isPremium: true,
    ingredients: [
      '2 ovos',
      '1 scoop de whey',
      '3 colheres de aveia',
      'Fermento',
      'Canela'
    ],
    instructions: [
      'Misture todos os ingredientes',
      'Aqueça a máquina de waffle',
      'Despeje a massa',
      'Asse até dourar'
    ]
  },
  {
    id: 'p14',
    name: 'Chia Pudding com Frutas',
    image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=800&h=600&fit=crop',
    prepTime: 5,
    calories: 210,
    macros: { protein: 8, carbs: 28, fat: 8 },
    mealType: ['breakfast', 'snack'],
    category: ['breakfast', 'snacks', 'under300'],
    servings: 1,
    isPremium: true,
    ingredients: [
      '3 colheres de chia',
      '200ml de leite de amêndoas',
      'Frutas variadas',
      'Mel',
      'Castanhas'
    ],
    instructions: [
      'Misture chia com leite',
      'Deixe na geladeira por 4 horas',
      'Adicione frutas e mel',
      'Finalize com castanhas'
    ]
  },
  {
    id: 'p15',
    name: 'Tortilha Espanhola Fitness',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&h=600&fit=crop',
    prepTime: 20,
    calories: 285,
    macros: { protein: 24, carbs: 22, fat: 10 },
    mealType: ['breakfast', 'lunch'],
    category: ['breakfast', 'lunch', 'protein', 'under300'],
    servings: 2,
    isPremium: true,
    ingredients: [
      '4 ovos',
      '2 batatas pequenas',
      'Cebola',
      'Azeite',
      'Sal e pimenta'
    ],
    instructions: [
      'Cozinhe as batatas em cubos',
      'Refogue a cebola',
      'Misture com ovos batidos',
      'Cozinhe dos dois lados'
    ]
  },
  {
    id: 'p16',
    name: 'Muffin de Banana e Aveia',
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&h=600&fit=crop',
    prepTime: 30,
    calories: 195,
    macros: { protein: 8, carbs: 32, fat: 5 },
    mealType: ['breakfast', 'snack'],
    category: ['breakfast', 'snacks', 'under300'],
    servings: 6,
    isPremium: true,
    ingredients: [
      '2 bananas maduras',
      '1 xícara de aveia',
      '2 ovos',
      'Canela',
      'Fermento'
    ],
    instructions: [
      'Amasse as bananas',
      'Misture todos os ingredientes',
      'Distribua em forminhas',
      'Asse a 180°C por 20 minutos'
    ]
  },
  {
    id: 'p17',
    name: 'Shakshuka Proteica',
    image: 'https://images.unsplash.com/photo-1587486937736-e7c65e1f1e8f?w=800&h=600&fit=crop',
    prepTime: 25,
    calories: 310,
    macros: { protein: 22, carbs: 18, fat: 16 },
    mealType: ['breakfast', 'lunch'],
    category: ['breakfast', 'lunch', 'protein'],
    servings: 2,
    isPremium: true,
    ingredients: [
      '4 ovos',
      'Molho de tomate caseiro',
      'Pimentão',
      'Cebola',
      'Cominho e páprica'
    ],
    instructions: [
      'Refogue cebola e pimentão',
      'Adicione molho e temperos',
      'Quebre os ovos por cima',
      'Cozinhe até os ovos ficarem no ponto'
    ]
  },
  {
    id: 'p18',
    name: 'Smoothie de Proteína Verde',
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800&h=600&fit=crop',
    prepTime: 5,
    calories: 195,
    macros: { protein: 22, carbs: 18, fat: 4 },
    mealType: ['breakfast', 'snack'],
    category: ['breakfast', 'snacks', 'protein', 'under300'],
    servings: 1,
    isPremium: true,
    ingredients: [
      '1 scoop de whey baunilha',
      'Espinafre',
      '1/2 abacate',
      'Água de coco',
      'Hortelã'
    ],
    instructions: [
      'Bata todos os ingredientes',
      'Adicione gelo',
      'Ajuste consistência com água',
      'Sirva imediatamente'
    ]
  },
  {
    id: 'p19',
    name: 'Crepe Francês Integral',
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=800&h=600&fit=crop',
    prepTime: 15,
    calories: 245,
    macros: { protein: 14, carbs: 32, fat: 7 },
    mealType: ['breakfast'],
    category: ['breakfast', 'under300'],
    servings: 2,
    isPremium: true,
    ingredients: [
      '1 xícara de farinha integral',
      '2 ovos',
      '200ml de leite desnatado',
      'Recheio a escolha',
      'Sal'
    ],
    instructions: [
      'Bata todos os ingredientes',
      'Deixe descansar 10 minutos',
      'Despeje em frigideira quente',
      'Vire e recheie'
    ]
  },
  {
    id: 'p20',
    name: 'Parfait de Iogurte com Granola',
    image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&h=600&fit=crop',
    prepTime: 5,
    calories: 270,
    macros: { protein: 18, carbs: 36, fat: 6 },
    mealType: ['breakfast', 'snack'],
    category: ['breakfast', 'snacks', 'protein', 'under300'],
    servings: 1,
    isPremium: true,
    ingredients: [
      'Iogurte grego',
      'Granola caseira',
      'Frutas vermelhas',
      'Mel',
      'Amêndoas laminadas'
    ],
    instructions: [
      'Monte camadas em um copo',
      'Alterne iogurte, granola e frutas',
      'Finalize com mel e amêndoas',
      'Sirva gelado'
    ]
  },

  // ALMOÇO PREMIUM (25 receitas)
  {
    id: 'p21',
    name: 'Filé de Tilápia com Quinoa',
    image: 'https://images.unsplash.com/photo-1580959375944-1ab5b8c78f15?w=800&h=600&fit=crop',
    prepTime: 30,
    calories: 385,
    macros: { protein: 38, carbs: 35, fat: 10 },
    mealType: ['lunch', 'dinner'],
    category: ['lunch', 'dinner', 'protein'],
    servings: 1,
    isPremium: true,
    ingredients: recipeTranslations['p21'].pt.ingredients,
    instructions: recipeTranslations['p21'].pt.instructions
  },
];

// Categories with translations
export const getCategoryTranslations = (lang: 'pt' | 'en' = 'pt') => {
  const translations = {
    pt: {
      breakfast: 'Café da Manhã',
      lunch: 'Almoço',
      dinner: 'Jantar',
      snacks: 'Lanches Rápidos',
      desserts: 'Sobremesas Fitness',
      lowcarb: 'Low Carb',
      protein: 'Proteicas',
      under300: 'Até 300 kcal'
    },
    en: {
      breakfast: 'Breakfast',
      lunch: 'Lunch',
      dinner: 'Dinner',
      snacks: 'Quick Snacks',
      desserts: 'Fitness Desserts',
      lowcarb: 'Low Carb',
      protein: 'High Protein',
      under300: 'Under 300 kcal'
    }
  };
  
  return translations[lang];
};

export const categories = [
  { id: 'breakfast', name: 'Café da Manhã', icon: '☕', color: 'from-orange-400 to-amber-500' },
  { id: 'lunch', name: 'Almoço', icon: '🍽️', color: 'from-green-400 to-emerald-500' },
  { id: 'dinner', name: 'Jantar', icon: '🌙', color: 'from-indigo-400 to-purple-500' },
  { id: 'snacks', name: 'Lanches Rápidos', icon: '🥪', color: 'from-yellow-400 to-orange-500' },
  { id: 'desserts', name: 'Sobremesas Fitness', icon: '🍰', color: 'from-pink-400 to-rose-500' },
  { id: 'lowcarb', name: 'Low Carb', icon: '🥑', color: 'from-lime-400 to-green-500' },
  { id: 'protein', name: 'Proteicas', icon: '💪', color: 'from-red-400 to-pink-500' },
  { id: 'under300', name: 'Até 300 kcal', icon: '⚡', color: 'from-cyan-400 to-blue-500' }
];
