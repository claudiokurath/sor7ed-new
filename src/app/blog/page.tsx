import Link from 'next/link';
import SEOJsonLd from '@/components/SEOHead';
import { getArticles } from '@/lib/notion-content';

export const metadata = {
  title: 'Blog — SOR7ED',
  description: 'Honest, practical reads on ADHD, autism, overwhelm, money, sex, substances, and everything in between.',
};

export const revalidate = 60;

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#050505', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <SEOJsonLd title="Blog" description="Plain words. Real situations." slug="blog" />

      {/* Noise overlay */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        opacity: 0.04, zIndex: 9999
      }} />

      {/* HEADER */}
      <section style={{ paddingTop: '10rem', paddingBottom: '5rem', paddingLeft: '8%', paddingRight: '8%', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '5rem', right: '5%', fontSize: 'clamp(8rem, 15vw, 20rem)', fontFamily: 'League Gothic, sans-serif', color: 'rgba(255,255,255,0.02)', lineHeight: 0.8, pointerEvents: 'none', userSelect: 'none' }}>
          BLOG
        </div>

        <div style={{ maxWidth: 800, position: 'relative', zIndex: 10 }}>
          <div style={{ width: '40px', height: '3px', backgroundColor: '#FFD700', marginBottom: '2rem' }} />
          <h1 style={{ fontFamily: 'League Gothic, Arial Narrow, sans-serif', fontSize: 'clamp(4rem, 10vw, 8rem)', textTransform: 'uppercase', lineHeight: 0.85, margin: 0, marginBottom: '1.5rem', letterSpacing: '0.02em' }}>
            PLAIN WORDS.<br />
            <span style={{ color: '#FFD700' }}>REAL SITUATIONS.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem', lineHeight: 1.6, maxWidth: 600 }}>
            Three reads a week. Every article ends with a WhatsApp keyword that sends you the protocol straight to your phone.
          </p>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section style={{ paddingTop: '5rem', paddingBottom: '8rem', paddingLeft: '8%', paddingRight: '8%' }}>
        <div style={{ position: 'relative', zIndex: 10 }}>
          {articles.length === 0 ? (
            <p style={{ opacity: 0.4, fontSize: '1.2rem', fontFamily: 'League Gothic, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>No articles yet. Check back soon.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2px', background: 'rgba(255,255,255,0.1)' }}>
              {articles.map((article: any) => (
                <Link
                  key={article.slug}
                  href={'/blog/' + article.slug}
                  style={{ background: '#0a0a0a', display: 'block', overflow: 'hidden', textDecoration: 'none', color: '#fff', transition: 'transform 0.2s', position: 'relative' }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', backgroundColor: '#FFD700', zIndex: 10, opacity: 0.5 }} />

                  {/* Cover image */}
                  {article.coverImage ? (
                    <img
                      src={article.coverImage} loading="lazy"
                      alt={article.title}
                      style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block', opacity: 0.8 }}
                    />
                  ) : (
                    <div style={{ width: '100%', aspectRatio: '16/9', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: 'League Gothic, sans-serif', fontSize: '4rem', color: 'rgba(255,215,0,0.1)', textTransform: 'uppercase' }}>
                        {article.branch?.split(' ')[0] || 'SOR7ED'}
                      </span>
                    </div>
                  )}

                  <div style={{ padding: '2rem' }}>
                    {/* Meta */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                      <span style={{ fontFamily: 'League Gothic, sans-serif', fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FFD700', border: '1px solid #FFD700', padding: '0.2rem 0.8rem' }}>
                        {article.branch}
                      </span>
                      <span style={{ fontSize: '0.8rem', opacity: 0.4, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>{article.readMinutes} min read</span>
                    </div>

                    {/* Title */}
                    <h2 style={{ fontFamily: 'League Gothic, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: '1rem', letterSpacing: '0.02em' }}>
                      {article.title}
                    </h2>

                    {/* Excerpt */}
                    <p style={{ fontSize: '1rem', opacity: 0.6, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {article.tldr}
                    </p>

                    {/* CTA */}
                    <div style={{ fontFamily: 'League Gothic, sans-serif', fontSize: '1.2rem', letterSpacing: '0.08em', color: '#FFD700', textTransform: 'uppercase', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      READ POST <span>→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

