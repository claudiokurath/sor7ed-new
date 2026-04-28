import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="max-w-3xl mx-auto px-5 py-32 text-center">
      <p className="kicker">404</p>
      <h1 className="text-7xl mb-4">Not here.</h1>
      <p className="text-base mb-8">That page does not exist. Try one of these:</p>
      <div className="flex justify-center flex-wrap gap-3">
        <Link href="/" className="btn-yellow">Home</Link>
        <Link href="/tools" className="btn-outline">Tools</Link>
        <Link href="/blog" className="btn-outline">Blog</Link>
      </div>
    </section>
  );
}
