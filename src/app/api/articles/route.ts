import { NextResponse } from 'next/server';
import { getArticles } from '@/lib/notion-content';

export const revalidate = 60;

export async function GET() {
  try {
    const articles = await getArticles();
    return NextResponse.json(articles);
  } catch (e) {
    return NextResponse.json([], { status: 500 });
  }
}
