import Link from 'next/link';
import { notFound } from 'next/navigation';
import WhatsappCTA from '@/components/WhatsappCTA';
import SEOJsonLd from '@/components/SEOHead';
import { ARTICLES } from '@/data/articles';
import { ArticleBlock } from '@/data/articles';
import { getArticleBySlug } from '@/lib/notion-content';

export const revalidate = 300;

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: 'Article not found' };
  return { title: article.title + ' — SOR7ED', description: article.tldr };
}

function renderBlock(block: ArticleBlock, index: number) {
  const key = `${block.type}-${index}`;
  const bodyStyle = { marginBottom: '1.5rem', lineHeight: 1.85, color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem' } as React.CSSProperties;

  switch (block.type) {
    case 'heading_2':
      return <h2 key={key} style={{ fontFamily: 'League Gothic, Arial Narrow, sans-serif', fontSize: 'clamp(1.8rem,3vw,2.5rem)', textTransform: 'uppercase', lineHeight: 0.92, color: '#fff', margin: '3rem 0 1rem' }}>{block.text}</h2>;
    case 'heading_3':
      return <h3 key={key} style={{ fontFamily: 'League Gothic, Arial Narrow, sans-serif', fontSize: 'clamp(1.4rem,2.5vw,2rem)', textTransform: 'uppercase', lineHeight: 0.92, color: '#fff', margin: '2rem 0 0.75rem' }}>{block.text}</h3>;
    case 'bulleted_list_item':
      return <p key={key} style={{ ...bodyStyle, paddingLeft: '1.5rem' }}>— {block.text}</p>;
    case 'numbered_list_item':
      return <p key={key} style={{ ...bodyStyle, paddingLeft: '1.5rem' }}>{index + 1}. {block.text}</p>;
    case 'quote':
      return <blockquote key={key} style={{ ...bodyStyle, borderLeft: '3px solid rgba(255,255,255,0.2)', paddingLeft: '1.5rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.45)' }}>{block.text}</blockquote>;
    default:
      if (!block.text) return null;
      return <p key={key} style={bodyStyle}>{block.text}</p>;
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();
  const body = article.body || [];

  return (
    <div style={{ minHeight: '100vh', background: '#08080A' }}>
      <SEOJsonLd title={article.title} description={article.tldr} slug={`blog/${article.slug}`} type="article" publishedAt={article.publishedAt} />

      {article.coverImage && (
        <div style={{ width: '100%', height: '55vh', position: 'relative', overflow: 'hidden' }}>
          <img src={article.coverImage} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, #08080A 100%)' }} />
        </div>
      )}

      <div style={{ maxWidth: 740, margin: '0 auto', padding: article.coverImage ? '0 2rem 2rem' : '8rem 2rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <Link href="/blog" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>← Blog</Link>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '0.2rem 0.6rem' }}>{article.branch}</span>
          <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>{article.readMinutes} min read</span>
        </div>

        <h1 style={{ fontFamily: 'League Gothic, Arial Narrow, sans-serif', fontSize: 'clamp(2.5rem,6vw,5rem)', textTransform: 'uppercase', lineHeight: 0.92, color: '#fff', marginBottom: '2rem' }}>
          {article.title}
        </h1>

        {article.tldr && (
          <div style={{ background: 'rgba(255,255,255,0.04)', borderLeft: '3px solid #fff', padding: '1.25rem 1.5rem', marginBottom: '3rem' }}>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.5rem' }}>TL;DR</p>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>{article.tldr}</p>
          </div>
        )}
      </div>

      <article style={{ maxWidth: 740, margin: '0 auto', padding: '0 2rem 4rem' }}>
        {body.length > 0 ? body.map((block, i) => renderBlock(block, i)) : (
          <p style={{ color: 'rgba(255,255,255,0.3)' }}>This article is being prepared. Check back soon.</p>
        )}
        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <WhatsappCTA keyword={article.keyword} />
        </div>
        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)', marginTop: '2rem', lineHeight: 1.6 }}>
          Not medical or therapeutic advice. For emergencies call 999 or text SHOUT to 85258.
        </p>
      </article>
    </div>
  );
}
