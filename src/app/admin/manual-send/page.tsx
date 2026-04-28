'use client';

/*
  Manual fallback admin UI.
  Lets you respond to a keyword by hand from the browser while the live
  webhook is offline (e.g. Meta verification pending).

  Visit /admin/manual-send and paste the recipient's phone + keyword.
  Authenticated by SOR7ED_ADMIN_TOKEN (you'll be prompted on first send,
  the token is kept in sessionStorage for the rest of the session).
*/

import { useState } from 'react';

export default function ManualSendPage() {
  const [phone, setPhone] = useState('');
  const [keyword, setKeyword] = useState('');
  const [customText, setCustomText] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const [feedback, setFeedback] = useState<string | null>(null);

  function getToken(): string {
    let token = '';
    try {
      token = sessionStorage.getItem('sor7ed-admin-token') || '';
    } catch {}
    if (!token) {
      token = window.prompt('Admin token (SOR7ED_ADMIN_TOKEN):') || '';
      try {
        if (token) sessionStorage.setItem('sor7ed-admin-token', token);
      } catch {}
    }
    return token;
  }

  async function onSend(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setFeedback(null);
    const token = getToken();
    if (!token) {
      setStatus('err');
      setFeedback('No admin token provided.');
      return;
    }
    try {
      const res = await fetch('/api/admin/manual-send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
        body: JSON.stringify({
          phone,
          keyword: keyword || undefined,
          customText: customText || undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'send_failed');
      setStatus('ok');
      setFeedback(`Sent ${json.sent} chars to +${json.to}`);
      setKeyword('');
      setCustomText('');
    } catch (err) {
      setStatus('err');
      setFeedback(err instanceof Error ? err.message : 'unknown_error');
    }
  }

  return (
    <section className="max-w-2xl mx-auto px-5 py-20">
      <p className="kicker">Admin · manual fallback</p>
      <h1 className="text-5xl mb-3">Send a keyword by hand.</h1>
      <p className="text-base mb-8">
        Use this when Meta verification is pending or the webhook is offline. The
        recipient's phone must already be opted-in (24-hour customer service
        window applies under WhatsApp Cloud API rules).
      </p>

      <form onSubmit={onSend} className="grid gap-5">
        <label className="grid gap-2">
          <span className="kicker">Phone (E.164 — with country code)</span>
          <input
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            className="bg-black text-white border-2 border-white px-4 py-3"
            placeholder="+44 7xxx xxxxxx"
          />
        </label>

        <label className="grid gap-2">
          <span className="kicker">Keyword (looks up Notion template)</span>
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            type="text"
            className="bg-black text-white border-2 border-white px-4 py-3 mono"
            placeholder="TRIAGE"
          />
        </label>

        <p className="text-xs opacity-80">— or —</p>

        <label className="grid gap-2">
          <span className="kicker">Custom message (raw, no Notion lookup)</span>
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            rows={6}
            className="bg-black text-white border-2 border-white px-4 py-3"
            placeholder="Type a free-form WhatsApp reply…"
          />
        </label>

        {feedback && (
          <p
            className={`text-sm border-2 p-3 ${
              status === 'ok'
                ? 'border-[#ffc107] text-[#ffc107]'
                : 'border-white text-white'
            }`}
          >
            {feedback}
          </p>
        )}

        <button type="submit" className="btn-yellow self-start" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send via WhatsApp'}
        </button>
      </form>

      <p className="text-xs opacity-80 mt-10">
        This page is intentionally not linked from the public nav. Bookmark it.
      </p>
    </section>
  );
}
