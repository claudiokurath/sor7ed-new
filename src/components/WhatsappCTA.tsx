import Link from 'next/link';

type Props = { keyword: string };

export default function WhatsappCTA({ keyword }: Props) {
  const k = keyword.toUpperCase();
  const waUrl = `https://wa.me/447360277713?text=${encodeURIComponent(k)}`;
  return (
    <div className="border-2 border-[#ffc107] p-6 my-10">
      <p className="kicker mb-3">Sort this out for you?</p>
      <p className="display text-3xl mt-1 mb-3">
        Send <span style={{ color: '#ffc107' }}>{k}</span> on WhatsApp
      </p>
      <p className="text-sm mb-4">
        Sign up first at sor7ed.com. No app. No spam. Just what works.
        Nothing is sent until you sign up and message us first.
      </p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-yellow">
          Message us on WhatsApp →
        </a>
        <Link href="/signup" className="btn-yellow" style={{ background: 'transparent', border: '2px solid #ffc107', color: '#ffc107' }}>
          Create free account
        </Link>
      </div>
    </div>
  );
}
