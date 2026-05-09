'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function BlogPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('/api/articles').then(r => r.json()).then(setArticles).catch(() => {});
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#08080A' }}>
      <section style={{ padding: '8rem 6% 4rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <p style={{ fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '1.5rem' }}>The Blog</p>
        <h1 style={{ fontFamily: 'League Gothic, Arial Narrow, sans-serif', fontSize: 'clamp(3rem,8vw,7rem)', textTransform: 'uppercase', lineHeight: 0.92, color: '#fff', marginBottom: '1rem' }}>
          Plain words.<br /><span style={{ color: '#ffc107' }}>Real situations.</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '1.1rem', maxWidth: 480, lineHeight: 1.7 }}>
          Every article ends with a WhatsApp keyword. Sign up and send it to receive the full protocol.
        </p>
      </section>
      <section style={{ padding: '4rem 6%' }}>
        {articles.length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.2)' }}>Loading articles...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1px', background: 'rgba(255,255,255,0.04)' }}>
            {articles.map((article) => (
              <Link key={article.slug} href={'/blog/' + article.slug} style={{ background: '#08080A', display: 'block', textDecoration: 'none' }}>
                {article.coverImage ? (
                  <img src={article.coverImage} alt={article.title} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <div style={{ width: '100%', aspectRatio: '16/9', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'League Gothic,sans-serif', fontSize: '2rem', color: 'rgba(255,193,7,0.15)', textTransform: 'uppercase' }}>{article.branch}</span>
                  </div>
                )}
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#ffc107', fontFamily: 'League Gothic,sans-serif' }}>{article.branch}</span>
                    <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)' }}>{article.readMinutes} min</span>
                  </div>
                  <p style={{ fontFamily: 'League Gothic,Arial Narrow,sans-serif', fontSize: '1.4rem', textTransform: 'uppercase', lineHeight: 0.95, color: '#fff', marginBottom: '0.75rem' }}>{article.title}</p>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{article.tldr}</p>
                  <p style={{ fontSize: '0.75rem', fontFamily: 'League Gothic,sans-serif', letterSpacing: '0.1em', color: '#ffc107', textTransform: 'uppercase', marginTop: '1rem' }}>Read →</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
