import Link from 'next/link';
import BranchGrid from '@/components/BranchGrid';
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

      <section className="h-dvh snap-start border-b-2 border-white/10 flex flex-col justify-center" style={{ position: 'relative', overflow: 'hidden' }}>
        <img src="/images/bg_section_one.png" alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right center', opacity: 0.4, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.95) 45%, rgba(0,0,0,0.2) 100%)' }} />
        <div className="w-full px-10 md:px-20 flex justify-start" style={{ position: 'relative' }}>
          <div className="max-w-2xl text-left">
            <p className="kicker mb-6">SOR7ED — pronounced sorted</p>
            <h1 className="text-6xl md:text-8xl leading-[0.9]">
              Your brain is not broken. <br />
              <span style={{ color: '#ffc107' }}>Your tools are.</span>
            </h1>
            <p className="text-lg md:text-xl mt-8 opacity-80 leading-relaxed">
              SOR7ED delivers practical templates and micro-tools for ADHD, autism, dyslexia, and
              related needs — straight to your WhatsApp. No app. No fluff. No inspiration.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 justify-start">
              <Link href="/signup" className="btn-yellow">
                Join free
              </Link>
              <Link href="/tools" className="btn-outline">
                Browse tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="h-dvh snap-start border-b-2 border-white/10 flex flex-col justify-center" style={{ position: 'relative', overflow: 'hidden' }}>
        <img src="/images/bg_section_steps.png" alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right center', opacity: 0.22, pointerEvents: 'none' }} />
        <div className="w-full px-10 md:px-20 flex justify-start" style={{ position: 'relative', zIndex: 1 }}>
          <div className="max-w-lg text-left">
            <p className="kicker mb-4">How it works</p>
            <h2 className="text-5xl md:text-6xl mb-12">Three steps. That is it.</h2>
            <div className="space-y-10 w-full">
              {[
                {
                  n: '01',
                  t: 'Sign up',
                  d: 'Create a free account. Confirm GDPR consent. Add your WhatsApp number.',
                },
                {
                  n: '02',
                  t: 'Text a keyword',
                  d: 'Like TRIAGE, MENU, or DECIDE — to +44 7360 277713.',
                },
                {
                  n: '03',
                  t: 'Get a result',
                  d: 'A structured template lands in WhatsApp. Take one action.',
                },
              ].map((step) => (
                <div key={step.n} className="flex gap-8 items-start text-left">
                  <p className="display text-5xl text-[#ffc107] leading-none shrink-0">{step.n}</p>
                  <div>
                    <p className="display text-2xl">{step.t}</p>
                    <p className="text-base opacity-70 mt-2 leading-relaxed">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="h-dvh snap-start border-b-2 border-white/10 flex flex-col justify-center" style={{ position: 'relative', overflow: 'hidden' }}>
        <img src="/images/bg_section_three.png" alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right center', opacity: 0.18, pointerEvents: 'none' }} />
        <div className="w-full px-10 md:px-20" style={{ position: 'relative', zIndex: 1 }}>
          <p className="kicker mb-4">The 7 Branches</p>
          <h2 className="text-4xl md:text-5xl mb-10">The SOR7ED Life: A Framework for Neurodivergent Flourishing</h2>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-4 text-sm md:text-base leading-relaxed opacity-80">
              <p>Living with a brain that processes the world differently often feels like trying to navigate a high-speed highway with a manual gearbox — it's powerful, but it requires a specific kind of internal scaffolding to keep from stalling.</p>
              <p>At the foundation lies the biological baseline: <strong>FEEL GOOD</strong>. Once that's stabilised, we address the momentum engine — <strong>KEEP GOING</strong>. Then <strong>PLAN AHEAD</strong> and <strong>SPEND SMART</strong> act as guardrails. <strong>BE CONNECTED</strong> and <strong>BE YOURSELF</strong> bring authenticity. Finally, we <strong>LEVEL UP</strong>.</p>
            </div>
            <div>
              <BranchGrid />
            </div>
          </div>
        </div>
      </section>

      {featuredTool && (
        <section className="h-dvh snap-start border-b-2 border-white/10 flex flex-col justify-center" style={{ position: 'relative', overflow: 'hidden' }}>
        <img src="/images/bg-1.png" alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right center', opacity: 0.2, pointerEvents: 'none' }} />
          <div className="w-full px-10 md:px-20 flex justify-start" style={{ position: 'relative', zIndex: 1 }}>
            <div className="max-w-lg text-left">
              <p className="kicker mb-4">Featured tool</p>
              <h2 className="text-5xl md:text-6xl mb-4">{featuredTool.name}</h2>
              <p className="text-lg mb-8 opacity-80 leading-relaxed">{featuredTool.tagline}</p>
              <div className="flex flex-wrap gap-3 mb-10 justify-start">
                <Link href={`/tools/${featuredTool.slug}`} className="btn-yellow">
                  Try interactive preview
                </Link>
                <Link href="/tools" className="btn-outline">
                  All tools
                </Link>
              </div>
              <div className="border-t border-white/20 pt-6">
                <p className="mono text-sm opacity-60">
                  {`>`} You: {featuredTool.keyword}
                </p>
                <p className="mono text-sm mt-2 opacity-60">
                  {`>`} SOR7ED: Sign up to unlock the full plan…
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="h-dvh snap-start border-b-2 border-white/10 flex flex-col justify-center">
        <div className="w-full px-10 md:px-20">
          <div className="flex flex-wrap items-end justify-start gap-4 mb-10">
            <div>
              <p className="kicker mb-2">From the blog</p>
              <h2 className="text-5xl md:text-6xl">Recent reads.</h2>
            </div>
            <Link href="/blog" className="btn-outline !text-base">
              All articles
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {recent.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="block border-l-2 border-[#ffc107] pl-5 py-1 hover:border-l-4 transition-all"
              >
                <p className="kicker text-xs mb-2">
                  {article.branch} · {article.readMinutes} min
                </p>
                <p className="display text-2xl mt-1 leading-tight">{article.title}</p>
                <p className="text-sm mt-3 opacity-60 leading-relaxed line-clamp-2">{article.tldr}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="h-dvh snap-start border-b-2 border-white/10 flex flex-col justify-center">
        <div className="w-full px-10 md:px-20 flex justify-start">
          <div className="max-w-lg text-left">
            <p className="kicker mb-4">Important</p>
            <h2 className="text-5xl md:text-6xl mb-8">Safety &amp; Consent.</h2>
            <div className="space-y-5 text-base">
              <p className="opacity-70 leading-relaxed">
                SOR7ED is not therapy or medical advice. It is not a crisis service.
                Data is collected only with explicit GDPR consent.
              </p>
              <ul className="space-y-3 opacity-80">
                <li className="flex gap-3"><span className="text-red-400 shrink-0">✕</span> <span>Not a crisis line — call 999 or text SHOUT to 85258</span></li>
                <li className="flex gap-3"><span className="text-[#ffc107] shrink-0">✓</span> <span>GDPR/PECR compliant. No pre-ticked boxes</span></li>
                <li className="flex gap-3"><span className="text-[#ffc107] shrink-0">✓</span> <span>Text STOP any time to unsubscribe</span></li>
                <li className="flex gap-3"><span className="text-[#ffc107] shrink-0">✓</span> <span>End-to-end encrypted WhatsApp delivery</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="h-dvh snap-start flex flex-col justify-center" style={{ position: 'relative', overflow: 'hidden' }}>
        <img src="/images/bg_section_tools2.png" alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left center', opacity: 0.25, pointerEvents: 'none' }} />
        <div className="w-full px-10 md:px-20 flex justify-end" style={{ position: 'relative', zIndex: 1 }}>
          <div className="max-w-2xl text-left">
            <p className="display text-sm" style={{ letterSpacing: '0.18em' }}>
              READY TO GET SORTED
            </p>
            <p className="display text-5xl md:text-7xl mt-2 leading-tight">
              Practical tools. <br />
              Straight to your WhatsApp.
            </p>
            <div className="mt-10">
              <Link
                href="/signup"
                className="inline-block border-4 border-black px-10 py-5 display text-3xl uppercase bg-[#ffc107] text-black hover:bg-black hover:text-[#ffc107] hover:border-[#ffc107] transition-all"
              >
                Create free account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
