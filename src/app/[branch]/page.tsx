import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticles, getTools } from '@/lib/notion-content';

export const dynamic = 'force-dynamic';

const BRANCHES: Record<string, {
  title: string;
  desc: string;
  notionBranch: string;
}> = {
  mind: {
    title: 'Mind',
    desc: 'Focus, burnout, emotional regulation protocols.',
    notionBranch: 'Mind',
  },
  body: {
    title: 'Body',
    desc: 'Sleep, sensory load, energy protocols.',
    notionBranch: 'Body',
  },
  tech: {
    title: 'Tech',
    desc: 'Productivity, time management protocols.',
    notionBranch: 'Tech',
  },
  wealth: {
    title: 'Wealth',
    desc: 'Money, debt, financial admin protocols.',
    notionBranch: 'Wealth',
  },
  connection: {
    title: 'Connection',
    desc: 'Relationships, communication protocols.',
    notionBranch: 'Connection',
  },
  identity: {
    title: 'Identity',
    desc: 'Masking, authenticity protocols.',
    notionBranch: 'Identity',
  },
  growth: {
    title: 'Growth',
    desc: 'Career, skills, levelling up protocols.',
    notionBranch: 'Growth',
  },
};

const RESERVED = ['blog', 'tools', 'signup', 'member', 'api', 'auth', 'about', 'admin', 'cookie-policy'];

export async function generateStaticParams() {
  return Object.keys(BRANCHES).map(branch => ({ branch }));
}

export default async function BranchPage({ params }: { params: Promise<{ branch: string }> }) {
  const { branch } = await params;

  if (RESERVED.includes(branch)) notFound();

  const config = BRANCHES[branch];
  if (!config) notFound();

  const [allArticles, allTools] = await Promise.all([getArticles(), getTools()]);
  const articles = allArticles.filter((a: any) => a.branch === config.notionBranch).slice(0, 6);
  const tools = allTools.filter((t: any) => t.branch === config.notionBranch && t.status === 'live');

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#000', fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', paddingBottom: '4rem' }}>
      
      {/* HERO */}
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: '10rem', paddingBottom: '4rem', paddingLeft: '5%', paddingRight: '5%' }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: 0, marginBottom: '0.2rem' }}>
          {config.title} Branch.
        </h1>
        <p style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 600, color: '#888', letterSpacing: '-0.02em', margin: 0, marginBottom: '2rem' }}>
          {config.desc}
        </p>
        <Link href="/signup" style={{ backgroundColor: '#000', color: '#fff', fontSize: '0.85rem', fontWeight: 600, padding: '0.6rem 1.5rem', borderRadius: '9999px', textDecoration: 'none' }}>
          Sign Up
        </Link>
      </section>

      {/* PINK SEPARATOR & TEXT */}
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem 5%' }}>
        <div style={{ width: '40px', height: '3px', backgroundColor: '#FF00FF', marginBottom: '2rem' }} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0, maxWidth: 600, lineHeight: 1.2 }}>
          SOR7ED's {config.title} branch tackles focus, burnout, executive function, and emotional regulation.
        </h2>
        <p style={{ fontSize: '1.5rem', fontWeight: 600, color: '#888', letterSpacing: '-0.02em', margin: 0, maxWidth: 600, lineHeight: 1.2 }}>
          Find practical blog posts and tools, all built for neurodivergent adults.
        </p>
        <div style={{ width: '40px', height: '3px', backgroundColor: '#FF00FF', marginTop: '2rem', marginBottom: '4rem' }} />
      </section>

      {/* BLOG POSTS */}
      <section style={{ padding: '0 5%', maxWidth: 1200, margin: '0 auto', marginBottom: '6rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>{config.title} Blog Posts</h2>
          <p style={{ fontSize: '0.85rem', color: '#888', margin: 0 }}>All blog posts for the {config.title} branch.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {articles.map((article: any) => (
            <Link key={article.slug} href={`/blog/${article.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ backgroundColor: '#F5F5F5', aspectRatio: '16/9', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {article.coverImage ? (
                  <img src={article.coverImage} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', opacity: 0.1 }}>
                    <div style={{ width: '20px', height: '20px', backgroundColor: '#000' }} />
                    <div style={{ width: '20px', height: '20px', backgroundColor: '#000', borderRadius: '50%' }} />
                    <div style={{ width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: '20px solid #000' }} />
                  </div>
                )}
              </div>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 800, letterSpacing: '-0.01em', margin: 0, marginBottom: '0.2rem', lineHeight: 1.3 }}>
                {article.title}
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#888', margin: 0 }}>
                {article.readMinutes} min read
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* TOOLS */}
      <section style={{ padding: '0 5%', maxWidth: 1200, margin: '0 auto', marginBottom: '6rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>{config.title} Tools</h2>
          <p style={{ fontSize: '0.85rem', color: '#888', margin: 0 }}>All tools for the {config.title} branch.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {tools.map((tool: any) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ backgroundColor: '#F5F5F5', aspectRatio: '16/9', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', opacity: 0.1 }}>
                  <div style={{ width: '20px', height: '20px', backgroundColor: '#000' }} />
                  <div style={{ width: '20px', height: '20px', backgroundColor: '#000', borderRadius: '50%' }} />
                  <div style={{ width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: '20px solid #000' }} />
                </div>
              </div>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 800, letterSpacing: '-0.01em', margin: 0, marginBottom: '0.2rem', lineHeight: 1.3 }}>
                {tool.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '4rem 5%' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', margin: 0, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
          Get WhatsApp Protocols
        </h2>
        <p style={{ fontSize: '0.85rem', color: '#888', margin: 0, marginBottom: '1.5rem', maxWidth: 200, lineHeight: 1.4 }}>
          Sign up to receive step-by-step solutions on WhatsApp — free for all {config.title} branch tools and posts.
        </p>
        <Link href="/signup" style={{ backgroundColor: '#000', color: '#fff', fontSize: '0.85rem', fontWeight: 600, padding: '0.6rem 1.5rem', borderRadius: '9999px', textDecoration: 'none' }}>
          Sign Up
        </Link>
      </section>

    </div>
  );
}