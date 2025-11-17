'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          router.push('/login?error=auth_failed');
          return;
        }

        if (session) {
          // Check if user profile exists, if not create one
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (!profile) {
            await supabase.from('user_profiles').insert([
              {
                id: session.user.id,
                email: session.user.email,
                full_name: session.user.user_metadata.full_name || session.user.user_metadata.name,
                avatar_url: session.user.user_metadata.avatar_url || session.user.user_metadata.picture,
                subscription_tier: 'free',
              },
            ]);
          }

          router.push('/home');
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        router.push('/login?error=auth_failed');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#38B000] via-[#2d8c00] to-[#1f6100] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
        <p className="text-white mt-4 text-lg">Autenticando...</p>
      </div>
    </div>
  );
}
