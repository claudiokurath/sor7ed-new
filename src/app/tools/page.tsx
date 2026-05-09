import Link from 'next/link';
import SEOJsonLd from '@/components/SEOHead';
import { getTools } from '@/lib/notion-content';

export const metadata = {
  title: 'Tools — SOR7ED',
  description: 'Interactive tools built for neurodivergent brains. No fluff. Just the fix.',
};

export const revalidate = 60;

export default async function ToolsPage() {
  const tools = await getTools();
  const live = tools.filter((t) => t.status === 'live');
  const soon = tools.filter((t) => t.status === 'coming-soon');

  return (
    <>
      <SEOJsonLd title="Tools" description="Interactive tools built for neurodivergent brains." slug="tools" />

      {/* HEADER */}
      <section style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingTop: '7rem', paddingBottom: '3rem' }}>
        <div className="page-wrap">
          <span className="accent-line" />
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 0.88, marginBottom: '1.25rem' }}>
            The toolkit.<br /><span style={{ color: '#ffffff' }}>Use it.</span>
          </h1>
          <p style={{ fontSize: '1rem', opacity: 0.55, maxWidth: '52ch', lineHeight: 1.7 }}>
            Interactive tools that work on the page. Sign up to unlock your full result and get it delivered to WhatsApp.
          </p>
        </div>
      </section>

      {/* LIVE TOOLS */}
      {live.length > 0 && (
        <section style={{ paddingTop: '3rem', paddingBottom: '2rem' }}>
          <div className="page-wrap">
            <span className="kicker" style={{ marginBottom: '1.5rem' }}>Live now</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.06)' }}>
              {live.map((tool) => (
                <Link
                  key={tool.slug}
                  href={'/tools/' + tool.slug}
                  style={{ background: '#0a0a0a', padding: '2rem', display: 'block', transition: 'background 0.2s', position: 'relative', overflow: 'hidden' }}
                >
                  {/* Top accent line on hover via CSS */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: '#ffffff' }} />

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <span className="branch-pill">{tool.branch}</span>
                    <span style={{ fontFamily: 'League Gothic, sans-serif', fontSize: '0.7rem', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
                      Interactive
                    </span>
                  </div>

                  <p style={{ fontFamily: 'League Gothic, sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', textTransform: 'uppercase', lineHeight: 0.95, marginBottom: '0.85rem', letterSpacing: '0.02em' }}>
                    {tool.name}
                  </p>

                  <p style={{ fontSize: '0.88rem', opacity: 0.5, lineHeight: 1.65, marginBottom: '1.5rem' }}>
                    {tool.tagline}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ display: 'block', width: '0.5rem', height: '0.5rem', borderRadius: '50%', background: '#ffffff' }} />
                    <span style={{ fontFamily: 'League Gothic, sans-serif', fontSize: '0.85rem', letterSpacing: '0.12em', color: '#ffffff', textTransform: 'uppercase' }}>
                      Start tool →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* COMING SOON */}
      {soon.length > 0 && (
        <section style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
          <div className="page-wrap">
            <span className="kicker" style={{ marginBottom: '1.5rem' }}>Coming soon</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.04)' }}>
              {soon.map((tool) => (
                <div key={tool.slug} style={{ background: '#0a0a0a', padding: '2rem', opacity: 0.45 }}>
                  <span className="branch-pill" style={{ marginBottom: '1.25rem' }}>{tool.branch}</span>
                  <p style={{ fontFamily: 'League Gothic, sans-serif', fontSize: '1.6rem', textTransform: 'uppercase', lineHeight: 0.95, marginBottom: '0.75rem' }}>
                    {tool.name}
                  </p>
                  <p style={{ fontSize: '0.88rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>{tool.tagline}</p>
                  <span style={{ fontFamily: 'League Gothic, sans-serif', fontSize: '0.7rem', letterSpacing: '0.16em', border: '1px solid rgba(255,255,255,0.2)', padding: '0.2rem 0.6rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
                    Soon
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
