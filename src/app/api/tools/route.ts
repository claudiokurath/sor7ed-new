import { NextResponse } from 'next/server';
import { getTools } from '@/lib/notion-content';

export const revalidate = 60;

export async function GET() {
  try {
    const tools = await getTools();
    return NextResponse.json(tools);
  } catch (e) {
    return NextResponse.json([], { status: 500 });
  }
}
