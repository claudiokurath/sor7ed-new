'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const taglines = [
  { word: 'Overwhelmed', color: '#6366F1' },
  { word: 'Scattered',   color: '#EF4444' },
  { word: 'Exhausted',   color: '#06B6D4' },
  { word: 'Stuck',       color: '#10B981' },
  { word: 'Disconnected',color: '#F59E0B' },
  { word: 'Lost',        color: '#FB7185' },
  { word: 'Held back',   color: '#A855F7' },
];

const branches = [
  { name: 'Mind',       color: '#6366F1', desc: 'Focus, burnout, executive function, emotional regulation', keyword: 'TRIAGE',  slug: 'mind',       col: 3, row: 1 },
  { name: 'Body',       color: '#EF4444', desc: 'Sleep, sensory load, medication, energy, fatigue',         keyword: 'SLEEP',   slug: 'body',       col: 2, row: 1 },
  { name: 'Tech',       color: '#06B6D4', desc: 'Productivity, time blindness, digital systems, clutter',   keyword: 'PLAN',    slug: 'tech',       col: 4, row: 1 },
  { name: 'Wealth',     color: '#10B981', desc: 'Money, debt, budgeting, benefits, financial admin',        keyword: 'MONEY',   slug: 'wealth',     col: 3, row: 1 },
  { name: 'Connection', color: '#F59E0B', desc: 'Relationships, communication, loneliness, intimacy',       keyword: 'CONNECT', slug: 'connection', col: 4, row: 1 },
  { name: 'Identity',   color: '#FB7185', desc: 'Masking, late diagnosis, authenticity, self-narrative',    keyword: 'MASK',    slug: 'identity',   col: 4, row: 1 },
  { name: 'Growth',     color: '#A855F7', desc: 'Career, skills, self-sabotage, levelling up',              keyword: 'PATTERN', slug: 'growth',     col: 4, row: 1 },
];

