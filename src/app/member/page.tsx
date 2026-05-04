import Link from 'next/link';

export const metadata = {
  title: 'Member Area — SOR7ED',
};

export default function MemberPage() {
  return (
    <section className="max-w-4xl mx-auto px-5 py-20">
      <p className="kicker mb-2">Member area</p>
      <h1 className="text-5xl md:text-7xl leading-none mb-6">You're in.</h1>
      <p className="text-base opacity-70 mb-10 max-w-xl">
        Your account is active. Head to the tools to unlock your results, or browse the blog.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/tools/executive-function-triage?unlocked=1" className="dark-card block group">
          <p className="kicker text-xs mb-2">Start here</p>
          <p className="display text-2xl mb-2 group-hover:text-[#ffc107] transition-colors">Executive Function Triage</p>
          <p className="text-sm opacity-60">Your triage result is ready to unlock.</p>
          <p className="text-sm mt-4 mono text-[#ffc107]">View full result →</p>
        </Link>
        <Link href="/tools" className="dark-card block group">
          <p className="kicker text-xs mb-2">Tools</p>
          <p className="display text-2xl mb-2 group-hover:text-[#ffc107] transition-colors">The Toolkit</p>
          <p className="text-sm opacity-60">All tools, all branches.</p>
          <p className="text-sm mt-4 mono text-[#ffc107]">Browse tools →</p>
        </Link>
        <Link href="/blog" className="dark-card block group">
          <p className="kicker text-xs mb-2">Blog</p>
          <p className="display text-2xl mb-2 group-hover:text-[#ffc107] transition-colors">Recent reads</p>
          <p className="text-sm opacity-60">Evidence-informed, ADHD-friendly articles.</p>
          <p className="text-sm mt-4 mono text-[#ffc107]">Read the blog →</p>
        </Link>
        <div className="dark-card opacity-40">
          <p className="kicker text-xs mb-2">Coming soon</p>
          <p className="display text-2xl mb-2">Saved results</p>
          <p className="text-sm opacity-60">Your tool outputs saved in one place.</p>
        </div>
      </div>
    </section>
  );
}
