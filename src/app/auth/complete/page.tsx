'use client';
import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { browserClient } from '@/lib/supabase';
import { Suspense } from 'react';

function AuthComplete() {
  const router = useRouter();
  const params = useSearchParams();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const code = params.get('code');
    const next = params.get('next') || '/member';

    if (!code) {
      router.replace('/signup?error=missing_code');
      return;
    }

    browserClient()
      .auth.exchangeCodeForSession(code)
      .then(({ error }) => {
        if (error) {
          router.replace('/signup?error=invalid_link');
        } else {
          router.replace(next);
        }
      });
  }, [params, router]);

  return (
    <section className="max-w-3xl mx-auto px-5 py-20">
      <p className="kicker mb-4">Signing you in…</p>
      <p className="text-base opacity-60">Just a moment.</p>
    </section>
  );
}

export default function AuthCompletePage() {
  return (
    <Suspense fallback={
      <section className="max-w-3xl mx-auto px-5 py-20">
        <p className="kicker mb-4">Signing you in…</p>
      </section>
    }>
      <AuthComplete />
    </Suspense>
  );
}