export default function HomePage() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setTaglineIndex(i => (i + 1) % taglines.length); setVisible(true); }, 300);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const current = taglines[taglineIndex];

  return (
    <div style={{ height: '100vh', overflowY: 'scroll', scrollSnapType: 'y mandatory', scrollBehavior: 'smooth', background: '#08080A', overflowX: 'hidden' }}>

      {/* HERO */}
      <section style={{ height: '100vh', scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8rem 6% 4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/hero-robot2.png)', backgroundSize: 'cover', backgroundPosition: 'center center' }} />

        <div style={{ maxWidth: 860, position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '1.5rem' }}>
            A system built for minds like yours
          </p>
          <h1 style={{ fontFamily: 'League Gothic, Arial Narrow, sans-serif', fontSize: 'clamp(3.5rem,8vw,7rem)', textTransform: 'uppercase', lineHeight: 0.92, color: '#fff', marginBottom: '0.4rem' }}>
            If you're feeling
          </h1>
          <div style={{ height: 'clamp(4rem,9vw,8rem)', overflow: 'hidden', marginBottom: '2rem' }}>
            <span style={{
              fontFamily: 'League Gothic, Arial Narrow, sans-serif',
              fontSize: 'clamp(3.5rem,8vw,7rem)',
              textTransform: 'uppercase',
              lineHeight: 0.92,
              color: current.color,
              display: 'block',
              transition: 'opacity 0.3s, transform 0.3s',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
            }}>
              {current.word}
            </span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.1rem', maxWidth: 480, lineHeight: 1.7, marginBottom: '2.5rem' }}>
            SOR7ED gives neurodivergent adults a structured operating system for life — broken into 7 branches. Text a keyword. Get a protocol. No app needed.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="#branches" style={{ display: 'inline-block', background: '#ffffff', color: '#000', fontFamily: 'League Gothic, sans-serif', fontSize: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.9rem 2rem', textDecoration: 'none' }}>
              Explore the branches
            </Link>
            <Link href="/signup" style={{ display: 'inline-block', background: 'transparent', color: '#ffffff', fontFamily: 'League Gothic, sans-serif', fontSize: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.9rem 2rem', border: '1px solid rgba(255,255,255,0.3)', textDecoration: 'none' }}>
              Sign up free
            </Link>
          </div>
        </div>
      </section>

      {/* BRANCHES (COMBINED INTRO + CAROUSEL) */}
      <section id="branches" style={{ height: '100vh', scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '4rem' }}>
        <div style={{ padding: '0 6%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.05)' }} />
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>7 Branches of Life</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.05)' }} />
          </div>
          <h2 style={{ fontFamily: 'League Gothic, Arial Narrow, sans-serif', fontSize: 'clamp(2rem,5vw,4rem)', textTransform: 'uppercase', lineHeight: 0.92, color: '#fff', marginBottom: '0.75rem' }}>
            Every part of your life,<br />SOR7ED.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '1rem', maxWidth: 480, lineHeight: 1.7, marginBottom: '2rem' }}>
            Each branch has practical protocols — structured actions designed for neurodivergent minds.
          </p>
        </div>

        {/* MOSAIC GRID */}
        <div style={{ display: 'grid', width: '100%', gridTemplateColumns: 'repeat(12, 1fr)', gridAutoRows: '1fr', gap: '1px', flex: 1 }}>
          {branches.map((branch, i) => (
            <Link key={branch.slug} href={`/${branch.slug}`} style={{
              gridColumn: `span ${branch.col}`, gridRow: `span ${branch.row}`,
              background: '#111', border: '1px solid rgba(255,255,255,0.06)',
              padding: '2rem', textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', minHeight: 0,
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: branch.color }} />
              <span style={{ fontFamily: 'League Gothic, sans-serif', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: branch.color, display: 'block', marginBottom: '1.5rem' }}>
                0{i + 1}
              </span>
              <h3 style={{ fontFamily: 'League Gothic, Arial Narrow, sans-serif', fontSize: 'clamp(3.5rem,8vw,7rem)', textTransform: 'uppercase', lineHeight: 0.88, color: '#fff', marginBottom: '0.5rem' }}>
                {branch.name}
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.55, marginBottom: '1rem' }}>
                {branch.desc}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.7rem', color: branch.color, letterSpacing: '0.1em' }}>{branch.keyword}</span>
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.85rem' }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section style={{ height: '100vh', scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '5rem 6%', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 800 }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: '1.5rem' }}>The mission</p>
          <h2 style={{ fontFamily: 'League Gothic, Arial Narrow, sans-serif', fontSize: 'clamp(2.5rem,6vw,5rem)', textTransform: 'uppercase', lineHeight: 0.92, color: '#fff', marginBottom: '2rem' }}>
            The world wasn't built for your brain.<br />
            <span style={{ color: '#ffffff' }}>We build systems that are.</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.1rem', maxWidth: 560, lineHeight: 1.7, marginBottom: '2.5rem' }}>
            ADHD, neurodivergence, and a busy mind aren't flaws. They're operating systems that need the right software. SOR7ED is that software — delivered to your WhatsApp.
          </p>
          <Link href="/signup" style={{ display: 'inline-block', background: '#ffffff', color: '#000', fontFamily: 'League Gothic, sans-serif', fontSize: '1.1rem', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '1rem 2.5rem', textDecoration: 'none' }}>
            Create free account →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ scrollSnapAlign: 'end', padding: '4rem 6%', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontFamily: 'League Gothic, sans-serif', fontSize: '1.5rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)' }}>SOR7ED</span>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {[['Blog', '/blog'], ['Tools', '/tools'], ['Sign up', '/signup']].map(([label, href]) => (
            <Link key={href} href={href} style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}>{label}</Link>
          ))}
        </div>
        <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: '0.7rem' }}>SOR7ED LIMITED · Company No: 16398701</span>
      </footer>

    </div>
  );
}