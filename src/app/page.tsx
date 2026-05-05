import Link from 'next/link';
import SEOJsonLd from '@/components/SEOHead';
import { getArticles, getTools } from '@/lib/notion-content';

export const revalidate = 60;

export default async function HomePage() {
  const [tools, articles] = await Promise.all([getTools(), getArticles()]);
  const featuredTool = tools.find((t) => t.status === 'live') ?? tools[0];
  const recent = articles.slice(0, 3);

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
      <SEOJsonLd
        title="SOR7ED — Your brain isn't broken. Your tools are."
        description="Practical tools and protocols for neurodivergent adults. Delivered via WhatsApp."
      />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="h-dvh snap-start flex flex-col justify-center relative overflow-hidden" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        {/* Big ghost number */}
        <span className="section-number">01</span>

        <div className="page-wrap">
          {/* Accent line */}
          <span className="accent-line animate-fade-up" />

          <h1 className="animate-fade-up-delay-1" style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)', maxWidth: '14ch' }}>
            Your brain{' '}
            <span style={{ color: '#ffc107' }}>isn't broken.</span>
            <br />
            Your tools are.
          </h1>

          <p className="animate-fade-up-delay-2" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', maxWidth: '52ch', opacity: 0.65, marginTop: '1.75rem', lineHeight: 1.7 }}>
            SOR7ED is a WhatsApp-first platform delivering practical protocols, templates, and tools for ADHD, autism, dyslexia, and the chaos of being a human with a non-standard brain.
          </p>

          <div className="animate-fade-up-delay-3" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2.5rem' }}>
            <Link href="/signup" className="btn-yellow">Get started free →</Link>
            <Link href="/tools" className="btn-outline">Explore tools</Link>
          </div>

          {/* Stats row */}
          <div className="animate-fade-up-delay-4" style={{ display: 'flex', gap: '3rem', marginTop: '4rem', flexWrap: 'wrap' }}>
            <div className="stat-block">
              <div className="stat-number">7</div>
              <div className="stat-label">Life branches</div>
            </div>
            <div className="stat-block">
              <div className="stat-number">25+</div>
              <div className="stat-label">WhatsApp protocols</div>
            </div>
            <div className="stat-block">
              <div className="stat-number">Free</div>
              <div className="stat-label">To start</div>
            </div>
          </div>
        </div>

        {/* Bottom marquee strip */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTop: '1px solid rgba(255,255,255,0.06)', padding: '0.75rem 0', overflow: 'hidden', background: 'rgba(255,193,7,0.04)' }}>
          <div className="marquee-track" style={{ fontFamily: 'League Gothic, sans-serif', fontSize: '0.8rem', letterSpacing: '0.2em', color: 'rgba(255,193,7,0.5)', textTransform: 'uppercase' }}>
            {['TRIAGE', 'BURNOUT', 'SLEEP', 'MONEY', 'OVERWHELM', 'SHAME', 'FOCUS', 'MASK', 'PLAN', 'CONNECT', 'DOPAMINE', 'SENSORY', 'MEDS', 'TRIAGE', 'BURNOUT', 'SLEEP', 'MONEY', 'OVERWHELM', 'SHAME', 'FOCUS', 'MASK', 'PLAN', 'CONNECT', 'DOPAMINE', 'SENSORY', 'MEDS'].map((k, i) => (
              <span key={i} style={{ marginRight: '3rem' }}>{k} ·</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section className="h-dvh snap-start flex flex-col justify-center relative overflow-hidden" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: '#0d0d0d' }}>
        <span className="section-number">02</span>
        <div className="page-wrap">
          <span className="kicker" style={{ marginBottom: '1rem' }}>How it works</span>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', marginBottom: '3.5rem' }}>Three steps. That is it.</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0', maxWidth: '900px' }}>
            {[
              { n: '01', t: 'Sign up', d: 'Create a free account. Two clicks. No credit card. Confirm your WhatsApp number.' },
              { n: '02', t: 'Send a keyword', d: 'Text TRIAGE, BURNOUT, SLEEP — whatever you need right now — to our WhatsApp.' },
              { n: '03', t: 'Get sorted', d: 'A structured, actionable protocol lands in your WhatsApp. No fluff. One thing to do.' },
            ].map((step, i) => (
              <div key={step.n} style={{ padding: '2rem', borderLeft: i === 0 ? '3px solid #ffc107' : '1px solid rgba(255,255,255,0.08)', borderTop: '1px solid rgba(255,255,255,0.08)', borderRight: i === 2 ? '1px solid rgba(255,255,255,0.08)' : 'none', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontFamily: 'League Gothic, sans-serif', fontSize: '3.5rem', color: 'rgba(255,193,7,0.25)', lineHeight: 1, marginBottom: '1rem' }}>{step.n}</div>
                <div style={{ fontFamily: 'League Gothic, sans-serif', fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: '0.75rem' }}>{step.t}</div>
                <p style={{ fontSize: '0.9rem', opacity: 0.55, lineHeight: 1.7 }}>{step.d}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '3rem' }}>
            <Link href="/signup" className="btn-yellow">Start now →</Link>
          </div>
        </div>
      </section>

      {/* ── 7 BRANCHES ───────────────────────────────────── */}
      <section className="h-dvh snap-start flex flex-col justify-center relative overflow-hidden" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <span className="section-number">03</span>
        <div className="page-wrap" style={{ maxWidth: '900px' }}>
          <span className="kicker" style={{ marginBottom: '1rem' }}>The 7 branches</span>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '2rem' }}>A framework for neurodivergent flourishing.</h2>

          <p style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)', lineHeight: 1.8, opacity: 0.75, maxWidth: '70ch' }}>
            Everything starts with your biological baseline —{' '}
            <strong style={{ color: '#ffc107', fontWeight: 700 }}>Feel Good</strong>{' '}
            covers sleep, sensory load, and nervous system regulation.{' '}
            <strong style={{ color: '#ffc107', fontWeight: 700 }}>Keep Going</strong>{' '}
            builds the momentum engine: resilience and burnout recovery.{' '}
            <strong style={{ color: '#ffc107', fontWeight: 700 }}>Plan Ahead</strong>{' '}
            and{' '}
            <strong style={{ color: '#ffc107', fontWeight: 700 }}>Spend Smart</strong>{' '}
            act as structural guardrails — time, admin, and the ADHD tax.{' '}
            <strong style={{ color: '#ffc107', fontWeight: 700 }}>Be Connected</strong>{' '}
            addresses relationships and the intimacy complications nobody names.{' '}
            <strong style={{ color: '#ffc107', fontWeight: 700 }}>Be Yourself</strong>{' '}
            covers identity, late diagnosis, and masking. And{' '}
            <strong style={{ color: '#ffc107', fontWeight: 700 }}>Level Up</strong>{' '}
            is where all of it compounds — building a life that actually fits your brain.
          </p>

          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/blog" className="btn-outline">Read the blog →</Link>
            <Link href="/tools" className="btn-outline">Try the tools →</Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED TOOL ────────────────────────────────── */}
      {featuredTool && (
        <section className="h-dvh snap-start flex flex-col justify-center relative overflow-hidden" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: '#0d0d0d' }}>
          <span className="section-number">04</span>
          <div className="page-wrap">
            <span className="kicker" style={{ marginBottom: '1rem' }}>Featured tool</span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', marginBottom: '1rem', color: '#ffc107' }}>{featuredTool.name}</h2>
            <p style={{ fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', maxWidth: '48ch', opacity: 0.65, marginBottom: '2.5rem', lineHeight: 1.7 }}>{featuredTool.tagline}</p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
              <Link href={'/tools/' + featuredTool.slug} className="btn-yellow">Try it now →</Link>
              <Link href="/tools" className="btn-outline">All tools</Link>
            </div>

            {/* Terminal preview */}
            <div style={{ maxWidth: '380px', background: '#111', border: '1px solid rgba(255,255,255,0.1)', padding: '1.25rem 1.5rem' }}>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '1rem' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'block' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'block' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffc107', display: 'block' }} />
              </div>
              <p className="mono" style={{ color: 'rgba(255,193,7,0.7)', fontSize: '0.8rem' }}>{'>'} You: {featuredTool.keyword}</p>
              <p className="mono" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', marginTop: '0.4rem' }}>{'>'} SOR7ED: Sign up to unlock your protocol…</p>
            </div>
          </div>
        </section>
      )}

      {/* ── RECENT BLOG ──────────────────────────────────── */}
      <section className="h-dvh snap-start flex flex-col justify-center relative overflow-hidden" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <span className="section-number">05</span>
        <div className="page-wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="kicker" style={{ marginBottom: '0.5rem' }}>From the blog</span>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>Real talk. Real protocols.</h2>
            </div>
            <Link href="/blog" className="btn-outline" style={{ fontSize: '0.95rem', padding: '0.7rem 1.5rem' }}>All articles →</Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.06)' }}>
            {recent.map((article, i) => (
              <Link key={article.slug} href={'/blog/' + article.slug} style={{ background: '#0a0a0a', padding: '1.75rem', display: 'block', transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#141414')}
                onMouseLeave={e => (e.currentTarget.style.background = '#0a0a0a')}
              >
                <span className="branch-pill" style={{ marginBottom: '1rem' }}>{article.branch}</span>
                <p style={{ fontFamily: 'League Gothic, sans-serif', fontSize: 'clamp(1.3rem, 2vw, 1.6rem)', textTransform: 'uppercase', lineHeight: 0.95, marginBottom: '0.85rem', transition: 'color 0.15s' }}>{article.title}</p>
                <p style={{ fontSize: '0.85rem', opacity: 0.5, lineHeight: 1.65, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{article.tldr}</p>
                <p style={{ fontFamily: 'League Gothic, sans-serif', fontSize: '0.85rem', letterSpacing: '0.1em', color: '#ffc107', marginTop: '1.25rem', textTransform: 'uppercase' }}>{article.readMinutes} min read →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAFETY ───────────────────────────────────────── */}
      <section className="h-dvh snap-start flex flex-col justify-center relative overflow-hidden" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: '#0d0d0d' }}>
        <span className="section-number">06</span>
        <div className="page-wrap" style={{ maxWidth: '640px' }}>
          <span className="kicker" style={{ marginBottom: '1rem' }}>Important</span>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', marginBottom: '2rem' }}>Safety &amp; consent.</h2>
          <p style={{ fontSize: '1rem', opacity: 0.6, lineHeight: 1.8, marginBottom: '1rem' }}>
            SOR7ED is not therapy, medical advice, or a crisis service. If you are in crisis — call 999 or text SHOUT to 85258.
          </p>
          <p style={{ fontSize: '1rem', opacity: 0.6, lineHeight: 1.8 }}>
            We are GDPR and PECR compliant. No pre-ticked boxes. No spam. Text STOP at any time to unsubscribe. All WhatsApp messages are end-to-end encrypted.
          </p>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section className="h-dvh snap-start flex flex-col justify-center relative overflow-hidden">
        <span className="section-number">07</span>
        {/* Yellow accent background block */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', background: 'rgba(255,193,7,0.03)', borderLeft: '1px solid rgba(255,193,7,0.08)' }} />

        <div className="page-wrap">
          <span className="accent-line" style={{ width: '4rem' }} />
          <h2 style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', maxWidth: '12ch', lineHeight: 0.9, marginBottom: '2rem' }}>
            Ready to get <span style={{ color: '#ffc107' }}>sorted?</span>
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.55, maxWidth: '44ch', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Practical tools. Straight to your WhatsApp. No app download. No monthly subscription to start.
          </p>
          <Link href="/signup" className="btn-yellow" style={{ fontSize: '1.3rem', padding: '1.1rem 2.5rem' }}>
            Create free account →
          </Link>
        </div>
      </section>

    </div>
  );
}
