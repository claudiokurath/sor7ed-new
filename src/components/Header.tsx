'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const branches = [
  { name: 'Mind',       slug: 'mind',       color: '#6366F1' },
  { name: 'Body',       slug: 'body',       color: '#EF4444' },
  { name: 'Tech',       slug: 'tech',       color: '#06B6D4' },
  { name: 'Wealth',     slug: 'wealth',     color: '#10B981' },
  { name: 'Connection', slug: 'connection', color: '#F59E0B' },
  { name: 'Identity',   slug: 'identity',   color: '#FB7185' },
  { name: 'Growth',     slug: 'growth',     color: '#A855F7' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState('');

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'rgba(8,8,10,0.97)' : 'rgba(8,8,10,0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      transition: 'background 0.3s',
      padding: '0 3%',
      height: '3.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
    }}>
      {/* Logo */}
      <Link href="/" style={{
        fontFamily: 'League Gothic, sans-serif',
        fontSize: '1.2rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: '#fff',
        textDecoration: 'none',
        flexShrink: 0,
      }}>
        SOR7ED
      </Link>

      {/* Branch nav — all 7, small text, colour on hover */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        flex: 1,
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {branches.map(b => (
          <Link key={b.slug} href={'/' + b.slug}
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: hovered === b.slug ? b.color : 'rgba(255,255,255,0.45)',
              textDecoration: 'none',
              transition: 'color 0.2s',
              padding: '0.35rem 0.65rem',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={() => setHovered(b.slug)}
            onMouseLeave={() => setHovered('')}>
            {b.name}
          </Link>
        ))}
      </nav>

      {/* CTA */}
      <Link href="/signup" style={{
        background: '#ffffff',
        color: '#000',
        fontFamily: 'League Gothic, sans-serif',
        fontSize: '0.8rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        padding: '0.45rem 1rem',
        textDecoration: 'none',
        flexShrink: 0,
        whiteSpace: 'nowrap',
      }}>
        Join free
      </Link>
    </header>
  );
}
