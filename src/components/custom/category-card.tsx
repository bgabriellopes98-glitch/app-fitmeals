'use client';

import Link from 'next/link';

interface CategoryCardProps {
  id: string;
  name: string;
  icon: string;
  color: string;
  count?: number;
}

export default function CategoryCard({ id, name, icon, color, count }: CategoryCardProps) {
  return (
    <Link href={`/category/${id}`}>
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${color} p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer`}>
        <div className="flex flex-col items-center justify-center text-center gap-3">
          <div className="text-5xl">{icon}</div>
          <h3 className="font-bold text-white text-lg">{name}</h3>
          {count !== undefined && (
            <span className="text-white/90 text-sm font-medium">
              {count} receitas
            </span>
          )}
        </div>
        {/* Decorative circle */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      </div>
    </Link>
  );
}
