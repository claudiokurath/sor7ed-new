import Link from 'next/link';
import SEOJsonLd from '@/components/SEOHead';
import { getArticles } from '@/lib/notion-content';

export const metadata = {
  title: 'Blog — SOR7ED',
  description: 'Honest, practical reads on ADHD, autism, overwhelm, money, sex, substances, and everything in between.',
};

export const revalidate = 60;

const BRANCHES = ['All', 'Keep Going', 'Feel Good', 'Plan Ahead', 'Spend Smart', 'Be Connected', 'Be Yourself', 'Level Up'];

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <>
      <SEOJsonLd title="Blog" description="Plain words. Real situations." slug="blog" />

      {/* HEADER */}
      <section style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingTop: '7rem', paddingBottom: '3rem' }}>
        <div className="page-wrap">
          <span className="accent-line" />
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 0.88, marginBottom: '1.25rem' }}>
            Plain words.<br /><span style={{ color: '#ffffff' }}>Real situations.</span>
          </h1>
          <p style={{ fontSize: '1rem', opacity: 0.55, maxWidth: '52ch', lineHeight: 1.7 }}>
            Three reads a week. Every article ends with a WhatsApp keyword that sends you the protocol straight to your phone.
          </p>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
        <div className="page-wrap">
          {articles.length === 0 ? (
            <p style={{ opacity: 0.4, fontSize: '1rem' }}>No articles yet. Check back soon.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.06)' }}>
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={'/blog/' + article.slug}
                  style={{ background: '#0a0a0a', display: 'block', overflow: 'hidden', transition: 'background 0.2s' }}
                >
                  {/* Cover image */}
                  {article.coverImage ? (
                    <img
                      src={article.coverImage} loading="lazy"
                      alt={article.title}
                      style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <div style={{ width: '100%', aspectRatio: '16/9', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: 'League Gothic, sans-serif', fontSize: '3rem', color: 'rgba(255,193,7,0.15)', textTransform: 'uppercase' }}>
                        {article.branch?.split(' ')[0] || 'SOR7ED'}
                      </span>
                    </div>
                  )}

                  <div style={{ padding: '1.5rem' }}>
                    {/* Meta */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                      <span className="branch-pill">{article.branch}</span>
                      <span style={{ fontSize: '0.75rem', opacity: 0.35, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{article.readMinutes} min</span>
                    </div>

                    {/* Title */}
                    <p style={{ fontFamily: 'League Gothic, sans-serif', fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', textTransform: 'uppercase', lineHeight: 0.95, marginBottom: '0.75rem', letterSpacing: '0.02em' }}>
                      {article.title}
                    </p>

                    {/* Excerpt */}
                    <p style={{ fontSize: '0.85rem', opacity: 0.5, lineHeight: 1.65, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {article.tldr}
                    </p>

                    {/* CTA */}
                    <p style={{ fontFamily: 'League Gothic, sans-serif', fontSize: '0.8rem', letterSpacing: '0.12em', color: '#ffffff', textTransform: 'uppercase', marginTop: '1.25rem' }}>
                      Read →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
