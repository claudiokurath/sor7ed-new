'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ToolsPage() {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    fetch('/api/tools').then(r => r.json()).then(setTools).catch(() => {});
  }, []);

  const live = tools.filter(t => t.status === 'live');
  const soon = tools.filter(t => t.status !== 'live');

  return (
    <div style={{ minHeight: '100vh', background: '#08080A' }}>
      <section style={{ padding: '8rem 6% 4rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <p style={{ fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '1.5rem' }}>The Tools</p>
        <h1 style={{ fontFamily: 'League Gothic, Arial Narrow, sans-serif', fontSize: 'clamp(3rem,8vw,7rem)', textTransform: 'uppercase', lineHeight: 0.92, color: '#fff', marginBottom: '1rem' }}>
          The arsenal.<br /><span style={{ color: '#ffc107' }}>Use it.</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '1.1rem', maxWidth: 480, lineHeight: 1.7 }}>
          Interactive tools built for neurodivergent brains. Sign up free to unlock your full result on WhatsApp.
        </p>
      </section>
      <section style={{ padding: '4rem 6% 2rem' }}>
        {tools.length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.2)' }}>Loading tools...</p>
        ) : (
          <>
            {live.length > 0 && (
              <>
                <p style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: '2rem' }}>Live now</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1px', background: 'rgba(255,255,255,0.04)', marginBottom: '4rem' }}>
                  {live.map(tool => (
                    <Link key={tool.slug} href={'/tools/' + tool.slug} style={{ background: '#08080A', padding: '2rem', display: 'block', textDecoration: 'none', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: '#ffc107' }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#ffc107', fontFamily: 'League Gothic,sans-serif' }}>{tool.branch}</span>
                        <span style={{ fontFamily: 'ui-monospace,monospace', fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}>{tool.keyword}</span>
                      </div>
                      <p style={{ fontFamily: 'League Gothic,Arial Narrow,sans-serif', fontSize: '1.8rem', textTransform: 'uppercase', lineHeight: 0.92, color: '#fff', marginBottom: '0.75rem' }}>{tool.name}</p>
                      <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, marginBottom: '1.5rem' }}>{tool.tagline}</p>
                      <span style={{ fontSize: '0.75rem', fontFamily: 'League Gothic,sans-serif', letterSpacing: '0.1em', color: '#ffc107', textTransform: 'uppercase' }}>Start tool →</span>
                    </Link>
                  ))}
                </div>
              </>
            )}
            {soon.length > 0 && (
              <>
                <p style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)', marginBottom: '2rem' }}>Coming soon</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1px', background: 'rgba(255,255,255,0.02)' }}>
                  {soon.map(tool => (
                    <div key={tool.slug} style={{ background: '#08080A', padding: '2rem', opacity: 0.4 }}>
                      <p style={{ fontFamily: 'League Gothic,Arial Narrow,sans-serif', fontSize: '1.8rem', textTransform: 'uppercase', lineHeight: 0.92, color: '#fff', marginBottom: '0.75rem' }}>{tool.name}</p>
                      <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65 }}>{tool.tagline}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </section>
    </div>
  );
}
