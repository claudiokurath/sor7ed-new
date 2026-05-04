import Link from 'next/link';
import SEOJsonLd from '@/components/SEOHead';
import { getArticles, getTools } from '@/lib/notion-content';

export const revalidate = 60;

export default async function HomePage() {
  const [tools, articles] = await Promise.all([getTools(), getArticles()]);
  const featuredTool = tools.find((tool) => tool.status === 'live') ?? tools[0];
  const recent = articles.slice(0, 3);

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
      <SEOJsonLd
        title="SOR7ED — Templates, not inspiration"
        description="Practical templates and micro-tools for neurodivergent adults. Delivered via WhatsApp."
      />

      {/* HERO */}
      <section className="h-dvh snap-start border-b-2 border-white/10 flex flex-col justify-center">
        <div className="page-wrap">
          <p className="kicker mb-6">SOR7ED — pronounced sorted</p>
          <h1 className="text-6xl md:text-8xl leading-[0.9]">
            Your brain is not broken. <br />
            <span style={{ color: '#ffc107' }}>Your tools are.</span>
          </h1>
          <p className="text-lg md:text-xl mt-8 opacity-80 leading-relaxed max-w-2xl">
            SOR7ED delivers practical templates and micro-tools for ADHD, autism, dyslexia, and
            related needs — straight to your WhatsApp. No app. No fluff. No inspiration.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/signup" className="btn-yellow">Join free</Link>
            <Link href="/tools" className="btn-outline">Browse tools</Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="h-dvh snap-start border-b-2 border-white/10 flex flex-col justify-center">
        <div className="page-wrap">
          <p className="kicker mb-4">How it works</p>
          <h2 className="text-5xl md:text-6xl mb-12">Three steps. That is it.</h2>
          <div className="space-y-10 max-w-lg">
            {[
              { n: '01', t: 'Sign up', d: 'Create a free account. Confirm GDPR consent. Add your WhatsApp number.' },
              { n: '02', t: 'Send a keyword', d: 'Like TRIAGE, MENU, or BURNOUT — straight to our WhatsApp.' },
              { n: '03', t: 'Get a result', d: 'A structured protocol lands in WhatsApp. Take one action.' },
            ].map((step) => (
              <div key={step.n} className="flex gap-8 items-start">
                <p className="display text-5xl text-[#ffc107] leading-none shrink-0">{step.n}</p>
                <div>
                  <p className="display text-2xl">{step.t}</p>
                  <p className="text-base opacity-70 mt-2 leading-relaxed">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 BRANCHES */}
      <section className="h-dvh snap-start border-b-2 border-white/10 flex flex-col justify-center">
        <div className="page-wrap max-w-3xl">
          <p className="kicker mb-4">The 7 Branches</p>
          <h2 className="text-4xl md:text-5xl mb-8">A framework for neurodivergent flourishing.</h2>
          <p className="text-base md:text-lg leading-relaxed opacity-80">
            Everything starts with your biological baseline —{' '}
            <strong style={{ color: '#ffc107' }}>Feel Good</strong> covers sleep, sensory load, medication, and nervous system regulation. From there,{' '}
            <strong style={{ color: '#ffc107' }}>Keep Going</strong> builds momentum: resilience, burnout recovery, and the habits that stop you stalling.{' '}
            <strong style={{ color: '#ffc107' }}>Plan Ahead</strong> and{' '}
            <strong style={{ color: '#ffc107' }}>Spend Smart</strong> act as structural guardrails — time, admin, money, and the ADHD tax.{' '}
            <strong style={{ color: '#ffc107' }}>Be Connected</strong> addresses relationships, communication, and the intimacy complications nobody talks about.{' '}
            <strong style={{ color: '#ffc107' }}>Be Yourself</strong> covers identity, late diagnosis, masking, and living authentically in a neurotypical world. And{' '}
            <strong style={{ color: '#ffc107' }}>Level Up</strong> is where all of it compounds — skills, career, and building a life that fits your brain.
          </p>
          <div className="mt-8">
            <Link href="/blog" className="btn-outline">Read the blog</Link>
          </div>
        </div>
      </section>

      {/* FEATURED TOOL */}
      {featuredTool && (
        <section className="h-dvh snap-start border-b-2 border-white/10 flex flex-col justify-center">
          <div className="page-wrap">
            <p className="kicker mb-4">Featured tool</p>
            <h2 className="text-5xl md:text-6xl mb-4">{featuredTool.name}</h2>
            <p className="text-lg mb-8 opacity-80 leading-relaxed max-w-lg">{featuredTool.tagline}</p>
            <div className="flex flex-wrap gap-3 mb-10">
              <Link href={'/tools/' + featuredTool.slug} className="btn-yellow">Try it now</Link>
              <Link href="/tools" className="btn-outline">All tools</Link>
            </div>
            <div className="border-t border-white/20 pt-6 max-w-sm">
              <p className="mono text-sm opacity-60">{'>'} You: {featuredTool.keyword}</p>
              <p className="mono text-sm mt-2 opacity-60">{'>'} SOR7ED: Sign up to unlock the full protocol…</p>
            </div>
          </div>
        </section>
      )}

      {/* RECENT BLOG */}
      <section className="h-dvh snap-start border-b-2 border-white/10 flex flex-col justify-center">
        <div className="page-wrap">
          <div className="flex flex-wrap items-end gap-4 mb-10">
            <div>
              <p className="kicker mb-2">From the blog</p>
              <h2 className="text-5xl md:text-6xl">Recent reads.</h2>
            </div>
            <Link href="/blog" className="btn-outline !text-base">All articles</Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {recent.map((article) => (
              <Link key={article.slug} href={'/blog/' + article.slug} className="block border-l-2 border-[#ffc107] pl-5 py-1 hover:border-l-4 transition-all">
                <p className="kicker text-xs mb-2">{article.branch} · {article.readMinutes} min</p>
                <p className="display text-2xl mt-1 leading-tight">{article.title}</p>
                <p className="text-sm mt-3 opacity-60 leading-relaxed line-clamp-2">{article.tldr}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SAFETY */}
      <section className="h-dvh snap-start border-b-2 border-white/10 flex flex-col justify-center">
        <div className="page-wrap max-w-lg">
          <p className="kicker mb-4">Important</p>
          <h2 className="text-5xl md:text-6xl mb-8">Safety &amp; Consent.</h2>
          <p className="opacity-70 leading-relaxed mb-6">
            SOR7ED is not therapy or medical advice. It is not a crisis service. Data is collected only with explicit GDPR consent.
          </p>
          <p className="opacity-80 leading-relaxed">
            Not a crisis line — call 999 or text SHOUT to 85258. GDPR and PECR compliant, no pre-ticked boxes. Text STOP any time to unsubscribe. End-to-end encrypted WhatsApp delivery.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="h-dvh snap-start flex flex-col justify-center">
        <div className="page-wrap">
          <p className="display text-sm" style={{ letterSpacing: '0.18em' }}>READY TO GET SORTED</p>
          <p className="display text-5xl md:text-7xl mt-2 leading-tight">
            Practical tools. <br />Straight to your WhatsApp.
          </p>
          <div className="mt-10">
            <Link href="/signup" className="inline-block border-4 border-black px-10 py-5 display text-3xl uppercase bg-[#ffc107] text-black hover:bg-black hover:text-[#ffc107] hover:border-[#ffc107] transition-all">
              Create free account
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
