import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticles, getTools } from '@/lib/notion-content';

export const dynamic = 'force-dynamic';

const BRANCHES: Record<string, {
  title: string;
  color: string;
  desc: string;
  detail: string;
  notionBranch: string;
  keywords: string[];
}> = {
  mind: {
    title: 'Mind',
    color: '#6366F1',
    desc: 'Focus, burnout, executive function, emotional regulation.',
    detail: 'Your brain is not broken. It runs differently. This branch covers everything happening inside your head — the executive function gaps, the emotional storms, the burnout cycles, and the tools to navigate all of it without shame.',
    notionBranch: 'Keep Going',
    keywords: ['TRIAGE', 'BURNOUT', 'OVERWHELM', 'SHAME', 'FEELINGS', 'INITIATION', 'WILLPOWER', 'FOCUS'],
  },
  body: {
    title: 'Body',
    color: '#EF4444',
    desc: 'Sleep, sensory load, medication, energy, fatigue.',
    detail: 'Your nervous system is the foundation. Sleep deprivation, sensory overwhelm, medication management, and chronic fatigue affect every other area of your life. This branch stabilises the baseline.',
    notionBranch: 'Feel Good',
    keywords: ['SLEEP', 'SENSORY', 'MEDS', 'ENERGY', 'TIRED', 'MOVE', 'DOPAMINE', 'CALM'],
  },
  tech: {
    title: 'Tech',
    color: '#06B6D4',
    desc: 'Productivity, time management, digital systems, clutter.',
    detail: 'Standard productivity advice was not built for your brain. This branch covers the systems, tools, and workarounds that actually work — from time blindness fixes to inbox zero without the spiral.',
    notionBranch: 'Plan Ahead',
    keywords: ['TIME', 'PLAN', 'HOME', 'INBOX', 'SCREEN', 'FOCUS'],
  },
  wealth: {
    title: 'Wealth',
    color: '#10B981',
    desc: 'Money, debt, budgeting, benefits, financial admin.',
    detail: 'The financial cost of neurodivergence is real and measurable. Late fees, impulsive decisions, missed deadlines, unclaimed benefits — this branch helps you stop the bleed.',
    notionBranch: 'Spend Smart',
    keywords: ['MONEY', 'DEBT2', 'FEES', 'BENEFITS', 'TAX', 'FOOD'],
  },
  connection: {
    title: 'Connection',
    color: '#F59E0B',
    desc: 'Relationships, communication, loneliness, intimacy.',
    detail: 'Neurodivergent adults experience connection differently. This branch covers relationships, intimacy, communication, and the specific loneliness that comes from a lifetime of feeling slightly out of sync.',
    notionBranch: 'Be Connected',
    keywords: ['RELATE', 'CONNECT', 'TALK', 'BREAKUP', 'ISOLATED', 'EMAIL'],
  },
  identity: {
    title: 'Identity',
    color: '#FB7185',
    desc: 'Masking, late diagnosis, authenticity, self-narrative.',
    detail: 'Who are you when you stop performing? This branch covers the deep work of late diagnosis, unmasking, and rebuilding your self-narrative after years of being told you were the problem.',
    notionBranch: 'Be Yourself',
    keywords: ['MASK', 'NEWME', 'GRIEF', 'RECOVERY', 'PATTERN'],
  },
  growth: {
    title: 'Growth',
    color: '#A855F7',
    desc: 'Career, skills, self-sabotage, levelling up.',
    detail: 'This is where everything compounds. Career, skills, purpose, and a life genuinely designed for the way your brain works. Not a neurotypical life badly adapted. A neurodivergent life built right.',
    notionBranch: 'Level Up',
    keywords: ['PATTERN', 'RETURN', 'TOXIC', 'JOBLOSS2', 'IMMIGRATION', 'HOUSING'],
  },
};

// Prevent [branch] from catching real routes
const RESERVED = ['blog', 'tools', 'signup', 'member', 'api', 'auth', 'about', 'admin', 'cookie-policy'];

export async function generateStaticParams() {
  return Object.keys(BRANCHES).map(branch => ({ branch }));
}

