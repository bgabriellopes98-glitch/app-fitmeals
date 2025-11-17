'use client';

import { ArrowLeft, Crown, User, Settings, Heart, ShoppingCart, LogOut, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PremiumBadge from '@/components/custom/premium-badge';
import { getUserPlan, isPremiumUser, PLANS } from '@/lib/subscription';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const userPlan = getUserPlan();
  const isPremium = isPremiumUser();

  const handleLogout = () => {
    // In real app, handle logout logic
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/home">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Perfil</h1>
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Info Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-[#38B000] to-[#2d8c00] rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Usuário FitMeals
              </h2>
              <p className="text-gray-600 mb-3">usuario@fitmeals.com</p>
              {isPremium ? (
                <PremiumBadge size="md" />
              ) : (
                <span className="inline-block px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium">
                  Plano Gratuito
                </span>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-sm text-gray-600">Receitas Favoritas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">45</div>
              <div className="text-sm text-gray-600">Refeições Feitas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">7</div>
              <div className="text-sm text-gray-600">Dias Ativos</div>
            </div>
          </div>
        </div>

        {/* Plan Card */}
        <div className={`rounded-3xl shadow-lg p-8 mb-6 ${
          isPremium 
            ? 'bg-gradient-to-br from-[#38B000] to-[#2d8c00] text-white' 
            : 'bg-white'
        }`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className={`text-2xl font-bold mb-2 ${isPremium ? 'text-white' : 'text-gray-900'}`}>
                {isPremium ? PLANS.premium.name : PLANS.free.name}
              </h3>
              {isPremium ? (
                <p className="text-white/90">
                  Acesso completo a todos os recursos premium
                </p>
              ) : (
                <p className="text-gray-600">
                  Recursos básicos disponíveis
                </p>
              )}
            </div>
            {isPremium && <Crown className="w-8 h-8 text-yellow-300" />}
          </div>

          {/* Features List */}
          <div className="space-y-3 mb-6">
            {isPremium ? (
              <>
                <div className={`flex items-center gap-2 ${isPremium ? 'text-white' : 'text-gray-700'}`}>
                  <Sparkles className="w-5 h-5" />
                  <span>Receitas ilimitadas (100+)</span>
                </div>
                <div className={`flex items-center gap-2 ${isPremium ? 'text-white' : 'text-gray-700'}`}>
                  <Sparkles className="w-5 h-5" />
                  <span>Criação de dietas personalizadas</span>
                </div>
                <div className={`flex items-center gap-2 ${isPremium ? 'text-white' : 'text-gray-700'}`}>
                  <Sparkles className="w-5 h-5" />
                  <span>Cardápio semanal automático</span>
                </div>
                <div className={`flex items-center gap-2 ${isPremium ? 'text-white' : 'text-gray-700'}`}>
                  <Sparkles className="w-5 h-5" />
                  <span>Análise nutricional avançada</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-[#38B000]">✓</span>
                  <span>8 receitas básicas</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-[#38B000]">✓</span>
                  <span>Busca por ingredientes</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-[#38B000]">✓</span>
                  <span>Informações nutricionais</span>
                </div>
              </>
            )}
          </div>

          {/* Action Button */}
          {!isPremium && (
            <Link href="/pricing">
              <Button className="w-full h-12 bg-gradient-to-r from-[#38B000] to-[#2d8c00] hover:from-[#2d8c00] hover:to-[#1f6100] text-white font-bold">
                <Crown className="w-5 h-5 mr-2" />
                Fazer Upgrade para Premium
              </Button>
            </Link>
          )}

          {isPremium && (
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-white/80 mb-1">Próxima renovação</div>
                  <div className="font-semibold text-white">
                    {userPlan.expiresAt ? new Date(userPlan.expiresAt).toLocaleDateString('pt-BR') : 'N/A'}
                  </div>
                </div>
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Gerenciar
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Menu Options */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-6">
          <button className="w-full flex items-center gap-4 p-6 hover:bg-gray-50 transition-colors border-b border-gray-100">
            <div className="w-10 h-10 bg-[#38B000]/10 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-[#38B000]" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-gray-900">Receitas Favoritas</div>
              <div className="text-sm text-gray-600">12 receitas salvas</div>
            </div>
          </button>

          <button className="w-full flex items-center gap-4 p-6 hover:bg-gray-50 transition-colors border-b border-gray-100">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-gray-900">Lista de Compras</div>
              <div className="text-sm text-gray-600">Ver ingredientes salvos</div>
            </div>
          </button>

          <button className="w-full flex items-center gap-4 p-6 hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <Settings className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-gray-900">Configurações</div>
              <div className="text-sm text-gray-600">Preferências e notificações</div>
            </div>
          </button>
        </div>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full h-12 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sair da Conta
        </Button>
      </main>
    </div>
  );
}
