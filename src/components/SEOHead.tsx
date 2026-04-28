// Server component — emits structured data for crawlers.
type Props = {
  title: string;
  description: string;
  slug?: string;
  type?: 'website' | 'article';
  publishedAt?: string;
};

export default function SEOJsonLd({
  title,
  description,
  slug = '',
  type = 'website',
  publishedAt,
}: Props) {
  const url = `https://sor7ed.com/${slug}`.replace(/\/$/, '');
  const data =
    type === 'article'
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: title,
          description,
          url,
          datePublished: publishedAt,
          author: { '@type': 'Person', name: 'Claudio Kurath' },
          publisher: {
            '@type': 'Organization',
            name: 'SOR7ED',
            logo: { '@type': 'ImageObject', url: 'https://sor7ed.com/logo.png' },
          },
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'SOR7ED',
          url: 'https://sor7ed.com',
          description,
        };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
