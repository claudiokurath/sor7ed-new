import Link from 'next/link';

type Props = { keyword: string };

export default function WhatsappCTA({ keyword }: Props) {
  const k = keyword.toUpperCase();
  return (
    <div className="border-2 border-[#ffc107] p-6 my-10">
      <p className="kicker">How to get this</p>
      <p className="display text-3xl mt-1 mb-3">
        Text <span style={{ color: '#ffc107' }}>{k}</span> to <span className="mono">+44 7360 277713</span>
      </p>
      <p className="text-sm mb-4">
        Sign up first at sor7ed.com. No app. No spam. Just what works. Nothing is sent on
        WhatsApp until you sign up and message us first.
      </p>
      <Link href="/signup" className="btn-yellow">Create free account</Link>
    </div>
  );
}
