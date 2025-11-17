'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';

export default function SplashScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      router.push('/login');
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#38B000] via-[#2d8c00] to-[#1f6100] overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Logo and Brand */}
      <div className="relative z-10 flex flex-col items-center gap-6 animate-fade-in">
        {/* Icon */}
        <div className="relative">
          <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="relative bg-white rounded-full p-8 shadow-2xl">
            <Sparkles className="w-16 h-16 text-[#38B000]" strokeWidth={2.5} />
          </div>
        </div>

        {/* Brand Name */}
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight">
            FitMeals AI
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-medium">
            Receitas fitness inteligentes
          </p>
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex gap-2 mt-8">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-white/70 text-sm">
        Powered by AI
      </div>
    </div>
  );
}
