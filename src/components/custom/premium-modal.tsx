'use client';

import { X, Crown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
}

export default function PremiumModal({ isOpen, onClose, feature }: PremiumModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const featureMessages: Record<string, { title: string; description: string }> = {
    'create-diet': {
      title: 'Criação de Dietas Personalizadas',
      description: 'Crie dietas exclusivas baseadas em seus objetivos, restrições e preferências com nossa IA avançada.'
    },
    'weekly-meal-plan': {
      title: 'Cardápio Semanal Automático',
      description: 'Gere automaticamente um planejamento completo de refeições para toda a semana com lista de compras incluída.'
    },
    'advanced-recipes': {
      title: 'Receitas Premium Exclusivas',
      description: 'Acesse mais de 100 receitas exclusivas premium com novos conteúdos adicionados toda semana.'
    },
    'ai-custom-recipes': {
      title: 'Criação de Receitas com IA',
      description: 'Crie receitas personalizadas ilimitadas usando nossa inteligência artificial avançada.'
    }
  };

  const currentFeature = featureMessages[feature] || {
    title: 'Recurso Premium',
    description: 'Este recurso está disponível apenas para assinantes Premium.'
  };

  const handleUpgrade = () => {
    onClose();
    router.push('/pricing');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header with gradient */}
        <div className="bg-gradient-to-br from-[#38B000] to-[#2d8c00] p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-yellow-400 rounded-full p-2">
              <Crown className="w-6 h-6 text-yellow-900" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              Recurso Premium
            </h2>
          </div>
          <p className="text-white/90 text-sm">
            Desbloqueie todo o potencial do FitMeals AI
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {currentFeature.title}
            </h3>
            <p className="text-gray-600">
              {currentFeature.description}
            </p>
          </div>

          {/* Premium Benefits */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#38B000]" />
              Benefícios Premium
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#38B000] mt-0.5">✓</span>
                <span>Receitas ilimitadas (100+)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#38B000] mt-0.5">✓</span>
                <span>Criação de dietas personalizadas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#38B000] mt-0.5">✓</span>
                <span>Cardápio semanal automático</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#38B000] mt-0.5">✓</span>
                <span>Análise nutricional avançada</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#38B000] mt-0.5">✓</span>
                <span>Suporte prioritário</span>
              </li>
            </ul>
          </div>

          {/* Pricing */}
          <div className="text-center mb-6">
            <div className="inline-flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">R$ 29,90</span>
              <span className="text-gray-600">/mês</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Cancele quando quiser
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={handleUpgrade}
              className="w-full h-12 bg-gradient-to-r from-[#38B000] to-[#2d8c00] hover:from-[#2d8c00] hover:to-[#1f6100] text-white font-semibold text-base"
            >
              Assinar Premium
            </Button>
            <Button
              onClick={onClose}
              variant="ghost"
              className="w-full h-12 text-gray-600"
            >
              Talvez depois
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
