import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black border-b-2 border-white">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="display text-3xl text-white" aria-label="SOR7ED home">
          SOR<span style={{ color: '#ffc107' }}>7</span>ED
        </Link>
        <nav className="hidden md:flex items-center gap-6 display text-xl">
          <Link href="/tools" className="hover:text-[#ffc107]">Tools</Link>
          <Link href="/blog"  className="hover:text-[#ffc107]">Blog</Link>
          <Link href="/about" className="hover:text-[#ffc107]">About</Link>
          <Link href="/signup" className="btn-yellow !text-base !py-2 !px-4">Join free</Link>
        </nav>
        <Link href="/signup" className="md:hidden btn-yellow !text-sm !py-2 !px-3">Join</Link>
      </div>
    </header>
  );
}
