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
    <>
      <SEOJsonLd
        title="SOR7ED — Templates, not inspiration"
        description="Practical templates and micro-tools for neurodivergent adults. Delivered via WhatsApp."
      />

      <section
        className="h-dvh snap-start border-b-2 border-white flex flex-col justify-center relative overflow-hidden"
        style={{
          backgroundImage: 'url("/bg-0.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-6xl mx-auto px-5 py-24 relative z-10 w-full flex justify-start">
          <div className="max-w-2xl text-left text-glow">
            <p className="kicker mb-6">SOR7ED — pronounced sorted</p>
            <h1 className="text-6xl md:text-8xl leading-[0.9]">
              Your brain is not broken. <br />
              <span style={{ color: '#ffc107' }}>Your tools are.</span>
            </h1>
            <p className="text-lg md:text-xl mt-8 font-medium">
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

      <section
        className="h-dvh snap-start border-b-2 border-white flex flex-col justify-center relative overflow-hidden"
        style={{
          backgroundImage: 'url("/bg-1.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-6xl mx-auto px-5 py-20 relative z-10 w-full flex justify-end">
          <div className="max-w-2xl text-left text-glow">
            <p className="kicker">How it works</p>
            <h2 className="text-5xl md:text-6xl mb-10">Three steps. That is it.</h2>
            <div className="space-y-8 w-full">
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
                <div key={step.n} className="flex gap-6 items-start text-left">
                  <p className="display text-5xl text-[#ffc107] leading-none">{step.n}</p>
                  <div>
                    <p className="display text-2xl">{step.t}</p>
                    <p className="text-base font-medium opacity-90 mt-1">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="h-dvh snap-start border-b-2 border-white flex flex-col justify-center relative overflow-hidden"
        style={{
          backgroundImage: 'url("/bg-2.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-6xl mx-auto px-5 py-20 relative z-10 w-full flex justify-end">
          <div className="max-w-3xl text-left flex flex-col items-start text-glow">
            <p className="kicker">The 7 Branches</p>
            <h2 className="text-5xl md:text-6xl mb-3">Built around real life.</h2>
            <p className="text-base max-w-xl mb-10 font-medium">
              Every tool and article on SOR7ED maps to one of seven life areas — so when you are
              stuck, you can find the right help fast.
            </p>
            <BranchGrid />
          </div>
        </div>
      </section>

      {featuredTool && (
        <section
          className="h-dvh snap-start border-b-2 border-white flex flex-col justify-center relative overflow-hidden"
          style={{
            backgroundImage: 'url("/bg-3.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-6xl mx-auto px-5 py-20 relative z-10 w-full flex justify-end">
            <div className="max-w-2xl text-left text-glow">
              <p className="kicker">Featured tool</p>
              <h2 className="text-5xl md:text-6xl mb-4">{featuredTool.name}</h2>
              <p className="text-lg mb-6 font-medium opacity-95">{featuredTool.tagline}</p>
              <div className="flex flex-wrap gap-3 mb-8 justify-start">
                <Link href={`/tools/${featuredTool.slug}`} className="btn-yellow">
                  Try interactive preview
                </Link>
                <Link href="/tools" className="btn-outline">
                  All tools
                </Link>
              </div>
              <div className="border-t border-white/40 pt-6">
                <p className="mono text-sm font-bold">
                  {`>`} You: {featuredTool.keyword}
                </p>
                <p className="mono text-sm mt-2 font-bold">
                  {`>`} SOR7ED: Sign up to unlock the full plan…
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section
        className="h-dvh snap-start border-b-2 border-white flex flex-col justify-center relative overflow-hidden"
        style={{
          backgroundImage: 'url("/bg-4.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-6xl mx-auto px-5 py-20 relative z-10 w-full flex justify-end">
          <div className="max-w-4xl text-left text-glow">
            <div className="flex flex-wrap items-end justify-start gap-4 mb-8">
              <div>
                <p className="kicker">From the blog</p>
                <h2 className="text-5xl md:text-6xl">Recent reads.</h2>
              </div>
              <Link href="/blog" className="btn-outline !text-base">
                All articles
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {recent.map((article) => (
                <Link key={article.slug} href={`/blog/${article.slug}`} className="block border-l-4 border-[#ffc107] pl-4 py-2 hover:bg-white/10 transition">
                  <p className="kicker text-xs">
                    {article.branch} · {article.readMinutes} min
                  </p>
                  <p className="display text-2xl mt-1">{article.title}</p>
                  <p className="text-sm mt-3 font-medium opacity-95 line-clamp-2">{article.tldr}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="h-dvh snap-start border-b-2 border-white flex flex-col justify-center relative overflow-hidden"
        style={{
          backgroundImage: 'url("/bg-5.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-6xl mx-auto px-5 py-20 relative z-10 w-full flex justify-end">
          <div className="max-w-2xl text-left text-glow">
            <p className="kicker">Important</p>
            <h2 className="text-5xl md:text-6xl mb-6">Safety & Consent.</h2>
            <div className="mt-6 space-y-6 text-base font-medium">
              <p className="opacity-95 leading-relaxed">
                SOR7ED is not therapy or medical advice. It is not a crisis service.
                Data is collected only with explicit GDPR consent.
              </p>
              <ul className="space-y-3">
                <li className="flex gap-2">✕ <span>Not a crisis line — call 999 or text SHOUT to 85258</span></li>
                <li className="flex gap-2">✓ <span>GDPR/PECR compliant. No pre-ticked boxes</span></li>
                <li className="flex gap-2">✓ <span>Text STOP any time to unsubscribe</span></li>
                <li className="flex gap-2">✓ <span>End-to-end encrypted WhatsApp delivery</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        className="h-dvh snap-start flex flex-col justify-center relative overflow-hidden"
        style={{
          backgroundImage: 'url("/bg-6.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-6xl mx-auto px-5 py-16 flex flex-wrap items-center justify-between gap-10 relative z-10">
          <div className="max-w-2xl text-left text-glow">
            <p className="display text-sm" style={{ letterSpacing: '0.18em' }}>
              READY TO GET SORTED
            </p>
            <p className="display text-5xl md:text-7xl mt-1 leading-tight">
              Practical tools. <br />
              Straight to your WhatsApp.
            </p>
          </div>
          <Link
            href="/signup"
            className="border-4 border-black px-10 py-5 display text-3xl uppercase hover:bg-black hover:text-[#ffc107] transition-all bg-[#ffc107] text-black"
          >
            Create free account
          </Link>
        </div>
      </section>
    </>
  );
}
