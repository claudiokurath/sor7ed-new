import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return NextResponse.json({
    url: 'https://sor7ed.com/api/data-deletion',
    instructions: 'To request deletion of your data, email privacy@sor7ed.com with your WhatsApp number and we will delete all associated data within 30 days.'
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  console.log('Data deletion request:', body);
  return NextResponse.json({
    url: 'https://sor7ed.com/privacy/deletion-confirmed',
    confirmation_code: 'SOR7ED-DELETION-' + Date.now()
  });
}