export default async function BranchPage({ params }: { params: Promise<{ branch: string }> }) {
  const { branch } = await params;

  // Don't catch reserved routes
  if (RESERVED.includes(branch)) notFound();

  const config = BRANCHES[branch];
  if (!config) notFound();

  const [allArticles, allTools] = await Promise.all([getArticles(), getTools()]);
  const articles = allArticles.filter((a: any) => a.branch === config.notionBranch).slice(0, 6);
  const tools = allTools.filter((t: any) => t.branch === config.notionBranch && t.status === 'live');

  return (
    <div style={{ minHeight: '100vh', background: '#08080A' }}>

      {/* HERO */}
      <section style={{ padding: '8rem 6% 4rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', textDecoration: 'none', display: 'inline-block', marginBottom: '3rem' }}>
          ← All branches
        </Link>
        <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: config.color, marginBottom: '1rem' }}>
          Branch 0{Object.keys(BRANCHES).indexOf(branch) + 1}
        </p>
        <h1 style={{ fontFamily: 'League Gothic, Arial Narrow, sans-serif', fontSize: 'clamp(5rem,15vw,14rem)', textTransform: 'uppercase', lineHeight: 0.88, color: config.color, marginBottom: '2rem' }}>
          {config.title}
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.5)', maxWidth: 560, lineHeight: 1.7, marginBottom: '1rem' }}>{config.desc}</p>
        <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.3)', maxWidth: 560, lineHeight: 1.8 }}>{config.detail}</p>
      </section>

      {/* KEYWORDS */}
      <section style={{ padding: '3rem 6%', background: '#0d0d0d', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <p style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: '1.5rem' }}>
          WhatsApp protocols — sign up and send any keyword
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
          {config.keywords.map(kw => (
            <span key={kw} style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.8rem', padding: '0.4rem 1rem', border: `1px solid ${config.color}40`, color: config.color, letterSpacing: '0.1em' }}>
              {kw}
            </span>
          ))}
        </div>
        <Link href="/signup" style={{ display: 'inline-block', background: config.color, color: '#000', fontFamily: 'League Gothic, sans-serif', fontSize: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.9rem 2rem', textDecoration: 'none' }}>
          Sign up to unlock →
        </Link>
      </section>

      {/* TOOLS */}
      {tools.length > 0 && (
        <section style={{ padding: '4rem 6%', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: '2rem' }}>Tools</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.04)' }}>
            {tools.map((tool: any) => (
              <Link key={tool.slug} href={'/tools/' + tool.slug}
                style={{ background: '#08080A', padding: '2rem', display: 'block', textDecoration: 'none', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: config.color }} />
                <p style={{ fontFamily: 'League Gothic, Arial Narrow, sans-serif', fontSize: '1.8rem', textTransform: 'uppercase', lineHeight: 0.92, color: '#fff', marginBottom: '0.75rem' }}>{tool.name}</p>
                <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, marginBottom: '1.25rem' }}>{tool.tagline}</p>
                <span style={{ fontSize: '0.75rem', fontFamily: 'League Gothic, sans-serif', letterSpacing: '0.1em', color: config.color, textTransform: 'uppercase' }}>Try it →</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ARTICLES */}
      {articles.length > 0 && (
        <section style={{ padding: '4rem 6%', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: '2rem' }}>Articles</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.04)' }}>
            {articles.map((article: any) => (
              <Link key={article.slug} href={'/blog/' + article.slug}
                style={{ background: '#08080A', display: 'block', textDecoration: 'none' }}>
                {article.coverImage ? (
                  <img src={article.coverImage} alt={article.title} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <div style={{ width: '100%', aspectRatio: '16/9', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'League Gothic, sans-serif', fontSize: '2rem', color: `${config.color}20`, textTransform: 'uppercase' }}>{config.title}</span>
                  </div>
                )}
                <div style={{ padding: '1.5rem' }}>
                  <p style={{ fontFamily: 'League Gothic, Arial Narrow, sans-serif', fontSize: '1.4rem', textTransform: 'uppercase', lineHeight: 0.95, color: '#fff', marginBottom: '0.75rem' }}>{article.title}</p>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{article.tldr}</p>
                  <p style={{ fontSize: '0.75rem', fontFamily: 'League Gothic, sans-serif', letterSpacing: '0.1em', color: config.color, textTransform: 'uppercase', marginTop: '1rem' }}>Read →</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* No content fallback */}
      {articles.length === 0 && tools.length === 0 && (
        <section style={{ padding: '4rem 6%' }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '1rem' }}>Content coming soon for this branch.</p>
        </section>
      )}

      {/* CTA */}
      <section style={{ padding: '5rem 6%' }}>
        <h2 style={{ fontFamily: 'League Gothic, Arial Narrow, sans-serif', fontSize: 'clamp(2.5rem,6vw,5rem)', textTransform: 'uppercase', lineHeight: 0.92, color: '#fff', marginBottom: '1.5rem' }}>
          Ready to sort your <span style={{ color: config.color }}>{config.title.toLowerCase()}?</span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem', marginBottom: '2rem', maxWidth: 480, lineHeight: 1.7 }}>
          Sign up free and get your first protocol on WhatsApp in under a minute.
        </p>
        <Link href="/signup" style={{ display: 'inline-block', background: config.color, color: '#000', fontFamily: 'League Gothic, sans-serif', fontSize: '1.1rem', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '1rem 2.5rem', textDecoration: 'none' }}>
          Get started free →
        </Link>
      </section>

    </div>
  );
}