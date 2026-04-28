import Link from 'next/link';
import { TOOLS } from '@/data/tools';

export const metadata = { title: 'Member area' };

// NOTE: This is a placeholder shell. In production, wrap with Supabase magic-link
// auth gate (server component reading the session cookie). If unauthenticated,
// redirect to /signup.
export default function MemberAreaPage() {
  return (
    <section className="max-w-6xl mx-auto px-5 py-20">
      <p className="kicker">Member area</p>
      <h1 className="text-5xl mb-3">Welcome.</h1>
      <p className="text-base mb-10 max-w-2xl">
        Interactive tools live here. Pick one to run it in the browser, or send the keyword to the
        SOR7ED WhatsApp number.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {TOOLS.filter((t) => t.status === 'live').map((t) => (
          <Link key={t.slug} href={`/tools/${t.slug}`} className="dark-card block">
            <p className="kicker">{t.branch}</p>
            <p className="display text-3xl mt-2">{t.name}</p>
            <p className="text-sm mt-2">{t.tagline}</p>
            <p className="text-sm mt-4 text-[#ffc107]">Open →</p>
          </Link>
        ))}
      </div>

      <p className="text-xs opacity-80 mt-10">
        Auth gate is a placeholder. Plug in <span className="mono">@supabase/auth-helpers-nextjs</span> magic-link checks before shipping.
      </p>
    </section>
  );
}
