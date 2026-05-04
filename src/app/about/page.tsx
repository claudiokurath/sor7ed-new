import Link from 'next/link';
import BranchGrid from '@/components/BranchGrid';
import SEOJsonLd from '@/components/SEOHead';

export const metadata = {
  title: 'About',
  description: 'SOR7ED is a neurodivergent-first content and tools platform based in London, UK.',
};

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <div style={{ position: 'relative', minHeight: '420px', display: 'flex', alignItems: 'center', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/hero-robot-goggles.png)', backgroundSize: 'cover', backgroundPosition: 'center right', opacity: 0.35 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.4) 100%)' }} />
        <div className="page-wrap" style={{ position: 'relative', paddingTop: '80px', paddingBottom: '80px', maxWidth: '600px' }}>
          <h1 className="anton" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 0.92, color: '#fff', marginBottom: '16px' }}>ABOUT
SOR7ED.</h1>
          <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300, fontSize: '1.05rem', color: 'rgba(255,255,255,0.65)', maxWidth: '480px', lineHeight: 1.6 }}>Built by a neurodivergent founder who got tired of life admin winning. Now it doesn't.</p>
        </div>
      </div>
      {/* HERO */}
      <div style={{ position: 'relative', minHeight: '420px', display: 'flex', alignItems: 'center', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/bg-6.png)', backgroundSize: 'cover', backgroundPosition: 'center right', opacity: 0.35 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.4) 100%)' }} />
        <div className="page-wrap" style={{ position: 'relative', paddingTop: '80px', paddingBottom: '80px', maxWidth: '600px' }}>
          <h1 className="anton" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 0.92, color: '#fff', marginBottom: '16px' }}>ABOUT
SOR7ED.</h1>
          <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300, fontSize: '1.05rem', color: 'rgba(255,255,255,0.65)', maxWidth: '480px', lineHeight: 1.6 }}>Built by a neurodivergent founder who got tired of life admin winning. Now it doesn't.</p>
        </div>
      </div>
      <SEOJsonLd
        title="About SOR7ED"
        description="SOR7ED is a neurodivergent-first content and tools platform based in London, UK."
        slug="about"
      />
      <section className="border-b-2 border-white">
        <div className="max-w-4xl mx-auto px-5 py-20">
          <p className="kicker">About</p>
          <h1 className="text-6xl md:text-7xl">Templates, not inspiration.</h1>
          <p className="text-lg mt-6 max-w-2xl">
            SOR7ED publishes practical articles and delivers templates and micro-tools via WhatsApp
            for adults with ADHD, autism, dyslexia, and related needs.
          </p>
        </div>
      </section>

      <section className="border-b-2 border-white">
        <div className="max-w-4xl mx-auto px-5 py-16">
          <h2 className="text-4xl mb-4">Why this exists</h2>
          <p className="text-base mb-4">
            Most productivity advice assumes a brain that can start tasks reliably, plan ahead,
            and maintain routines. For many neurodivergent people, those assumptions fail.
          </p>
          <p className="text-base mb-4">
            Telling someone to make a to-do list does not help when they cannot start. Telling
            them to use a calendar does not help with time blindness. Recommending another app
            adds friction, complexity, and shame.
          </p>
          <p className="text-base">
            SOR7ED meets people where they already are — in WhatsApp — and delivers structured
            support in the fastest possible way.
          </p>
        </div>
      </section>

      <section className="border-b-2 border-white">
        <div className="max-w-6xl mx-auto px-5 py-16">
          <p className="kicker">Framework</p>
          <h2 className="text-4xl mb-8">The 7 Branches.</h2>
          <BranchGrid />
        </div>
      </section>

      <section className="border-b-2 border-white">
        <div className="max-w-4xl mx-auto px-5 py-16 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-4xl mb-4">Company</h2>
            <ul className="text-sm space-y-2">
              <li>SOR7ED LIMITED</li>
              <li>Company number 16398701</li>
              <li>Founded 2025</li>
              <li>London, United Kingdom</li>
            </ul>
          </div>
          <div>
            <h2 className="text-4xl mb-4">Promises</h2>
            <ul className="text-sm space-y-2">
              <li>✓ Free templates and articles, forever</li>
              <li>✓ GDPR/PECR compliant — no data selling</li>
              <li>✓ STOP unsubscribe at any time</li>
              <li>✓ Crisis override — 999 / SHOUT 85258</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 py-20">
        <h2 className="text-5xl mb-4">Get started.</h2>
        <p className="text-base mb-8">
          Sign up free. Text a keyword. Get a structured template in seconds.
        </p>
        <Link href="/signup" className="btn-yellow">Create free account</Link>
      </section>
    </>
  );
}
