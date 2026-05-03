import Link from 'next/link';
import SEOJsonLd from '@/components/SEOHead';
import { getTools } from '@/lib/notion-content';

export const metadata = {
  title: 'Tools',
  description: 'Free practical tools for neurodivergent minds, delivered via WhatsApp.',
};

export const revalidate = 60;

export default async function ToolsPage() {
  const tools = await getTools();

  return (
    <>
      {/* HERO */}
      <div style={{ position: 'relative', minHeight: '420px', display: 'flex', alignItems: 'center', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/hero-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center right', opacity: 0.35 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.4) 100%)' }} />
        <div className="page-wrap" style={{ position: 'relative', paddingTop: '80px', paddingBottom: '80px', maxWidth: '600px' }}>
          <h1 className="anton" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 0.92, color: '#fff', marginBottom: '16px' }}>THE TOOLS.</h1>
          <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300, fontSize: '1.05rem', color: 'rgba(255,255,255,0.65)', maxWidth: '480px', lineHeight: 1.6 }}>Interactive tools built for neurodivergent brains. No fluff. No sign-up wall. Just the thing that helps.</p>
        </div>
      </div>
      <SEOJsonLd
        title="Tools"
        description="Free practical tools for neurodivergent minds, delivered via WhatsApp."
        slug="tools"
      />
      <section className="border-b-2 border-white">
        <div className="max-w-6xl mx-auto px-5 py-12 md:py-20">
          <p className="kicker">Tools</p>
          <h1 className="text-4xl md:text-7xl">Templates that do the thinking with you.</h1>
          <p className="text-base mt-4 max-w-2xl">
            Every tool maps to one of the 7 Branches. Start with the on-page interaction, then sign
            up to unlock the full result. The first flagship flow is Executive Function Triage.
          </p>
        </div>
      </section>

      <section>
        <div className="max-w-6xl mx-auto px-5 py-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`} className="dark-card block">
                <div className="flex items-center justify-between mb-3 gap-3">
                  <p className="kicker">{tool.branch}</p>
                  <div className="flex flex-wrap gap-2 justify-end">
                    {tool.slug === 'executive-function-triage' && (
                      <span className="mono text-xs border border-[#ffc107] text-[#ffc107] px-2 py-0.5">
                        INTERACTIVE
                      </span>
                    )}
                    {tool.status === 'coming-soon' && (
                      <span className="mono text-xs border border-white px-2 py-0.5">SOON</span>
                    )}
                  </div>
                </div>
                <p className="display text-3xl mb-2">{tool.name}</p>
                <p className="text-sm mb-4">{tool.tagline}</p>
                <p className="text-sm">
                  Keyword: <span className="mono text-[#ffc107]">{tool.keyword}</span>
                </p>
                <p className="text-sm mt-4 text-[#ffc107]">
                  {tool.slug === 'executive-function-triage' ? 'Start interactive preview →' : 'Open tool →'}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
