export type ToolStatus = 'live' | 'coming-soon';

export type Tool = {
  slug: string;
  name: string;
  branch: string;
  keyword: string;
  tagline: string;
  description: string;
  example?: string;
  status: ToolStatus;
  template?: string;
  sensitive?: boolean;
  coverImage?: string;
  sourcePageId?: string;
};

// No hardcoded tools — all content comes from Notion
export const TOOLS: Tool[] = [];
