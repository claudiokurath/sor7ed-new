'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const [state, setState] = useState<'idle' | 'submitting' | 'ok' | 'err'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [next, setNext] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    setNext(params.get('next') || '');
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('submitting');
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      firstName: fd.get('firstName'),
      email: fd.get('email'),
      phone: fd.get('phone'),
      next: fd.get('next'),
      consentMessaging: fd.get('consentMessaging') === 'on',
      consentDisclaimer: fd.get('consentDisclaimer') === 'on',
    };
    if (!payload.consentMessaging || !payload.consentDisclaimer) {
      setError('Please confirm both consent checkboxes.');
      setState('err');
      return;
    }
    try {
      const res = await fetch('/api/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error(await res.text());
      setState('ok');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-up failed.');
      setState('err');
    }
  }

  const inputStyle = { width: '100%', background: '#111', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', padding: '0.85rem 1rem', fontSize: '1rem', outline: 'none', borderRadius: 0, fontFamily: 'inherit' } as React.CSSProperties;
  const labelStyle = { fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '0.5rem' };

  return (
    <div style={{ minHeight: '100vh', background: '#08080A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 6% 4rem' }}>
      <div style={{ maxWidth: 520, width: '100%' }}>
        <Link href="/" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', textDecoration: 'none', display: 'block', marginBottom: '3rem' }}>← Back</Link>

        {state === 'ok' ? (
          <div>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ffc107', marginBottom: '1rem' }}>You're in</p>
            <h1 style={{ fontFamily: 'League Gothic, Arial Narrow, sans-serif', fontSize: 'clamp(2.5rem,6vw,4.5rem)', textTransform: 'uppercase', lineHeight: 0.92, color: '#fff', marginBottom: '1.5rem' }}>Check your inbox.</h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '2rem' }}>We sent a magic link to your email. Open it to activate your account, then text any keyword to <strong style={{ color: '#fff' }}>+44 7591 922247</strong> on WhatsApp.</p>
            <Link href="/tools" style={{ display: 'inline-block', background: '#ffc107', color: '#000', fontFamily: 'League Gothic, sans-serif', fontSize: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.9rem 2rem', textDecoration: 'none' }}>Browse tools →</Link>
          </div>
        ) : (
          <>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ffc107', marginBottom: '1rem' }}>Free account</p>
            <h1 style={{ fontFamily: 'League Gothic, Arial Narrow, sans-serif', fontSize: 'clamp(2.5rem,6vw,4.5rem)', textTransform: 'uppercase', lineHeight: 0.92, color: '#fff', marginBottom: '1rem' }}>Get sorted.</h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: '2.5rem', fontSize: '1rem' }}>
              Magic link login. No password. We need your WhatsApp number so protocols can find you.
            </p>
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <input type="hidden" name="next" value={next} />
              <div>
                <label style={labelStyle}>First name</label>
                <input required name="firstName" type="text" placeholder="Alex" style={inputStyle}
                  onFocus={e => e.currentTarget.style.borderColor = '#ffc107'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'} />
              </div>
              <div>
                <label style={labelStyle}>Email address</label>
                <input required name="email" type="email" placeholder="alex@example.com" style={inputStyle}
                  onFocus={e => e.currentTarget.style.borderColor = '#ffc107'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'} />
              </div>
              <div>
                <label style={labelStyle}>WhatsApp number (with country code)</label>
                <input required name="phone" type="tel" placeholder="+44 7xxx xxxxxx" style={inputStyle}
                  onFocus={e => e.currentTarget.style.borderColor = '#ffc107'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'} />
              </div>
              <label style={{ display: 'flex', gap: '0.75rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, cursor: 'pointer' }}>
                <input type="checkbox" name="consentMessaging" style={{ marginTop: 3, accentColor: '#ffc107', flexShrink: 0 }} />
                I consent to SOR7ED storing my email and phone number, and to receiving WhatsApp messages after I initiate contact (GDPR/PECR opt-in).
              </label>
              <label style={{ display: 'flex', gap: '0.75rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, cursor: 'pointer' }}>
                <input type="checkbox" name="consentDisclaimer" style={{ marginTop: 3, accentColor: '#ffc107', flexShrink: 0 }} />
                I understand SOR7ED is not therapy, not medical advice, and not a crisis service. In an emergency I will call 999 or text SHOUT to 85258.
              </label>
              {error && <p style={{ color: '#fb7185', fontSize: '0.875rem', padding: '0.75rem', border: '1px solid #fb718540' }}>{error}</p>}
              <button type="submit" disabled={state === 'submitting'}
                style={{ background: '#ffc107', color: '#000', fontFamily: 'League Gothic, sans-serif', fontSize: '1.1rem', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '1rem', border: 'none', cursor: 'pointer', opacity: state === 'submitting' ? 0.7 : 1, marginTop: '0.5rem' }}>
                {state === 'submitting' ? 'Sending…' : 'Create free account →'}
              </button>
            </form>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)', marginTop: '1.5rem', lineHeight: 1.6 }}>
              GDPR compliant · No spam · Text STOP to unsubscribe at any time
            </p>
          </>
        )}
      </div>
    </div>
  );
}