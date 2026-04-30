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
        <div className="w-full px-10 md:px-20 relative z-10 flex justify-start">
          <div className="max-w-lg text-left">
            <p className="kicker mb-6">SOR7ED — pronounced sorted</p>
            <h1 className="text-6xl md:text-8xl leading-[0.9]">
              Your brain is not broken. <br />
              <span style={{ color: '#ffc107' }}>Your tools are.</span>
            </h1>
            <p className="text-lg md:text-xl mt-8">
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
          backgroundImage: 'url("/bg-1.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="w-full px-10 md:px-20 relative z-10 flex justify-start">
          <div className="max-w-lg text-left">
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
                    <p className="text-base opacity-80 mt-1">{step.d}</p>
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
          backgroundImage: 'url("/bg-2.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="w-full px-10 md:px-20 relative z-10 flex justify-start">
          <div className="max-w-3xl text-left flex flex-col items-start">
            <p className="kicker">The 7 Branches</p>
            <h2 className="text-4xl md:text-5xl mb-6">The SOR7ED Life: A Framework for Neurodivergent Flourishing</h2>
            
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div className="space-y-4 text-sm md:text-base leading-relaxed opacity-90">
                <p>Living with a brain that processes the world differently often feels like trying to navigate a high-speed highway with a manual gearbox—it’s powerful, but it requires a specific kind of internal scaffolding to keep from stalling. The SOR7ED pillars represent a holistic approach to building that scaffolding, moving away from "fixing" symptoms and toward mastering your unique mechanics.</p>
                <p>At the foundation lies the biological baseline: <strong>FEEL GOOD</strong>. Without regulated sleep, stable energy, and basic health routines, the "hardware" of the brain remains in a state of constant depletion. Once that baseline is stabilized, we can address the momentum engine—<strong>KEEP GOING</strong>. This pillar focuses on the mechanics of executive function, providing the tools to break through the paralysis of starting and the fog of staying on task.</p>
                <p>As we move from internal regulation to external management, <strong>PLAN AHEAD</strong> and <strong>SPEND SMART</strong> act as essential guardrails. By utilizing proactive planning and time management, we reduce the exhausting "firefighting" mode of reactive living. Similarly, financial systems help mitigate the "ADHD tax," turning money from a source of chronic stress into a managed resource.</p>
                <p>Growth, however, isn't just about management; it’s about connection and evolution. <strong>BE CONNECTED</strong> ensures that we aren't navigating this path alone, focusing on relationships and communication styles that honor our needs. This leads into the vital work of <strong>BE YOURSELF</strong>—the practice of radical authenticity and unmasking. It is about setting boundaries and practicing self-advocacy so that our lives actually fit our brains, rather than forcing our brains to fit a world that isn't built for them.</p>
                <p>Finally, we <strong>LEVEL UP</strong>. With systems in place and identity secured, we can focus on the long game: learning new skills and evolving our careers. Through these seven pillars, we don't just survive the chaos; we build a sustainable, high-functioning life that belongs entirely to us.</p>
              </div>
              <div>
                <BranchGrid />
              </div>
            </div>
          </div>
        </div>
      </section>

      {featuredTool && (
        <section
          className="h-dvh snap-start border-b-2 border-white flex flex-col justify-center relative overflow-hidden"
          style={{
            backgroundImage: 'url("/bg-3.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="w-full px-10 md:px-20 relative z-10 flex justify-start">
            <div className="max-w-lg text-left">
              <p className="kicker">Featured tool</p>
              <h2 className="text-5xl md:text-6xl mb-4">{featuredTool.name}</h2>
              <p className="text-lg mb-6 opacity-90">{featuredTool.tagline}</p>
              <div className="flex flex-wrap gap-3 mb-8 justify-start">
                <Link href={`/tools/${featuredTool.slug}`} className="btn-yellow">
                  Try interactive preview
                </Link>
                <Link href="/tools" className="btn-outline">
                  All tools
                </Link>
              </div>
              <div className="border-t border-white/20 pt-6">
                <p className="mono text-sm opacity-80">
                  {`>`} You: {featuredTool.keyword}
                </p>
                <p className="mono text-sm mt-2">
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
          backgroundImage: 'url("/bg-4.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="w-full px-10 md:px-20 relative z-10 flex justify-end">
          <div className="max-w-3xl text-left">
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
                  <p className="text-sm mt-3 opacity-80 line-clamp-2">{article.tldr}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="h-dvh snap-start border-b-2 border-white flex flex-col justify-center relative overflow-hidden"
        style={{
          backgroundImage: 'url("/bg-5.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="w-full px-10 md:px-20 relative z-10 flex justify-start">
          <div className="max-w-lg text-left">
            <p className="kicker">Important</p>
            <h2 className="text-5xl md:text-6xl mb-6">Safety & Consent.</h2>
            <div className="mt-6 space-y-6 text-base">
              <p className="opacity-90 leading-relaxed">
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
        <div className="w-full px-10 md:px-20 relative z-10 flex justify-start">
          <div className="max-w-lg text-left">
            <p className="display text-sm" style={{ letterSpacing: '0.18em' }}>
              READY TO GET SORTED
            </p>
            <p className="display text-5xl md:text-7xl mt-1 leading-tight">
              Practical tools. <br />
              Straight to your WhatsApp.
            </p>
            <div className="mt-10">
              <Link
                href="/signup"
                className="inline-block border-4 border-black px-10 py-5 display text-3xl uppercase bg-[#ffc107] text-black hover:bg-black hover:text-[#ffc107] transition-all"
              >
                Create free account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
