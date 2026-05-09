'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const taglines = [
  { word: 'Overwhelmed', color: '#ffc107' },
  { word: 'Scattered', color: '#a78bfa' },
  { word: 'Exhausted', color: '#fb7185' },
  { word: 'Stuck', color: '#34d399' },
  { word: 'Wired differently', color: '#38bdf8' },
];

const branches = [
  { name: 'Mind', color: '#6366f1', desc: 'Focus, burnout, executive function, emotional regulation', keyword: 'TRIAGE', slug: 'mind' },
  { name: 'Body', color: '#10b981', desc: 'Sleep, sensory load, medication, energy, fatigue', keyword: 'SLEEP', slug: 'body' },
  { name: 'Tech', color: '#f59e0b', desc: 'Productivity, time blindness, digital systems, clutter', keyword: 'PLAN', slug: 'tech' },
  { name: 'Wealth', color: '#ef4444', desc: 'Money, debt, budgeting, benefits, financial admin', keyword: 'MONEY', slug: 'wealth' },
  { name: 'Connection', color: '#ec4899', desc: 'Relationships, communication, loneliness, intimacy', keyword: 'CONNECT', slug: 'connection' },
  { name: 'Identity', color: '#8b5cf6', desc: 'Masking, late diagnosis, authenticity, self-narrative', keyword: 'MASK', slug: 'identity' },
  { name: 'Growth', color: '#0ea5e9', desc: 'Career, skills, self-sabotage, levelling up', keyword: 'PATTERN', slug: 'growth' },
];

export default function HomePage() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setTaglineIndex(i => (i + 1) % taglines.length);
        setVisible(true);
      }, 300);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const current = taglines[taglineIndex];

  return (
    <div style={{ minHeight: '100vh', background: '#080808', overflowX: 'hidden' }}>

      {/* ── HERO ── */}
      <section style={{ minHeight: '92vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '6rem 6% 4rem' }}>

        {/* Top bar */}
        <div style={{ position: 'absolute', top: '5rem', left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 6%' }}>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
            WhatsApp protocols · No app
          </span>
          <Link href="/signup" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}>
            Get started →
          </Link>
        </div>

        {/* Headline */}
        <div style={{ maxWidth: 800 }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1.5rem' }}>
            A system built for minds like yours
          </p>

          <h1 style={{ fontFamily: 'League Gothic, Arial Narrow, sans-serif', fontSize: 'clamp(3.5rem, 8vw, 7rem)', textTransform: 'uppercase', lineHeight: 0.92, color: '#ffffff', marginBottom: '0.5rem' }}>
            If you're feeling
          </h1>

          <div style={{ height: 'clamp(4rem, 9vw, 8rem)', overflow: 'hidden', marginBottom: '2rem' }}>
            <span style={{
              fontFamily: 'League Gothic, Arial Narrow, sans-serif',
              fontSize: 'clamp(3.5rem, 8vw, 7rem)',
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
            <Link href="#branches" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '0.9rem 2rem', background: '#ffc107', color: '#000',
              fontFamily: 'League Gothic, sans-serif', fontSize: '1rem',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              textDecoration: 'none', transition: 'transform 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
              Explore the branches
            </Link>
            <Link href="/signup" style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '0.9rem 2rem', background: 'transparent',
              color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.15)',
              fontFamily: 'League Gothic, sans-serif', fontSize: '1rem',
              letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none',
              transition: 'border-color 0.2s, color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}>
              Sign up free
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.15))' }} />
        </div>
      </section>

      {/* ── BRANCHES INTRO ── */}
      <section style={{ padding: '2rem 6% 1.5rem' }} id="branches">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.05)' }} />
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>7 Branches of Life</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.05)' }} />
        </div>
        <h2 style={{ fontFamily: 'League Gothic, Arial Narrow, sans-serif', fontSize: 'clamp(2rem, 5vw, 4rem)', textTransform: 'uppercase', lineHeight: 0.92, color: '#fff', marginBottom: '0.75rem' }}>
          Every part of your life,<br />sorted.
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '1rem', maxWidth: 480, lineHeight: 1.7 }}>
          Each branch contains practical protocols — structured micro-actions designed for busy, distracted, and neurodivergent minds.
        </p>
      </section>

      {/* ── BRANCH CARDS — horizontal scroll ── */}
      <section style={{ paddingBottom: '5rem' }}>
        <div style={{
          display: 'flex', gap: '1rem', padding: '1.5rem 6% 1.5rem',
          overflowX: 'auto', scrollSnapType: 'x mandatory',
          msOverflowStyle: 'none', scrollbarWidth: 'none',
        }}>
          {branches.map((branch, i) => (
            <Link key={branch.slug} href={`/${branch.slug}`}
              style={{
                flexShrink: 0, width: 260, scrollSnapAlign: 'start',
                background: '#111', border: '1px solid rgba(255,255,255,0.06)',
                padding: '2rem', textDecoration: 'none', display: 'block',
                transition: 'border-color 0.2s, transform 0.2s',
                position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = branch.color; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {/* Accent top line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: branch.color }} />

              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontFamily: 'League Gothic, sans-serif', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: branch.color }}>
                  0{i + 1}
                </span>
              </div>

              <h3 style={{ fontFamily: 'League Gothic, Arial Narrow, sans-serif', fontSize: '2.5rem', textTransform: 'uppercase', lineHeight: 0.92, color: '#fff', marginBottom: '0.75rem' }}>
                {branch.name}
              </h3>

              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                {branch.desc}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.7rem', color: branch.color, letterSpacing: '0.1em' }}>
                  {branch.keyword}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.85rem' }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── MISSION ── */}
      <section style={{ padding: '5rem 6%', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 800 }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: '1.5rem' }}>
            The mission
          </p>
          <h2 style={{ fontFamily: 'League Gothic, Arial Narrow, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', textTransform: 'uppercase', lineHeight: 0.92, color: '#fff', marginBottom: '2rem' }}>
            The world wasn't built for your brain.<br />
            <span style={{ color: '#ffc107' }}>We build systems that are.</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.1rem', maxWidth: 560, lineHeight: 1.7, marginBottom: '2.5rem' }}>
            ADHD, neurodivergence, and a busy mind aren't flaws to be fixed. They're operating systems that need the right software. SOR7ED is that software — delivered where you already are, on WhatsApp.
          </p>
          <Link href="/signup" style={{
            display: 'inline-block', background: '#ffc107', color: '#000',
            fontFamily: 'League Gothic, sans-serif', fontSize: '1.1rem',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '1rem 2.5rem', textDecoration: 'none',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = '#e6ac00')}
            onMouseLeave={e => (e.currentTarget.style.background = '#ffc107')}>
            Create free account →
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: '2rem 6%', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontFamily: 'League Gothic, sans-serif', fontSize: '1.5rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>SOR7ED</span>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link href="/blog" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}>Blog</Link>
          <Link href="/tools" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}>Tools</Link>
          <Link href="/signup" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}>Sign up</Link>
        </div>
        <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: '0.7rem' }}>SOR7ED LIMITED · Company No: 16398701</span>
      </footer>

    </div>
  );
}
