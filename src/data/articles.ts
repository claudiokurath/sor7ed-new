export type ArticleBlockType =
  | 'paragraph'
  | 'heading_2'
  | 'heading_3'
  | 'bulleted_list_item'
  | 'numbered_list_item'
  | 'quote';

export type ArticleBlock = {
  type: ArticleBlockType;
  text: string;
};

export type Article = {
  slug: string;
  title: string;
  branch: string;
  tldr: string;
  excerpt?: string;
  publishedAt: string;
  keyword: string;
  readMinutes: number;
  coverImage?: string;
  body?: ArticleBlock[];
  sourcePageId?: string;
};

// No hardcoded articles — all content comes from Notion
export const ARTICLES: Article[] = [];
