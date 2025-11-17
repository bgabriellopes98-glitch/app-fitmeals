'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Crown, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PLANS, upgradeToPremium, getUserPlan } from '@/lib/subscription';
import Link from 'next/link';

export default function PricingPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentPlan, setCurrentPlan] = useState({ type: 'free' as 'free' | 'premium' });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setCurrentPlan(getUserPlan());
  }, []);

  const handleUpgrade = async () => {
    setIsProcessing(true);
    
    // Redirecionar para o link de pagamento do Cakto
    window.location.href = 'https://pay.cakto.com.br/cynko3f_654500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/home">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Planos e Preços</h1>
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#38B000]/10 text-[#38B000] px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Desbloqueie todo o potencial</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Escolha seu plano ideal
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transforme sua alimentação com receitas personalizadas e dietas exclusivas criadas por IA
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-gray-200">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {PLANS.free.name}
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900">R$ {PLANS.free.price}</span>
                <span className="text-gray-600">{PLANS.free.period}</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {PLANS.free.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#38B000] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              variant="outline" 
              className="w-full h-12 text-base"
              disabled={!isClient || currentPlan.type === 'free'}
            >
              {!isClient ? 'Carregando...' : currentPlan.type === 'free' ? 'Plano Atual' : 'Voltar ao Gratuito'}
            </Button>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-[#38B000] to-[#2d8c00] rounded-3xl shadow-2xl p-8 border-2 border-[#38B000] relative overflow-hidden">
            {/* Badge */}
            <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
              {PLANS.premium.badge}
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-6 h-6 text-yellow-300" />
                <h3 className="text-2xl font-bold text-white">
                  {PLANS.premium.name}
                </h3>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">R$ {PLANS.premium.price}</span>
                <span className="text-white/90">{PLANS.premium.period}</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {PLANS.premium.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span className="text-white font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              onClick={handleUpgrade}
              disabled={!isClient || isProcessing || currentPlan.type === 'premium'}
              className="w-full h-12 text-base bg-white text-[#38B000] hover:bg-gray-100 font-bold"
            >
              {!isClient ? (
                'Carregando...'
              ) : isProcessing ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#38B000] border-t-transparent rounded-full animate-spin"></div>
                  Redirecionando...
                </span>
              ) : currentPlan.type === 'premium' ? (
                'Plano Atual ✓'
              ) : (
                'Assinar Premium'
              )}
            </Button>

            {isClient && currentPlan.type !== 'premium' && (
              <p className="text-white/80 text-sm text-center mt-4">
                Cancele quando quiser • Sem compromisso
              </p>
            )}
          </div>
        </div>

        {/* Features Comparison */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Por que escolher o Premium?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-4">🤖</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                IA Personalizada
              </h4>
              <p className="text-gray-600">
                Crie dietas exclusivas baseadas em seus objetivos, restrições e preferências alimentares
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-4">📅</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                Cardápio Semanal
              </h4>
              <p className="text-gray-600">
                Planejamento automático de refeições para toda a semana com lista de compras incluída
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-4">🔥</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                Receitas Exclusivas
              </h4>
              <p className="text-gray-600">
                Acesso a mais de 100 receitas premium e novos conteúdos toda semana
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Perguntas Frequentes
          </h3>
          <div className="space-y-4">
            <details className="bg-white rounded-xl p-6 shadow-md">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Posso cancelar a qualquer momento?
              </summary>
              <p className="text-gray-600 mt-3">
                Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas ou multas. Seu acesso premium continuará até o final do período pago.
              </p>
            </details>

            <details className="bg-white rounded-xl p-6 shadow-md">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Como funciona a criação de dietas personalizadas?
              </summary>
              <p className="text-gray-600 mt-3">
                Nossa IA analisa seus objetivos, restrições alimentares e preferências para criar um plano alimentar exclusivo com receitas adequadas às suas necessidades calóricas e de macronutrientes.
              </p>
            </details>

            <details className="bg-white rounded-xl p-6 shadow-md">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Quantas receitas estão disponíveis no Premium?
              </summary>
              <p className="text-gray-600 mt-3">
                O plano Premium oferece acesso a mais de 100 receitas exclusivas, com novas adições toda semana. Além disso, você pode criar receitas personalizadas ilimitadas com a IA.
              </p>
            </details>
          </div>
        </div>
      </main>
    </div>
  );
}
