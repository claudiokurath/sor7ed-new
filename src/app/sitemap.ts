import type { MetadataRoute } from 'next';
import { TOOLS } from '@/data/tools';
import { ARTICLES } from '@/data/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://sor7ed.com';
  const staticPaths = ['', '/tools', '/blog', '/about', '/signup', '/cookie-policy'];

  return [
    ...staticPaths.map((p) => ({
      url: `${base}${p}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: p === '' ? 1 : 0.7,
    })),
    ...TOOLS.map((t) => ({
      url: `${base}/tools/${t.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...ARTICLES.map((a) => ({
      url: `${base}/blog/${a.slug}`,
      lastModified: new Date(a.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
