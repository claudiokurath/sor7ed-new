import Link from 'next/link';
import SEOJsonLd from '@/components/SEOHead';
import { getArticles, getTools } from '@/lib/notion-content';

export const revalidate = 60;

const L = 'w-1/2 h-full flex items-center justify-center p-16';
const R = 'w-1/2 h-full flex items-center justify-center p-16';
const ghost = { color: 'rgba(255,193,7,0.06)', fontFamily: 'League Gothic, sans-serif', fontSize: 'clamp(8rem,14vw,13rem)', lineHeight: 1, userSelect: 'none' as const };

export default async function HomePage() {
  const [tools, articles] = await Promise.all([getTools(), getArticles()]);
  const featuredTool = tools.find((t: any) => t.status === 'live') ?? tools[0];
  const recent = articles.slice(0, 3);

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
      <SEOJsonLd title="SOR7ED — Templates, not inspiration" description="Practical templates and micro-tools for neurodivergent adults. Delivered via WhatsApp." />

      {/* 1. HERO */}
      <section className="h-dvh snap-start flex" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className={L} style={{ background: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={ghost}>SOR<br />7ED</p>
        </div>
        <div className={R}>
          <div style={{ maxWidth: 480 }}>
            <p className="kicker" style={{ marginBottom: '1.5rem' }}>SOR7ED — pronounced sorted</p>
            <h1 style={{ fontSize: 'clamp(2.8rem,5vw,4.5rem)', lineHeight: 0.92, marginBottom: '1.5rem' }}>
              Your brain is not broken.<br />
              <span style={{ color: '#ffc107' }}>Your tools are.</span>
            </h1>
            <p style={{ fontSize: '1rem', opacity: 0.65, lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: 380 }}>
              Practical protocols for ADHD, autism, dyslexia — straight to your WhatsApp. No app. No fluff.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/signup" className="btn-yellow">Join free</Link>
              <Link href="/tools" className="btn-outline">Browse tools</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="h-dvh snap-start flex" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className={L} style={{ background: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ ...ghost, color: 'rgba(255,255,255,0.04)' }}>3</p>
        </div>
        <div className={R}>
          <div style={{ maxWidth: 420 }}>
            <p className="kicker" style={{ marginBottom: '1rem' }}>How it works</p>
            <h2 style={{ fontSize: 'clamp(2.5rem,4vw,3.5rem)', lineHeight: 0.92, marginBottom: '2.5rem' }}>Three steps.<br />That is it.</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {[
                { n: '01', t: 'Sign up', d: 'Free account. GDPR consent. WhatsApp number. Done.' },
                { n: '02', t: 'Send a keyword', d: 'TRIAGE, BURNOUT, SLEEP — text it straight to us.' },
                { n: '03', t: 'Get sorted', d: 'A structured protocol lands in your WhatsApp.' },
              ].map(s => (
                <div key={s.n} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                  <span className="display" style={{ color: '#ffc107', fontSize: '2.5rem', lineHeight: 1, flexShrink: 0 }}>{s.n}</span>
                  <div>
                    <p className="display" style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{s.t}</p>
                    <p style={{ fontSize: '0.875rem', opacity: 0.55, lineHeight: 1.6 }}>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. 7 BRANCHES */}
      <section className="h-dvh snap-start flex" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className={L} style={{ background: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={ghost}>7</p>
        </div>
        <div className={R}>
          <div style={{ maxWidth: 440 }}>
            <p className="kicker" style={{ marginBottom: '1rem' }}>The 7 Branches</p>
            <h2 style={{ fontSize: 'clamp(2rem,3.5vw,3rem)', lineHeight: 0.92, marginBottom: '2rem' }}>A framework for neurodivergent flourishing.</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                ['Mind', 'focus, burnout, executive function'],
                ['Body', 'sleep, sensory load, nervous system'],
                ['Tech', 'time, admin, productivity systems'],
                ['Wealth', 'money, debt, ADHD tax'],
                ['Connection', 'relationships, communication'],
                ['Identity', 'masking, late diagnosis, authenticity'],
                ['Growth', 'career, skills, building a life that fits'],
              ].map(([name, desc]) => (
                <p key={name} style={{ fontSize: '0.95rem', lineHeight: 1.6, opacity: 0.75 }}>
                  <strong style={{ color: '#ffc107' }}>{name}</strong> — {desc}
                </p>
              ))}
            </div>
            <div style={{ marginTop: '2rem' }}>
              <Link href="/blog" className="btn-outline">Read the blog</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED TOOL */}
      {featuredTool && (
        <section className="h-dvh snap-start flex" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className={L} style={{ background: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', padding: '2rem', width: 300 }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: '1.25rem' }}>
                {[0.15, 0.15, 1].map((o, i) => <span key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: i === 2 ? '#ffc107' : `rgba(255,255,255,${o})`, display: 'block' }} />)}
              </div>
              <p className="mono" style={{ fontSize: '0.8rem', color: 'rgba(255,193,7,0.7)', marginBottom: '0.5rem' }}>{'>'} You: {featuredTool.keyword}</p>
              <p className="mono" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)' }}>{'>'} SOR7ED: Sign up to unlock…</p>
            </div>
          </div>
          <div className={R}>
            <div style={{ maxWidth: 440 }}>
              <p className="kicker" style={{ marginBottom: '1rem' }}>Featured tool</p>
              <h2 style={{ fontSize: 'clamp(2.5rem,4vw,3.5rem)', lineHeight: 0.92, marginBottom: '1rem' }}>{featuredTool.name}</h2>
              <p style={{ fontSize: '1rem', opacity: 0.65, lineHeight: 1.7, marginBottom: '2rem' }}>{featuredTool.tagline}</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href={'/tools/' + featuredTool.slug} className="btn-yellow">Try it now</Link>
                <Link href="/tools" className="btn-outline">All tools</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. RECENT BLOG */}
      <section className="h-dvh snap-start flex flex-col justify-center" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="page-wrap" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p className="kicker" style={{ marginBottom: '0.5rem' }}>From the blog</p>
              <h2 style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', lineHeight: 0.92 }}>Recent reads.</h2>
            </div>
            <Link href="/blog" className="btn-outline" style={{ fontSize: '0.9rem', padding: '0.65rem 1.4rem' }}>All articles</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'rgba(255,255,255,0.06)' }}>
            {recent.map((a: any) => (
              <Link key={a.slug} href={'/blog/' + a.slug} style={{ background: '#0a0a0a', padding: '1.75rem', display: 'block' }}>
                <p className="kicker" style={{ fontSize: '0.7rem', marginBottom: '0.75rem' }}>{a.branch} · {a.readMinutes} min</p>
                <p className="display" style={{ fontSize: '1.4rem', lineHeight: 0.95, marginBottom: '0.75rem' }}>{a.title}</p>
                <p style={{ fontSize: '0.85rem', opacity: 0.5, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{a.tldr}</p>
                <p className="kicker" style={{ fontSize: '0.7rem', marginTop: '1.25rem', color: '#ffc107' }}>Read →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SAFETY */}
      <section className="h-dvh snap-start flex" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className={L} style={{ background: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ ...ghost, color: 'rgba(255,255,255,0.03)', fontSize: 'clamp(5rem,10vw,9rem)' }}>!</p>
        </div>
        <div className={R}>
          <div style={{ maxWidth: 420 }}>
            <p className="kicker" style={{ marginBottom: '1rem' }}>Important</p>
            <h2 style={{ fontSize: 'clamp(2.5rem,4vw,3.5rem)', lineHeight: 0.92, marginBottom: '2rem' }}>Safety &amp; Consent.</h2>
            <p style={{ fontSize: '0.9rem', opacity: 0.55, lineHeight: 1.8, marginBottom: '1rem' }}>
              SOR7ED is not therapy or medical advice. It is not a crisis service. Data is collected only with explicit GDPR consent.
            </p>
            <p style={{ fontSize: '0.9rem', opacity: 0.55, lineHeight: 1.8 }}>
              Not a crisis line — call 999 or text SHOUT to 85258. GDPR and PECR compliant. Text STOP any time to unsubscribe.
            </p>
          </div>
        </div>
      </section>

      {/* 7. CTA */}
      <section className="h-dvh snap-start flex">
        <div className="w-1/2 h-full flex items-center justify-center" style={{ background: '#ffc107' }}>
          <p style={{ fontFamily: 'League Gothic, sans-serif', fontSize: 'clamp(10rem,20vw,18rem)', lineHeight: 1, color: 'rgba(0,0,0,0.12)', userSelect: 'none' }}>→</p>
        </div>
        <div className="w-1/2 h-full flex items-center justify-center p-16">
          <div style={{ maxWidth: 440 }}>
            <p className="display" style={{ fontSize: '0.75rem', letterSpacing: '0.18em', marginBottom: '1rem' }}>READY TO GET SORTED</p>
            <h2 style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)', lineHeight: 0.92, marginBottom: '2.5rem' }}>
              Practical tools.<br />Your WhatsApp.
            </h2>
            <Link href="/signup" className="inline-block border-4 border-black px-10 py-5 display text-2xl uppercase bg-[#ffc107] text-black hover:bg-black hover:text-[#ffc107] hover:border-[#ffc107] transition-all">
              Create free account
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
