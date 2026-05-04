import Link from 'next/link';
import { notFound } from 'next/navigation';
import ExecutiveFunctionTriage from '@/components/tools/ExecutiveFunctionTriage';
import DifficultMessage from '@/components/tools/DifficultMessage';
import DifficultMessage from '@/components/tools/DifficultMessage';
import DecisionClarity from '@/components/tools/DecisionClarity';
import WhatsappCTA from '@/components/WhatsappCTA';
import SEOJsonLd from '@/components/SEOHead';
import { TOOLS } from '@/data/tools';
import { getToolBySlug } from '@/lib/notion-content';

export const revalidate = 300;

export function generateStaticParams() {
  return TOOLS.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);
  if (!tool) return { title: 'Tool not found' };
  return { title: tool.name, description: tool.tagline };
}

const INTERACTIVE_SLUGS = ['executive-function-triage', 'difficult-message', 'decision-clarity'];

export default async function ToolDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const resolved = await searchParams;
  const tool = await getToolBySlug(slug);
  if (!tool) notFound();

  const unlocked = resolved.unlocked === '1';
  const signupHref = `/signup?next=${encodeURIComponent(`/tools/${tool.slug}?unlocked=1`)}`;
  const isInteractive = INTERACTIVE_SLUGS.includes(tool.slug);

  return (
    <>
      <SEOJsonLd title={tool.name} description={tool.tagline} slug={`tools/${tool.slug}`} type="article" />

      <section className="border-b-2 border-white">
        <div className="max-w-4xl mx-auto px-5 py-20">
          <p className="kicker mb-4">
            <Link href="/tools" className="hover:text-[#ffc107]">← Tools</Link>
            {' '}· {tool.branch}
          </p>
          <h1 className="text-5xl md:text-7xl leading-none mb-4">{tool.name}</h1>
          <p className="text-lg max-w-2xl opacity-80">{tool.tagline}</p>
          <div className="flex flex-wrap gap-3 mt-5">
            {isInteractive && (
              <span className="mono text-xs border border-[#ffc107] text-[#ffc107] px-2 py-1">INTERACTIVE</span>
            )}
            {tool.status === 'coming-soon' && (
              <span className="mono text-xs border border-white/40 text-white/40 px-2 py-1">COMING SOON</span>
            )}
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-5 py-16">
        {tool.coverImage && (
          <img src={tool.coverImage} alt={tool.name} className="w-full mb-10 object-cover max-h-[420px]" />
        )}

        {tool.slug === 'executive-function-triage' && (
          <ExecutiveFunctionTriage signupHref={signupHref} initiallyUnlocked={unlocked} />
        )}
        {tool.slug === 'difficult-message' && (
          <DifficultMessage signupHref={signupHref} initiallyUnlocked={unlocked} />
        )}
        {tool.slug === 'decision-clarity' && (
          <DecisionClarity signupHref={signupHref} initiallyUnlocked={unlocked} />
        )}

        {tool.status === 'coming-soon' && !isInteractive && (
          <div className="border-2 border-white/20 p-6 mb-10 text-center">
            <p className="display text-2xl mb-2">Coming soon.</p>
            <p className="text-sm opacity-60 mb-4">This tool is in development. Sign up to be notified when it goes live.</p>
            <Link href="/signup" className="btn-yellow inline-block">Join the waitlist</Link>
          </div>
        )}

        <h2 className="text-4xl mb-3">What it does</h2>
        <p className="text-base mb-10 opacity-80">{tool.description}</p>

        {tool.example && (
          <>
            <h2 className="text-4xl mb-3">Example output</h2>
            <p className="mono text-sm border-2 border-white p-4 mb-10">{tool.example}</p>
          </>
        )}

        <h2 className="text-4xl mb-3">Who it is for</h2>
        <ul className="space-y-2 text-sm mb-10 opacity-80">
          <li>▸ Adults with ADHD, autism, dyslexia, and related needs</li>
          <li>▸ People stuck mid-task, mid-decision, or mid-conversation</li>
          <li>▸ Anyone who wants structure, not advice</li>
        </ul>

        <WhatsappCTA keyword={tool.keyword} />

        <p className="text-xs opacity-50 mt-6">
          Not medical or therapeutic advice. For emergencies call 999 or text SHOUT to 85258.
        </p>
      </article>
    </>
  );
}
