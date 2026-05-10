import Link from 'next/link';

export default function Header() {
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(255,255,255,0.9)',
      backdropFilter: 'blur(8px)',
      padding: '1.5rem 4%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div style={{ flex: 1 }}>
        <Link href="/" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#000', textDecoration: 'none' }}>
          SOR7ED®
        </Link>
      </div>

      <nav style={{ display: 'flex', alignItems: 'center', gap: '3rem', flex: 1, justifyContent: 'center' }}>
        <Link href="/" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: '0.85rem', color: '#888', textDecoration: 'none', fontWeight: 500 }}>
          Home
        </Link>
        <Link href="/blog" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: '0.85rem', color: '#888', textDecoration: 'none', fontWeight: 500 }}>
          Blog
        </Link>
        <Link href="/tools" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: '0.85rem', color: '#888', textDecoration: 'none', fontWeight: 500 }}>
          Tools
        </Link>
        <Link href="/signup" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: '0.85rem', color: '#888', textDecoration: 'none', fontWeight: 500 }}>
          Sign Up
        </Link>
      </nav>

      <div style={{ flex: 1 }}>
        {/* Empty right side to balance */}
      </div>
    </header>
  );
}
