import Link from 'next/link';
import SEOJsonLd from '@/components/SEOHead';
import { getTools } from '@/lib/notion-content';

export const metadata = {
  title: 'Tools',
  description: 'Interactive tools built for neurodivergent brains.',
};

export const revalidate = 60;

export default async function ToolsPage() {
  const tools = await getTools();
  const live = tools.filter(t => t.status === 'live');
  const soon = tools.filter(t => t.status === 'coming-soon');

  return (
    <>
      <SEOJsonLd title="Tools" description="Interactive tools built for neurodivergent brains." slug="tools" />

      <section className="border-b-2 border-white">
        <div className="page-wrap py-16 md:py-24">
          <h1 className="text-5xl md:text-8xl leading-none mb-4">The Toolkit.</h1>
          <p className="text-base max-w-xl opacity-70">
            Each tool starts with an interactive triage. You do the work on-page.
            Sign up to unlock your full result.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-16">
        {live.length > 0 && (
          <>
            <p className="kicker mb-6">Live tools</p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
              {live.map((tool) => (
                <Link key={tool.slug} href={`/tools/${tool.slug}`} className="dark-card block group">
                  <div className="flex items-center justify-between mb-3">
                    <p className="kicker text-xs">{tool.branch}</p>
                    {(tool.slug === 'executive-function-triage' || tool.slug === 'difficult-message') && (
                      <span className="mono text-xs border border-[#ffc107] text-[#ffc107] px-2 py-0.5">INTERACTIVE</span>
                    )}
                  </div>
                  <p className="display text-2xl md:text-3xl mb-2 group-hover:text-[#ffc107] transition-colors">{tool.name}</p>
                  <p className="text-sm opacity-70 mb-5 leading-relaxed">{tool.tagline}</p>
                  <p className="text-sm mono text-[#ffc107]">
                    {(tool.slug === 'executive-function-triage' || tool.slug === 'difficult-message') ? 'Start →' : 'Open tool →'}
                  </p>
                </Link>
              ))}
            </div>
          </>
        )}

        {soon.length > 0 && (
          <>
            <p className="kicker mb-6">Coming soon</p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {soon.map((tool) => (
                <div key={tool.slug} className="dark-card opacity-50">
                  <p className="kicker text-xs mb-3">{tool.branch}</p>
                  <p className="display text-2xl md:text-3xl mb-2">{tool.name}</p>
                  <p className="text-sm mb-4 leading-relaxed">{tool.tagline}</p>
                  <span className="mono text-xs border border-white/30 px-2 py-0.5">SOON</span>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
