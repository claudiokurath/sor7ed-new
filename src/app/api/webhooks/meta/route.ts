import { NextRequest, NextResponse } from 'next/server';

const VERIFY_TOKEN = process.env.META_WEBHOOK_VERIFY_TOKEN ?? 'sor7ed_meta_webhook_2026';
const WHATSAPP_TOKEN = process.env.META_WHATSAPP_TOKEN!;
const PHONE_NUMBER_ID = process.env.META_PHONE_NUMBER_ID!;

// ── KEYWORD → PROTOCOL MAP ─────────────────────────────────────────
const PROTOCOLS: Record<string, string> = {
  TRIAGE: `*EXECUTIVE FUNCTION TRIAGE PROTOCOL*\n\nYou sent TRIAGE. Here's your reset:\n\n*Step 1 — Name the block*\nWrite one sentence: "I can't start because..."\n\n*Step 2 — Shrink the task*\nWhat is the tiniest possible first move? Not the task — the first physical action.\n\n*Step 3 — 2-minute timer*\nSet it. Do anything related to the task. Badly. Without pressure.\n\n*Step 4 — Remove one input*\nClose a tab. Silence a notification. One less thing.\n\n*Step 5 — Name your next anchor*\nWhat is the ONE thing that needs to happen today? Only one.\n\n---\nReply with your bottleneck keyword for a targeted protocol:\nINITIATION · OVERWHELM · MEMORY · EMOTION · TIME · URGENCY`,

  INITIATION: `*TASK INITIATION PROTOCOL*\n\nYour brain won't start. This is dopamine and activation — not laziness.\n\n*Do this now:*\n→ Open the thing. Don't do it. Just open it.\n→ Set a 2-minute timer\n→ Type or write one sentence about the task\n→ Stop when the timer ends\n\nStarting badly beats not starting.\n\n---\nReply MENU to see all protocols.`,

  OVERWHELM: `*OVERWHELM RESET PROTOCOL*\n\nYour working context is saturated.\n\n*Do this now:*\n→ Stop trying to prioritise\n→ Write EVERYTHING in your head onto paper — get it out\n→ Pick the ONE task that makes everything else feel less urgent\n→ Do only that\n\nEmpty the buffer first. Sort after.\n\n---\nReply MENU to see all protocols.`,

  BURNOUT: `*BURNOUT RECOVERY PROTOCOL*\n\nThis isn't tiredness. This is a neurological resource crash.\n\n*Right now:*\n→ Stop the output. Cancel one thing today.\n→ Remove stimulation — screens, news, noise\n→ Basic inputs only: sleep, food, daylight, movement\n\n*This week:*\n→ One task per day max\n→ No optimising. Just functioning.\n→ Talk to your GP if this has lasted weeks\n\nRecovery is measured in weeks, not days.\n\n---\nReply MENU to see all protocols.`,

  SLEEP: `*SLEEP PROTOCOL*\n\nADHD disrupts sleep at multiple levels. Here's the fix:\n\n*Tonight:*\n→ Fixed wake time tomorrow — set it now\n→ Brain dump: write everything in your head onto paper\n→ Devices down 30 mins before bed (alarm, not willpower)\n→ Boring on purpose — rewatch something familiar\n\n*This week:*\n→ 10 mins outside within 30 mins of waking\n→ Review your medication timing with your GP\n\n---\nReply MENU to see all protocols.`,

  MONEY: `*ADHD BUDGET PROTOCOL*\n\nThe ADHD tax is real. Here's how to stop paying it:\n\n*This week:*\n→ Open your bank app — highlight every recurring charge\n→ Cancel anything unused in 30 days\n→ Automate all bills via direct debit\n→ Create one account for bills only\n\n*Rule:*\nAny non-essential purchase over £30 — wait 48 hours. Add to a wishlist. Most won't survive the wait.\n\n---\nReply MENU to see all protocols.`,

  SHAME: `*SHAME SPIRAL INTERRUPT*\n\nShame doesn't motivate ADHD brains. It paralyses them.\n\n*Right now:*\n→ Name it: "I'm in the spiral"\n→ Separate you from the behaviour: you're not bad, you have ADHD\n→ The 2-minute engage: do 2 mins on the avoided thing — not to finish it, just to touch it\n→ Shrink it: what is the tiniest first step?\n\nShame is not a productivity tool.\n\n---\nReply MENU to see all protocols.`,

  FEELINGS: `*EMOTIONAL REGULATION PROTOCOL*\n\nRSD hit? Emotions overwhelming? Here's your toolkit:\n\n*Right now:*\n→ Name it out loud: "This is RSD. This feeling is disproportionate."\n→ Delay the response — do not send the message for 20 mins\n→ Reality test: what's the actual evidence? 3 other explanations?\n\n*Physiological reset:*\n→ Inhale twice, long slow exhale (physiological sigh)\n→ Cold water on wrists\n→ 5 mins outside\n\n---\nReply MENU to see all protocols.`,

  PLAN: `*OVERWHELM RESET PROTOCOL*\n\n3 steps. That's it.\n\n*Step 1 — The 3-task rule*\nIdentify only 3 things that must happen today. Not 10. Three.\n\n*Step 2 — Time-box, don't to-do*\nAssign each task to a time slot. Lists are graveyards for intentions.\n\n*Step 3 — Start with the stupidest small step*\nNot "write the report" — "open the document."\n\n---\nReply MENU to see all protocols.`,

  MENU: `*SOR7ED PROTOCOL MENU*\n\nReply with any keyword to get the protocol:\n\n🧠 TRIAGE — Full executive function assessment\n⚡ INITIATION — Can't start anything\n🌊 OVERWHELM — Everything feels urgent\n🔥 BURNOUT — Running on empty\n😴 SLEEP — Can't wind down or wake up\n💸 MONEY — ADHD tax and budget chaos\n🌀 SHAME — Guilt spiral eating your day\n❤️ FEELINGS — RSD and emotional overwhelm\n📅 PLAN — Paralysed by your task list\n\n---\nsor7ed.com · No app. No spam. Just what works.`,
};

// ── SEND MESSAGE ───────────────────────────────────────────────────
async function sendMessage(to: string, body: string) {
  const res = await fetch(
    `https://graph.facebook.com/v25.0/${PHONE_NUMBER_ID}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: { body },
      }),
    }
  );
  return res.json();
}

// ── GET — webhook verification ─────────────────────────────────────
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Meta webhook verified');
    return new NextResponse(challenge, { status: 200 });
  }
  return new NextResponse('Forbidden', { status: 403 });
}

// ── POST — inbound messages ────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const entry = body?.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const messages = value?.messages;

    if (!messages?.length) {
      return NextResponse.json({ status: 'no_messages' });
    }

    for (const msg of messages) {
      if (msg.type !== 'text') continue;

      const from = msg.from; // e.g. "447835235980"
      const text = msg.text?.body?.trim().toUpperCase() ?? '';

      // Look up protocol
      const protocol = PROTOCOLS[text] ?? PROTOCOLS['MENU'];

      // Send response
      await sendMessage(from, protocol);

      console.log(`Meta WA: ${from} sent "${text}" → responded`);
    }

    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    console.error('Meta webhook error:', err);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}
