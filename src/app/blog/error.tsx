'use client';
import Link from 'next/link';

export default function BlogError() {
  return (
    <section className="max-w-3xl mx-auto px-5 py-20">
      <p className="kicker mb-4">Error</p>
      <h1 className="text-5xl mb-6">Something went wrong.</h1>
      <p className="text-base opacity-70 mb-8">This article couldn&apos;t be loaded. Try again or go back to the blog.</p>
      <Link href="/blog" className="btn-outline">← Back to blog</Link>
    </section>
  );
}
