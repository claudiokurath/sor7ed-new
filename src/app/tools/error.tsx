'use client';
import Link from 'next/link';

export default function ToolsError() {
  return (
    <section className="max-w-3xl mx-auto px-5 py-20">
      <p className="kicker mb-4">Error</p>
      <h1 className="text-5xl mb-6">Something went wrong.</h1>
      <p className="text-base opacity-70 mb-8">This tool couldn&apos;t be loaded. Try again or browse all tools.</p>
      <Link href="/tools" className="btn-outline">← Back to tools</Link>
    </section>
  );
}
