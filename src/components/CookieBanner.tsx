'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem('sor7ed-cookie-ack')) setVisible(true);
    } catch {}
  }, []);

  if (!visible) return null;

  const accept = () => {
    try { localStorage.setItem('sor7ed-cookie-ack', 'accepted'); } catch {}
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed bottom-0 inset-x-0 z-40 border-t-2 border-[#ffc107] bg-black"
    >
      <div className="max-w-6xl mx-auto px-5 py-3 flex flex-wrap gap-3 items-center justify-between text-sm">
        <p className="max-w-3xl">
          We use the minimum cookies needed for sign-up and security. No advertising trackers, ever.
          See the <Link href="/cookie-policy" className="underline text-[#ffc107]">cookie policy</Link>.
        </p>
        <button onClick={accept} className="btn-yellow !text-sm !py-2 !px-3">OK, got it</button>
      </div>
    </div>
  );
}
