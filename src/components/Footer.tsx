import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t-2 border-white/10 flex flex-col justify-center py-16">
      <div className="max-w-6xl mx-auto px-5 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="display text-3xl mb-2">
            SOR<span style={{ color: '#ffc107' }}>7</span>ED
          </p>
          <p className="text-sm max-w-sm">
            Templates, not inspiration. Practical tools for neurodivergent adults — delivered
            via WhatsApp.
          </p>
          <p className="kicker mt-6">In an emergency</p>
          <p className="text-sm">
            Call <span className="mono">999</span> or text <span className="mono">SHOUT</span> to{' '}
            <span className="mono">85258</span>. SOR7ED is not a crisis service.
          </p>
        </div>

        <div>
          <p className="kicker mb-3">Site</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/tools" className="hover:text-[#ffc107]">Tools</Link></li>
            <li><Link href="/blog" className="hover:text-[#ffc107]">Blog</Link></li>
            <li><Link href="/about" className="hover:text-[#ffc107]">About</Link></li>
            <li><Link href="/signup" className="hover:text-[#ffc107]">Sign up</Link></li>
            <li><Link href="/cookie-policy" className="hover:text-[#ffc107]">Cookie policy</Link></li>
          </ul>
        </div>

        <div>
          <p className="kicker mb-3">Company</p>
          <ul className="space-y-2 text-sm">
            <li>SOR7ED LIMITED</li>
            <li>Co. number 16398701</li>
            <li>London, United Kingdom</li>
            <li className="mono">+44 7360 277713</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/30">
        <div className="max-w-6xl mx-auto px-5 py-4 text-xs flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} SOR7ED LIMITED</span>
          <span>Not therapy. Not medical advice. Not a crisis service.</span>
        </div>
      </div>
    </footer>
  );
}
