'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const container = document.querySelector('.snap-y') as HTMLElement | null;
    const target = container || window;
    const onScroll = () => {
      const y = container ? container.scrollTop : window.scrollY;
      if (Math.abs(y - lastY.current) < 5) return;
      setVisible(y < lastY.current || y < 60);
      lastY.current = y;
    };
    target.addEventListener('scroll', onScroll, { passive: true });
    return () => target.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 bg-black border-b-2 border-white"
      style={{ transform: visible ? 'translateY(0)' : 'translateY(-100%)', transition: 'transform 0.3s ease' }}
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" aria-label="SOR7ED home" className="display text-2xl text-white">
          &nbsp;
        </Link>
        <nav className="hidden md:flex items-center gap-6 display text-xl">
          <Link href="/tools" className="hover:text-[#ffc107]">Tools</Link>
          <Link href="/blog" className="hover:text-[#ffc107]">Blog</Link>
          <Link href="/signup" className="btn-yellow !text-base !py-2 !px-4">Join free</Link>
        </nav>
        <Link href="/signup" className="md:hidden btn-yellow !text-sm !py-2 !px-3">Join</Link>
      </div>
    </header>
  );
}
