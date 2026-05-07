import Link from 'next/link';
import SEOJsonLd from '@/components/SEOHead';
import { getArticles, getTools } from '@/lib/notion-content';

export const revalidate = 60;

export default async function HomePage() {
  const [tools, articles] = await Promise.all([getTools(), getArticles()]);
  const featuredTool = tools.find((tool: any) => tool.status === 'live') ?? tools[0];
  const recent = articles.slice(0, 3);

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
      <SEOJsonLd
        title="SOR7ED — Templates, not inspiration"
        description="Practical templates and micro-tools for neurodivergent adults. Delivered via WhatsApp."
      />

      {/* 1. HERO — text right */}
      <section className="h-dvh snap-start flex" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="w-1/2 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="display select-none leading-none" style={{ fontSize: 'clamp(8rem,16vw,14rem)', color: 'rgba(255,193,7,0.06)' }}>SOR<br />7ED</p>
        </div>
        <div className="w-1/2 flex items-center justify-center p-16">
          <div className="max-w-lg">
            <p className="kicker mb-6">SOR7ED — pronounced sorted</p>
            <h1 className="text-5xl md:text-7xl leading-[0.9] mb-8">
              Your brain is not broken.<br />
              <span style={{ color: '#ffc107' }}>Your tools are.</span>
            </h1>
            <p className="text-base md:text-lg opacity-70 leading-relaxed mb-10">
              Practical protocols for ADHD, autism, dyslexia — straight to your WhatsApp. No app. No fluff.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/signup" className="btn-yellow">Join free</Link>
              <Link href="/tools" className="btn-outline">Browse tools</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS — text right */}
      <section className="h-dvh snap-start flex" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="w-1/2 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="display select-none leading-none" style={{ fontSize: 'clamp(8rem,16vw,14rem)', color: 'rgba(255,255,255,0.03)' }}>3</p>
        </div>
        <div className="w-1/2 flex items-center justify-center p-16">
          <div className="max-w-sm">
            <p className="kicker mb-4">How it works</p>
            <h2 className="text-4xl md:text-5xl leading-[0.92] mb-10">Three steps.<br />That is it.</h2>
            <div className="space-y-8">
              {[
                { n: '01', t: 'Sign up', d: 'Free account. GDPR consent. WhatsApp number. Done.' },
                { n: '02', t: 'Send a keyword', d: 'TRIAGE, BURNOUT, SLEEP — text it straight to us.' },
                { n: '03', t: 'Get sorted', d: 'A structured protocol lands in your WhatsApp.' },
              ].map((step) => (
                <div key={step.n} className="flex gap-6 items-start">
                  <span className="display text-4xl leading-none shrink-0" style={{ color: '#ffc107' }}>{step.n}</span>
                  <div>
                    <p className="display text-xl mb-1">{step.t}</p>
                    <p className="text-sm opacity-60 leading-relaxed">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. 7 BRANCHES — text right */}
      <section className="h-dvh snap-start flex" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="w-1/2 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="display select-none leading-none" style={{ fontSize: 'clamp(8rem,16vw,14rem)', color: 'rgba(255,193,7,0.06)' }}>7</p>
        </div>
        <div className="w-1/2 flex items-center justify-center p-16">
          <div className="max-w-md">
            <p className="kicker mb-4">The 7 Branches</p>
            <h2 className="text-4xl md:text-5xl mb-8 leading-[0.92]">A framework for neurodivergent flourishing.</h2>
            <p className="text-base leading-[1.9] opacity-70">
              <strong style={{ color: '#ffc107' }}>Mind</strong> — focus, burnout, executive function.<br />
              <strong style={{ color: '#ffc107' }}>Body</strong> — sleep, sensory load, nervous system.<br />
              <strong style={{ color: '#ffc107' }}>Tech</strong> — time, admin, productivity systems.<br />
              <strong style={{ color: '#ffc107' }}>Wealth</strong> — money, debt, ADHD tax.<br />
              <strong style={{ color: '#ffc107' }}>Connection</strong> — relationships, communication.<br />
              <strong style={{ color: '#ffc107' }}>Identity</strong> — masking, late diagnosis, authenticity.<br />
              <strong style={{ color: '#ffc107' }}>Growth</strong> — career, skills, building a life that fits.
            </p>
            <div className="mt-8">
              <Link href="/blog" className="btn-outline">Read the blog</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED TOOL — text right */}
      {featuredTool && (
        <section className="h-dvh snap-start flex" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="w-1/2 flex items-center justify-center p-16" style={{ background: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', padding: '2rem', width: '100%', maxWidth: '320px' }}>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '1.25rem' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'block' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'block' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffc107', display: 'block' }} />
              </div>
              <p className="mono text-sm mb-2" style={{ color: 'rgba(255,193,7,0.7)' }}>{'>'} You: {featuredTool.keyword}</p>
              <p className="mono text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>{'>'} SOR7ED: Sign up to unlock…</p>
            </div>
          </div>
          <div className="w-1/2 flex items-center justify-center p-16">
            <div className="max-w-md">
              <p className="kicker mb-4">Featured tool</p>
              <h2 className="text-4xl md:text-5xl mb-4 leading-[0.92]">{featuredTool.name}</h2>
              <p className="text-base mb-8 opacity-70 leading-relaxed">{featuredTool.tagline}</p>
              <div className="flex flex-wrap gap-3">
                <Link href={'/tools/' + featuredTool.slug} className="btn-yellow">Try it now</Link>
                <Link href="/tools" className="btn-outline">All tools</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. RECENT BLOG — full width */}
      <section className="h-dvh snap-start flex flex-col justify-center" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="page-wrap">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <p className="kicker mb-2">From the blog</p>
              <h2 className="text-5xl md:text-6xl">Recent reads.</h2>
            </div>
            <Link href="/blog" className="btn-outline" style={{ fontSize: '0.95rem', padding: '0.7rem 1.5rem' }}>All articles</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'rgba(255,255,255,0.06)' }}>
            {recent.map((article: any) => (
              <Link key={article.slug} href={'/blog/' + article.slug} style={{ background: '#0a0a0a', padding: '1.75rem', display: 'block' }}>
                <p className="kicker text-xs mb-2">{article.branch} · {article.readMinutes} min</p>
                <p className="display text-2xl mt-1 leading-tight mb-3">{article.title}</p>
                <p className="text-sm opacity-50 leading-relaxed line-clamp-2">{article.tldr}</p>
                <p className="kicker text-xs mt-4" style={{ color: '#ffc107' }}>Read →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SAFETY — text right */}
      <section className="h-dvh snap-start flex" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="w-1/2 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 className="display select-none text-center leading-none" style={{ fontSize: 'clamp(4rem,8vw,7rem)', color: 'rgba(255,255,255,0.04)' }}>SAFE<br />GDPR<br />PECR</h2>
        </div>
        <div className="w-1/2 flex items-center justify-center p-16">
          <div className="max-w-md">
            <p className="kicker mb-4">Important</p>
            <h2 className="text-4xl md:text-5xl leading-[0.92] mb-8">Safety &amp; Consent.</h2>
            <p className="opacity-60 leading-relaxed mb-4 text-sm">
              SOR7ED is not therapy or medical advice. It is not a crisis service. Data is collected only with explicit GDPR consent.
            </p>
            <p className="opacity-60 leading-relaxed text-sm">
              Not a crisis line — call 999 or text SHOUT to 85258. GDPR and PECR compliant. Text STOP any time to unsubscribe.
            </p>
          </div>
        </div>
      </section>

      {/* 7. CTA — text right */}
      <section className="h-dvh snap-start flex">
        <div className="w-1/2 flex items-center justify-center" style={{ background: '#ffc107' }}>
          <p className="display select-none leading-none" style={{ fontSize: 'clamp(8rem,18vw,16rem)', color: 'rgba(0,0,0,0.1)' }}>→</p>
        </div>
        <div className="w-1/2 flex items-center justify-center p-16">
          <div className="max-w-md">
            <p className="display text-sm mb-4" style={{ letterSpacing: '0.18em' }}>READY TO GET SORTED</p>
            <h2 className="text-5xl md:text-6xl leading-[0.92] mb-8">
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
