import Link from 'next/link';
import { notFound } from 'next/navigation';
import ExecutiveFunctionTriage from '@/components/tools/ExecutiveFunctionTriage';
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
  return { title: tool.name + ' — SOR7ED', description: tool.tagline };
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
    <div style={{ minHeight: '100vh', background: '#08080A' }}>
      <SEOJsonLd title={tool.name} description={tool.tagline} slug={`tools/${tool.slug}`} type="article" />

      {tool.coverImage && (
        <div style={{ width: '100%', height: '45vh', position: 'relative', overflow: 'hidden' }}>
          <img src={tool.coverImage} alt={tool.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, #08080A 100%)' }} />
        </div>
      )}

      <div style={{ maxWidth: 920, margin: '0 auto', padding: tool.coverImage ? '0 2rem 2rem' : '8rem 2rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <Link href="/tools" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>← Tools</Link>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '0.2rem 0.6rem' }}>{tool.branch}</span>
          {isInteractive && <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.15)', padding: '0.2rem 0.6rem', color: 'rgba(255,255,255,0.4)' }}>Interactive</span>}
        </div>

        <h1 style={{ fontFamily: 'League Gothic, Arial Narrow, sans-serif', fontSize: 'clamp(2.5rem,7vw,6rem)', textTransform: 'uppercase', lineHeight: 0.92, color: '#fff', marginBottom: '1rem' }}>
          {tool.name}
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: 560, marginBottom: '3rem' }}>{tool.tagline}</p>
      </div>

      <div style={{ maxWidth: 920, margin: '0 auto', padding: '0 2rem 5rem' }}>
        {tool.slug === 'executive-function-triage' && <ExecutiveFunctionTriage signupHref={signupHref} initiallyUnlocked={unlocked} />}
        {tool.slug === 'difficult-message' && <DifficultMessage signupHref={signupHref} initiallyUnlocked={unlocked} />}
        {tool.slug === 'decision-clarity' && <DecisionClarity signupHref={signupHref} initiallyUnlocked={unlocked} />}

        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {tool.description && (
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontFamily: 'League Gothic, Arial Narrow, sans-serif', fontSize: '2rem', textTransform: 'uppercase', color: '#fff', marginBottom: '0.75rem' }}>What it does</h2>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>{tool.description}</p>
            </div>
          )}

          {tool.example && (
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontFamily: 'League Gothic, Arial Narrow, sans-serif', fontSize: '2rem', textTransform: 'uppercase', color: '#fff', marginBottom: '0.75rem' }}>Example output</h2>
              <pre style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.85rem', border: '1px solid rgba(255,255,255,0.08)', padding: '1.25rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, background: '#111', whiteSpace: 'pre-wrap' }}>{tool.example}</pre>
            </div>
          )}

          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: 'League Gothic, Arial Narrow, sans-serif', fontSize: '2rem', textTransform: 'uppercase', color: '#fff', marginBottom: '0.75rem' }}>Who it is for</h2>
            {['Adults with ADHD, autism, dyslexia, and related needs', 'People stuck mid-task, mid-decision, or mid-conversation', 'Anyone who wants structure, not advice'].map(item => (
              <p key={item} style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '0.5rem' }}>— {item}</p>
            ))}
          </div>

          <WhatsappCTA keyword={tool.keyword} />
        </div>

        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)', marginTop: '2rem', lineHeight: 1.6 }}>
          Not medical or therapeutic advice. For emergencies call 999 or text SHOUT to 85258.
        </p>
      </div>
    </div>
  );
}
