import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FitMeals AI - Receitas Fitness Inteligentes',
    short_name: 'FitMeals AI',
    description: 'Descubra receitas fitness personalizadas com IA, controle de calorias e macronutrientes',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B0B0B',
    theme_color: '#10B981',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      }
    ],
    categories: ['health', 'fitness', 'food', 'lifestyle'],
    lang: 'pt-BR',
    dir: 'ltr',
    scope: '/',
    prefer_related_applications: false
  }
}
