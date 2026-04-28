import Link from 'next/link';
import SEOJsonLd from '@/components/SEOHead';
import { getArticles } from '@/lib/notion-content';

export const metadata = {
  title: 'Blog',
  description: 'Practical reads on executive function, time blindness, RSD, shutdown, and more.',
};

export const revalidate = 60;

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <>
      <SEOJsonLd
        title="Blog"
        description="Practical reads on executive function, time blindness, RSD, shutdown, and more."
        slug="blog"
      />
      <section className="border-b-2 border-white">
        <div className="max-w-6xl mx-auto px-5 py-20">
          <p className="kicker">Blog</p>
          <h1 className="text-6xl md:text-7xl">Plain words. Real situations.</h1>
          <p className="text-base mt-4 max-w-2xl">
            Three reads a week. Every article ends with a WhatsApp keyword that delivers a
            template you can actually use.
          </p>
        </div>
      </section>

      <section>
        <div className="max-w-6xl mx-auto px-5 py-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="dark-card block">
              <p className="kicker">
                {article.branch} · {article.readMinutes} min
              </p>
              <p className="display text-3xl mt-2">{article.title}</p>
              <p className="text-sm mt-3">{article.tldr}</p>
              <p className="text-sm mt-4 text-[#ffc107]">Read →</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
