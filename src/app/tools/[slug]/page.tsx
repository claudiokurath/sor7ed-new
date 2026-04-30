import Link from 'next/link';
import { notFound } from 'next/navigation';
import ExecutiveFunctionTriage from '@/components/tools/ExecutiveFunctionTriage';
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

  return {
    title: tool.name,
    description: tool.tagline,
  };
}

export default async function ToolDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const tool = await getToolBySlug(slug);
  if (!tool) notFound();

  const unlocked = resolvedSearchParams.unlocked === '1';
  const signupHref = `/signup?next=${encodeURIComponent(`/tools/${tool.slug}?unlocked=1`)}`;
  const isInteractiveFlagship = tool.slug === 'executive-function-triage';

  return (
    <>
      <SEOJsonLd
        title={tool.name}
        description={tool.tagline}
        slug={`tools/${tool.slug}`}
        type="article"
      />

      <section className="border-b-2 border-white">
        <div className="max-w-4xl mx-auto px-5 py-20">
          <p className="kicker mb-4">
            <Link href="/tools" className="hover:text-[#ffc107]">
              ← Tools
            </Link>{' '}
            · {tool.branch}
          </p>
          <h1 className="text-6xl md:text-7xl">{tool.name}</h1>
          <p className="text-lg mt-6 max-w-2xl">{tool.tagline}</p>
          <div className="flex flex-wrap gap-3 mt-6">
            {isInteractiveFlagship && (
              <span className="mono text-xs border border-[#ffc107] text-[#ffc107] inline-block px-2 py-1">
                INTERACTIVE PREVIEW
              </span>
            )}
            {tool.status === 'coming-soon' && (
              <span className="mono text-xs border border-[#ffc107] text-[#ffc107] inline-block px-2 py-1">
                COMING SOON
              </span>
            )}
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-5 py-16">
        {tool.coverImage && (
          <img
            src={tool.coverImage}
            alt={tool.name}
            className="w-full mb-10 object-cover max-h-[420px]"
          />
        )}

        {isInteractiveFlagship && (
          <ExecutiveFunctionTriage signupHref={signupHref} initiallyUnlocked={unlocked} />
        )}

        <h2 className="text-4xl mb-3">What it does</h2>
        <p className="text-base mb-10">{tool.description}</p>

        {tool.example && (
          <>
            <h2 className="text-4xl mb-3">Example output</h2>
            <p className="mono text-sm border-2 border-white p-4 mb-10">{tool.example}</p>
          </>
        )}

        {tool.template && (
          <>
            <h2 className="text-4xl mb-3">Template preview</h2>
            <p className="mono text-sm border-2 border-[#ffc107] p-4 mb-10 whitespace-pre-wrap">
              {tool.template}
            </p>
          </>
        )}

        <h2 className="text-4xl mb-3">Who it is for</h2>
        <ul className="space-y-2 text-sm mb-10">
          <li>▸ Adults with ADHD, autism, dyslexia, and related needs</li>
          <li>▸ People stuck mid-task with no idea why</li>
          <li>▸ Anyone who wants structure, not advice</li>
        </ul>

        <h2 className="text-4xl mb-3">Access model</h2>
        <p className="text-base mb-6">
          SOR7ED tools now lead with an on-page teaser experience, then gate the full result behind
          signup. You do the triage first, prove intent, and unlock the practical output after the
          magic link.
        </p>

        <WhatsappCTA keyword={tool.keyword} />

        <p className="text-xs opacity-80 mt-6">
          This is not medical or therapeutic advice. For emergencies call 999 or text SHOUT to
          85258.
        </p>
      </article>
    </>
  );
}
