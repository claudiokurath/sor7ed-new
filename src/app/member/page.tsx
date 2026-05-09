import Link from 'next/link';

export const metadata = { title: 'Member Area — SOR7ED' };

export default function MemberPage() {
  const cards = [
    { href: '/tools/executive-function-triage?unlocked=1', label: 'Start here', title: 'Executive Function Triage', desc: 'Your triage result is ready to unlock.' },
    { href: '/tools', label: 'Tools', title: 'The Toolkit', desc: 'All tools, all branches.' },
    { href: '/blog', label: 'Blog', title: 'Recent reads', desc: 'Evidence-informed, ADHD-friendly articles.' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#08080A', padding: '8rem 6% 4rem' }}>
      <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ffc107', marginBottom: '1rem' }}>Member area</p>
      <h1 style={{ fontFamily: 'League Gothic, Arial Narrow, sans-serif', fontSize: 'clamp(3rem,8vw,6rem)', textTransform: 'uppercase', lineHeight: 0.92, color: '#fff', marginBottom: '1rem' }}>You're in.</h1>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.1rem', maxWidth: 480, lineHeight: 1.7, marginBottom: '3rem' }}>
        Your account is active. Head to the tools or browse the blog.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.04)', maxWidth: 900 }}>
        {cards.map(card => (
          <Link key={card.href} href={card.href} style={{ background: '#08080A', padding: '2rem', display: 'block', textDecoration: 'none', position: 'relative', borderTop: '2px solid #ffc107' }}>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#ffc107', marginBottom: '1rem' }}>{card.label}</p>
            <p style={{ fontFamily: 'League Gothic, Arial Narrow, sans-serif', fontSize: '1.8rem', textTransform: 'uppercase', lineHeight: 0.92, color: '#fff', marginBottom: '0.75rem' }}>{card.title}</p>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, marginBottom: '1.5rem' }}>{card.desc}</p>
            <span style={{ fontSize: '0.75rem', fontFamily: 'ui-monospace, monospace', color: '#ffc107', letterSpacing: '0.1em' }}>Open →</span>
          </Link>
        ))}
        <div style={{ background: '#08080A', padding: '2rem', opacity: 0.3 }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1rem' }}>Coming soon</p>
          <p style={{ fontFamily: 'League Gothic, Arial Narrow, sans-serif', fontSize: '1.8rem', textTransform: 'uppercase', lineHeight: 0.92, color: '#fff', marginBottom: '0.75rem' }}>Saved results</p>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65 }}>Your tool outputs saved in one place.</p>
        </div>
      </div>
    </div>
  );
}