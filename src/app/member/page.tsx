'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TOOLS } from '@/data/tools';
import { browserClient } from '@/lib/supabase';

export default function MemberAreaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    browserClient()
      .auth.getSession()
      .then(({ data: { session } }) => {
        if (!session) {
          router.replace('/signup');
        } else {
          setAuthed(true);
          setLoading(false);
        }
      });
  }, [router]);

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-5 py-20">
        <p className="kicker">Loading…</p>
      </section>
    );
  }

  if (!authed) return null;

  return (
    <section className="max-w-6xl mx-auto px-5 py-20">
      <p className="kicker">Member area</p>
      <h1 className="text-5xl mb-3">Welcome.</h1>
      <p className="text-base mb-10 max-w-2xl opacity-80">
        Interactive tools live here. Pick one to run it in the browser, or send the keyword to the
        SOR7ED WhatsApp number.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {TOOLS.filter((t) => t.status === 'live').map((t) => (
          <Link key={t.slug} href={`/tools/${t.slug}`} className="dark-card block">
            <p className="kicker">{t.branch}</p>
            <p className="display text-3xl mt-2">{t.name}</p>
            <p className="text-sm mt-2 opacity-70">{t.tagline}</p>
            <p className="text-sm mt-4 text-[#ffc107]">Open →</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
