'use client';

import { useState, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getCurrentLanguage, setLanguage, Language } from '@/lib/i18n';

export default function LanguageSettings() {
  const [currentLang, setCurrentLang] = useState<Language>('pt');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentLang(getCurrentLanguage());
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setCurrentLang(lang);
    // Reload page to apply translations
    window.location.reload();
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon">
        <Globe className="w-5 h-5" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Globe className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={() => handleLanguageChange('pt')}
          className="cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">🇧🇷</span>
            <span>Português</span>
          </div>
          {currentLang === 'pt' && <Check className="w-4 h-4 text-[#38B000]" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange('en')}
          className="cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">🇺🇸</span>
            <span>English</span>
          </div>
          {currentLang === 'en' && <Check className="w-4 h-4 text-[#38B000]" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
