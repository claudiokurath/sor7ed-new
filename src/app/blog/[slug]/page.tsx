import Link from 'next/link';
import { notFound } from 'next/navigation';
import WhatsappCTA from '@/components/WhatsappCTA';
import SEOJsonLd from '@/components/SEOHead';
import { ARTICLES } from '@/data/articles';
import { ArticleBlock } from '@/data/articles';
import { getArticleBySlug } from '@/lib/notion-content';

export const revalidate = 300;

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: 'Article not found' };

  return {
    title: article.title,
    description: article.tldr,
  };
}

function renderBlock(block: ArticleBlock, index: number) {
  switch (block.type) {
    case 'heading_2':
      return (
        <h2 key={`${block.type}-${index}`} className="text-4xl mt-10 mb-4">
          {block.text}
        </h2>
      );
    case 'heading_3':
      return (
        <h3 key={`${block.type}-${index}`} className="text-2xl mt-8 mb-3">
          {block.text}
        </h3>
      );
    case 'bulleted_list_item':
      return (
        <p key={`${block.type}-${index}`} className="text-base mb-3">
          • {block.text}
        </p>
      );
    case 'numbered_list_item':
      return (
        <p key={`${block.type}-${index}`} className="text-base mb-3">
          {index + 1}. {block.text}
        </p>
      );
    case 'quote':
      return (
        <blockquote
          key={`${block.type}-${index}`}
          className="border-l-4 border-[#ffc107] pl-4 italic text-base my-6"
        >
          {block.text}
        </blockquote>
      );
    default:
      return (
        <p key={`${block.type}-${index}`} className="text-base mb-6">
          {block.text}
        </p>
      );
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const body = article.body || [];

  return (
    <>
      <SEOJsonLd
        title={article.title}
        description={article.tldr}
        slug={`blog/${article.slug}`}
        type="article"
        publishedAt={article.publishedAt}
      />
      <section className="border-b-2 border-white">
        <div className="max-w-3xl mx-auto px-5 py-20">
          <p className="kicker mb-4">
            <Link href="/blog" className="hover:text-[#ffc107]">
              ← Blog
            </Link>{' '}
            · {article.branch} · {article.readMinutes} min
          </p>
          <h1 className="text-5xl md:text-6xl">{article.title}</h1>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-5 py-16">
        {article.coverImage && (
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full mb-10 object-cover max-h-[420px]"
          />
        )}

        {body.length ? (
          body.map((block, index) => renderBlock(block, index))
        ) : (
          <p className="text-base opacity-60">
            This article is being prepared. Check back soon.
          </p>
        )}

        <WhatsappCTA keyword={article.keyword} />

        <p className="text-xs opacity-80 mt-6">
          This is not medical or therapeutic advice. For emergencies call 999 or text SHOUT to
          85258.
        </p>
      </article>
    </>
  );
}
