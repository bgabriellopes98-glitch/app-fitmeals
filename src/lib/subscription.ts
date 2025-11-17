// Subscription and Plan Management
export type PlanType = 'free' | 'premium';

export interface UserPlan {
  type: PlanType;
  expiresAt?: Date;
  features: string[];
}

export const PLANS = {
  free: {
    id: 'free',
    name: 'Plano Gratuito',
    price: 0,
    period: 'Sempre grátis',
    features: [
      '8 receitas básicas',
      'Busca por ingredientes',
      'Informações nutricionais',
      'Favoritar receitas',
      'Lista de compras'
    ],
    limitations: [
      'Receitas limitadas',
      'Sem criação de dietas personalizadas',
      'Sem geração de cardápio semanal',
      'Sem receitas exclusivas premium'
    ]
  },
  premium: {
    id: 'premium',
    name: 'Plano Premium',
    price: 29.90,
    period: 'por mês',
    features: [
      '✨ Receitas ilimitadas (100+)',
      '🤖 Criação de dietas exclusivas com IA',
      '📅 Gerador de cardápio semanal personalizado',
      '🎯 Planos alimentares por objetivo',
      '📊 Análise nutricional avançada',
      '🔥 Receitas exclusivas premium',
      '💬 Suporte prioritário',
      '📱 Acesso a novos recursos primeiro',
      '🎨 Personalização completa',
      '📈 Histórico e estatísticas detalhadas'
    ],
    badge: '⭐ Mais Popular'
  }
};

// Mock user subscription (in real app, this would come from database/auth)
export const getUserPlan = (): UserPlan => {
  // Check localStorage for demo purposes
  if (typeof window !== 'undefined') {
    const savedPlan = localStorage.getItem('userPlan');
    if (savedPlan) {
      return JSON.parse(savedPlan);
    }
  }
  
  return {
    type: 'free',
    features: PLANS.free.features
  };
};

export const upgradeToPremium = () => {
  if (typeof window !== 'undefined') {
    const premiumPlan: UserPlan = {
      type: 'premium',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      features: PLANS.premium.features
    };
    localStorage.setItem('userPlan', JSON.stringify(premiumPlan));
  }
};

export const isPremiumUser = (): boolean => {
  const plan = getUserPlan();
  return plan.type === 'premium';
};

export const requiresPremium = (feature: string): boolean => {
  const premiumFeatures = [
    'create-diet',
    'weekly-meal-plan',
    'advanced-recipes',
    'ai-custom-recipes',
    'nutrition-analysis'
  ];
  return premiumFeatures.includes(feature);
};
