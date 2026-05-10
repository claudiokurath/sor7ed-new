'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ 
      backgroundColor: '#ffffff', 
      color: '#000', 
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      minHeight: '100vh',
    }}>
      
      {/* SECTION 1: HERO */}
      <section style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '8rem 5% 4rem',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          margin: 0,
          marginBottom: '0.5rem',
          color: '#000'
        }}>
          Which branch will you choose?
        </h1>

        <p style={{
          fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
          fontWeight: 600,
          color: '#888',
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          maxWidth: 800,
          margin: 0,
          marginBottom: '2rem'
        }}>
          Explore all 7 branches for personalized neurodivergent support.
        </p>

        <Link href="/signup" style={{
          backgroundColor: '#000',
          color: '#fff',
          fontSize: '0.85rem',
          fontWeight: 600,
          padding: '0.6rem 1.5rem',
          borderRadius: '9999px',
          textDecoration: 'none',
          marginBottom: '6rem'
        }}>
          Sign Up
        </Link>

        {/* The 7 Branches */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2.5rem',
          marginBottom: '6rem'
        }}>
          {['Connection', 'Mind', 'Identity', 'Tech', 'Body', 'Wealth', 'Growth'].map((branch) => (
            <Link key={branch} href={`/${branch.toLowerCase()}`} style={{
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#000',
              textDecoration: 'none',
              letterSpacing: '-0.02em'
            }}>
              {branch}
            </Link>
          ))}
        </div>

        {/* 3 Steps */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          maxWidth: 1000,
          width: '100%',
          textAlign: 'left'
        }}>
          {/* Step 1 */}
          <div>
            <div style={{ backgroundColor: '#F5F5F5', borderRadius: '16px', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <div style={{ width: '30%', height: '30%', backgroundColor: '#fff' }} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0, marginBottom: '0.5rem' }}>Read blog.</h3>
            <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>Step 1: Discover actionable ideas tailored for neurodivergent support.</p>
          </div>

          {/* Step 2 */}
          <div>
            <div style={{ backgroundColor: '#F5F5F5', borderRadius: '16px', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <div style={{ width: '30%', height: '30%', backgroundColor: '#fff', borderRadius: '50%' }} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0, marginBottom: '0.5rem' }}>Send text.</h3>
            <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>Step 2: Message us on WhatsApp to request your custom protocol.</p>
          </div>

          {/* Step 3 */}
          <div>
            <div style={{ backgroundColor: '#F5F5F5', borderRadius: '16px', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <div style={{ width: 0, height: 0, borderLeft: '3vw solid transparent', borderRight: '3vw solid transparent', borderBottom: '5vw solid #fff' }} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0, marginBottom: '0.5rem' }}>Receive protocol.</h3>
            <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>Step 3: Get a personalized protocol delivered instantly.</p>
          </div>
        </div>
      </section>

      {/* SECTION 2: CTA */}
      <section style={{
        padding: '6rem 5%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        borderTop: '1px solid #f0f0f0',
        borderBottom: '1px solid #f0f0f0',
        margin: '0 5%'
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          margin: 0,
          marginBottom: '0.5rem',
          color: '#000'
        }}>
          Start Your Protocol
        </h2>
        <p style={{
          fontSize: '1rem',
          color: '#888',
          margin: 0,
          marginBottom: '1.5rem'
        }}>
          Sign up to receive practical protocols via WhatsApp.
        </p>
        <Link href="/signup" style={{
          backgroundColor: '#000',
          color: '#fff',
          fontSize: '0.85rem',
          fontWeight: 600,
          padding: '0.6rem 1.5rem',
          borderRadius: '9999px',
          textDecoration: 'none',
        }}>
          Sign Up
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: '4rem 5%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>
        {/* Logo Shapes */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#e0e0e0' }} />
          <div style={{ width: '12px', height: '12px', backgroundColor: '#e0e0e0', borderRadius: '50%' }} />
          <div style={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderBottom: '12px solid #e0e0e0' }} />
        </div>

        <div style={{ display: 'flex', gap: '4rem' }}>
          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 800, margin: 0, marginBottom: '0.5rem', color: '#000' }}>Branches</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['Mind', 'Body', 'Tech'].map(link => (
                <Link key={link} href={`/${link.toLowerCase()}`} style={{ fontSize: '0.75rem', color: '#888', textDecoration: 'none' }}>{link}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 800, margin: 0, marginBottom: '0.5rem', color: '#000' }}>Resources</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['Blog', 'Tools', 'About'].map(link => (
                <Link key={link} href={`/${link.toLowerCase()}`} style={{ fontSize: '0.75rem', color: '#888', textDecoration: 'none' }}>{link}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}