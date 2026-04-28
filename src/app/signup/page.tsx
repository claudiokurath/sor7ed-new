'use client';
import { useEffect, useState } from 'react';

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
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      setState('ok');
      e.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-up failed.');
      setState('err');
    }
  }

  return (
    <section className="max-w-3xl mx-auto px-5 py-20">
      <p className="kicker">Sign up — free, forever</p>
      <h1 className="text-6xl mb-3">Get sorted.</h1>
      <p className="text-base mb-8 max-w-xl">
        Magic link login. No password. We need your phone number so the WhatsApp delivery can find
        you. Nothing is sent until you message us first.
      </p>

      {state === 'ok' ? (
        <div className="border-2 border-[#ffc107] p-6">
          <p className="display text-3xl text-[#ffc107]">Check your inbox.</p>
          <p className="text-sm mt-2">
            We sent a magic link to your email. Open it on the same device to come straight back to your tool.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="grid gap-5">
          <input type="hidden" name="next" value={next} />
          <label className="grid gap-2">
            <span className="kicker">First name</span>
            <input
              required
              name="firstName"
              type="text"
              className="bg-black text-white border-2 border-white px-4 py-3"
              placeholder="Alex"
            />
          </label>
          <label className="grid gap-2">
            <span className="kicker">Email address</span>
            <input
              required
              name="email"
              type="email"
              className="bg-black text-white border-2 border-white px-4 py-3"
              placeholder="alex@example.com"
            />
          </label>
          <label className="grid gap-2">
            <span className="kicker">WhatsApp number (with country code)</span>
            <input
              required
              name="phone"
              type="tel"
              className="bg-black text-white border-2 border-white px-4 py-3"
              placeholder="+44 7xxx xxxxxx"
            />
          </label>

          <label className="flex gap-3 text-sm">
            <input type="checkbox" name="consentMessaging" className="mt-1 accent-[#ffc107]" />
            <span>
              I consent to SOR7ED storing my email and phone number, and to receiving WhatsApp
              messages after I initiate contact (GDPR/PECR opt-in).
            </span>
          </label>
          <label className="flex gap-3 text-sm">
            <input type="checkbox" name="consentDisclaimer" className="mt-1 accent-[#ffc107]" />
            <span>
              I understand SOR7ED is not therapy, not medical advice, and not a crisis service. In
              an emergency I will call 999 or text SHOUT to 85258.
            </span>
          </label>

          {error && (
            <p className="text-sm border-2 border-[#ffc107] text-[#ffc107] p-3">{error}</p>
          )}

          <button type="submit" className="btn-yellow self-start" disabled={state === 'submitting'}>
            {state === 'submitting' ? 'Sending…' : 'Create free account'}
          </button>
          <p className="text-xs opacity-80">
            Text STOP at any time on WhatsApp to unsubscribe completely.
          </p>
        </form>
      )}
    </section>
  );
}
