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

      <section className="h-dvh snap-start border-b-2 border-white flex flex-col justify-center relative">
        <div className="max-w-6xl mx-auto px-5 py-24">
          <p className="kicker mb-6">SOR7ED — pronounced sorted</p>
          <h1 className="text-6xl md:text-8xl leading-[0.9] max-w-5xl">
            Your brain is not broken. <br />
            <span style={{ color: '#ffc107' }}>Your tools are.</span>
          </h1>
          <p className="text-lg md:text-xl mt-8 max-w-2xl">
            SOR7ED delivers practical templates and micro-tools for ADHD, autism, dyslexia, and
            related needs — straight to your WhatsApp. No app. No fluff. No inspiration.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/signup" className="btn-yellow">
              Join free
            </Link>
            <Link href="/tools" className="btn-outline">
              Browse tools
            </Link>
          </div>
          <p className="text-sm mt-6 opacity-80">
            Nothing is sent on WhatsApp until you sign up and message us first.
          </p>
        </div>
      </section>

      <section className="h-dvh snap-start border-b-2 border-white flex flex-col justify-center relative">
        <div className="max-w-6xl mx-auto px-5 py-20">
          <p className="kicker">How it works</p>
          <h2 className="text-5xl md:text-6xl mb-10">Three steps. That is it.</h2>
          <div className="grid gap-6 md:grid-cols-3">
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
              <div key={step.n} className="dark-card">
                <p className="display text-5xl text-[#ffc107]">{step.n}</p>
                <p className="display text-2xl mt-2">{step.t}</p>
                <p className="text-sm mt-2">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="h-dvh snap-start border-b-2 border-white flex flex-col justify-center relative">
        <div className="max-w-6xl mx-auto px-5 py-20">
          <p className="kicker">The 7 Branches</p>
          <h2 className="text-5xl md:text-6xl mb-3">Built around real life.</h2>
          <p className="text-base max-w-2xl mb-10">
            Every tool and article on SOR7ED maps to one of seven life areas — so when you are
            stuck, you can find the right help fast.
          </p>
          <BranchGrid />
        </div>
      </section>

      {featuredTool && (
        <section className="h-dvh snap-start border-b-2 border-white flex flex-col justify-center relative">
          <div className="max-w-6xl mx-auto px-5 py-20 grid gap-10 md:grid-cols-2 items-start">
            <div>
              <p className="kicker">Featured tool</p>
              <h2 className="text-5xl md:text-6xl mb-4">{featuredTool.name}</h2>
              <p className="text-base mb-3">{featuredTool.tagline}</p>
              <p className="text-sm opacity-80 mb-6">{featuredTool.description}</p>
              <div className="flex flex-wrap gap-3">
                <Link href={`/tools/${featuredTool.slug}`} className="btn-yellow">
                  Try interactive preview
                </Link>
                <Link href="/tools" className="btn-outline">
                  All tools
                </Link>
              </div>
            </div>
            <div className="border-2 border-[#ffc107] p-6">
              <p className="kicker">Teaser + unlock flow</p>
              <p className="mono text-sm mt-3 opacity-80">
                {`>`} You: {featuredTool.keyword}
              </p>
              <p className="mono text-sm mt-2">
                {`>`} SOR7ED: We can already see the pattern. Sign up to unlock the full plan…
              </p>
              <p className="text-sm mt-6">
                Start the tool on-page, answer the questions, then create your account to unlock the
                full result.
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="h-dvh snap-start border-b-2 border-white flex flex-col justify-center relative">
        <div className="max-w-6xl mx-auto px-5 py-20">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-8">
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
              <Link key={article.slug} href={`/blog/${article.slug}`} className="dark-card block">
                <p className="kicker">
                  {article.branch} · {article.readMinutes} min
                </p>
                <p className="display text-2xl mt-2">{article.title}</p>
                <p className="text-sm mt-3">{article.tldr}</p>
                <p className="text-sm mt-4 text-[#ffc107]">Read →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="h-dvh snap-start border-b-2 border-white flex flex-col justify-center relative">
        <div className="max-w-6xl mx-auto px-5 py-20 grid gap-10 md:grid-cols-2">
          <div>
            <p className="kicker">Important</p>
            <h2 className="text-5xl">Safety, consent, plain language.</h2>
            <p className="text-sm mt-4 max-w-md">
              SOR7ED is not therapy, counselling, or medical advice. It is not a crisis service.
              Data is collected only with explicit GDPR consent. Text STOP to leave at any time.
            </p>
          </div>
          <div className="border-2 border-white p-6">
            <ul className="space-y-3 text-sm">
              <li>✕ Not therapy or medical advice</li>
              <li>✕ Not a crisis line — call 999 or text SHOUT to 85258</li>
              <li>✓ GDPR/PECR compliant. No pre-ticked boxes</li>
              <li>✓ Text STOP any time to unsubscribe</li>
              <li>✓ End-to-end encrypted WhatsApp delivery</li>
            </ul>
          </div>
        </div>
      </section>

      <section
        className="h-dvh snap-start flex flex-col justify-center relative"
        style={{ background: '#ffc107', color: '#000000' }}
      >
        <div className="max-w-6xl mx-auto px-5 py-16 flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="display text-sm" style={{ letterSpacing: '0.18em' }}>
              READY TO GET SORTED
            </p>
            <p className="display text-5xl md:text-6xl mt-1">
              Practical tools. Straight to your WhatsApp.
            </p>
          </div>
          <Link
            href="/signup"
            className="border-2 border-black px-6 py-3 display text-2xl uppercase hover:bg-black hover:text-[#ffc107] transition"
          >
            Create free account
          </Link>
        </div>
      </section>
    </>
  );
}
