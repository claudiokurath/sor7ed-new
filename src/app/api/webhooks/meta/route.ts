import { NextRequest, NextResponse } from 'next/server';

const VERIFY_TOKEN = process.env.META_WEBHOOK_VERIFY_TOKEN ?? 'sor7ed_meta_webhook_2026';
const WHATSAPP_TOKEN = process.env.META_WHATSAPP_TOKEN!;
const PHONE_NUMBER_ID = process.env.META_PHONE_NUMBER_ID!;

const PROTOCOLS: Record<string, string> = {
  TRIAGE: `*EXECUTIVE FUNCTION TRIAGE PROTOCOL*\n\nYou sent TRIAGE. Here's your reset:\n\n*Step 1 — Name the block*\nWrite one sentence: "I can't start because..."\n\n*Step 2 — Shrink the task*\nWhat is the tiniest possible first move? Not the task — the first physical action.\n\n*Step 3 — 2-minute timer*\nSet it. Do anything related to the task. Badly. Without pressure.\n\n*Step 4 — Remove one input*\nClose a tab. Silence a notification. One less thing.\n\n*Step 5 — Name your next anchor*\nWhat is the ONE thing that needs to happen today? Only one.\n\n---\nReply MENU to see all protocols.`,

  WILLPOWER: `*WILLPOWER PROTOCOL*\n\nWillpower is a finite resource — and ADHD brains start with less of it.\n\n*The problem:* You're using willpower to compensate for missing executive function. That's the wrong tool.\n\n*Right now:*\n→ Stop trying to force it\n→ Remove the decision — automate, delegate, or eliminate the task\n→ Change the environment instead of fighting yourself\n→ Use the 2-minute rule: if it takes less than 2 mins, do it now\n\n*This week:*\n→ Identify 3 things you're using willpower for that a system could handle\n→ Build one of those systems today\n\nWillpower depletes. Systems don't.\n\n---\nReply MENU to see all protocols.`,

  INITIATION: `*TASK INITIATION PROTOCOL*\n\nYour brain won't start. This is dopamine and activation — not laziness.\n\n*Do this now:*\n→ Open the thing. Don't do it. Just open it.\n→ Set a 2-minute timer\n→ Type or write one sentence about the task\n→ Stop when the timer ends\n\nStarting badly beats not starting.\n\n---\nReply MENU to see all protocols.`,

  OVERWHELM: `*OVERWHELM RESET PROTOCOL*\n\nYour working context is saturated.\n\n*Do this now:*\n→ Stop trying to prioritise\n→ Write EVERYTHING in your head onto paper — get it out\n→ Pick the ONE task that makes everything else feel less urgent\n→ Do only that\n\nEmpty the buffer first. Sort after.\n\n---\nReply MENU to see all protocols.`,

  BURNOUT: `*BURNOUT RECOVERY PROTOCOL*\n\nThis isn't tiredness. This is a neurological resource crash.\n\n*Right now:*\n→ Stop the output. Cancel one thing today.\n→ Remove stimulation — screens, news, noise\n→ Basic inputs only: sleep, food, daylight, movement\n\n*This week:*\n→ One task per day max\n→ No optimising. Just functioning.\n→ Talk to your GP if this has lasted weeks\n\nRecovery is measured in weeks, not days.\n\n---\nReply MENU to see all protocols.`,

  SLEEP: `*SLEEP PROTOCOL*\n\nADHD disrupts sleep at multiple levels. Here's the fix:\n\n*Tonight:*\n→ Fixed wake time tomorrow — set it now\n→ Brain dump: write everything in your head onto paper\n→ Devices down 30 mins before bed (alarm, not willpower)\n→ Boring on purpose — rewatch something familiar\n\n*This week:*\n→ 10 mins outside within 30 mins of waking\n→ Review your medication timing with your GP\n\n---\nReply MENU to see all protocols.`,

  MONEY: `*ADHD BUDGET PROTOCOL*\n\nThe ADHD tax is real. Here's how to stop paying it:\n\n*This week:*\n→ Open your bank app — highlight every recurring charge\n→ Cancel anything unused in 30 days\n→ Automate all bills via direct debit\n→ Create one account for bills only\n\n*Rule:*\nAny non-essential purchase over £30 — wait 48 hours. Most won't survive the wait.\n\n---\nReply MENU to see all protocols.`,

  SHAME: `*SHAME SPIRAL INTERRUPT*\n\nShame doesn't motivate ADHD brains. It paralyses them.\n\n*Right now:*\n→ Name it: "I'm in the spiral"\n→ Separate you from the behaviour: you're not bad, you have ADHD\n→ The 2-minute engage: do 2 mins on the avoided thing — not to finish it, just to touch it\n→ Shrink it: what is the tiniest first step?\n\nShame is not a productivity tool.\n\n---\nReply MENU to see all protocols.`,

  FEELINGS: `*EMOTIONAL REGULATION PROTOCOL*\n\nRSD hit? Emotions overwhelming? Here's your toolkit:\n\n*Right now:*\n→ Name it out loud: "This is RSD. This feeling is disproportionate."\n→ Delay the response — do not send the message for 20 mins\n→ Reality test: what's the actual evidence? 3 other explanations?\n\n*Physiological reset:*\n→ Inhale twice, long slow exhale (physiological sigh)\n→ Cold water on wrists\n→ 5 mins outside\n\n---\nReply MENU to see all protocols.`,

  PLAN: `*PLAN AHEAD PROTOCOL*\n\n3 steps. That's it.\n\n*Step 1 — The 3-task rule*\nIdentify only 3 things that must happen today. Not 10. Three.\n\n*Step 2 — Time-box, don't to-do*\nAssign each task to a time slot. Lists are graveyards for intentions.\n\n*Step 3 — Start with the stupidest small step*\nNot "write the report" — "open the document."\n\n---\nReply MENU to see all protocols.`,

  FOCUS: `*FOCUS PROTOCOL*\n\nNicotine helps ADHD focus — but there are safer ways to hit the same pathways.\n\n*Right now:*\n→ 20 mins aerobic exercise (this is the closest thing to a focus drug that's free)\n→ Cold water on your face\n→ Remove all notifications for the next hour\n→ One tab. One task. One timer.\n\n*This week:*\n→ Review your medication timing with your GP\n→ Try morning exercise before screens\n\n---\nReply MENU to see all protocols.`,

  MOVE: `*MOVEMENT PROTOCOL*\n\nExercise is ADHD medication. 20 minutes of aerobic activity changes your brain chemistry for 2-4 hours.\n\n*Right now:*\n→ Put on shoes. Step outside. Walk fast for 10 minutes.\n→ That's it. That's the protocol.\n\n*This week:*\n→ Do it before you start work — not after\n→ Make it interesting: podcast, music, a route you like\n→ Track how you feel 1 hour after. That data is motivating.\n\nYou don't need a gym. You need 20 minutes and a heartbeat.\n\n---\nReply MENU to see all protocols.`,

  SCREEN: `*SCREEN PROTOCOL*\n\nYou cannot out-discipline an algorithm. Build friction instead.\n\n*Right now:*\n→ Delete the worst app from your phone (not limit — delete)\n→ Move your phone charger outside the bedroom\n→ Set one specific thing to do instead of scrolling tonight\n\n*This week:*\n→ Social media via browser only — the extra step breaks the reflex\n→ 20-minute intentional use with a timer\n→ Ask: what am I avoiding? That's the real work.\n\n---\nReply MENU to see all protocols.`,

  PATTERN: `*SELF-SABOTAGE INTERRUPT*\n\nSee the pattern. Name it. Pause before it lands.\n\n*Right now:*\n→ Name the urge: "I want to [quit/blow up/disappear] because..."\n→ Do not act on it for 24 hours\n→ Call it a review period, not a prohibition\n\n*This week:*\n→ List 3 times you've done this before\n→ What did the urge feel like beforehand? Name that feeling — it's your early warning signal\n\nThe pattern only breaks when you see it coming.\n\n---\nReply MENU to see all protocols.`,

  CONNECT: `*CONNECTION PROTOCOL*\n\nNeurodivergent connection works differently. Stop trying to be good at small talk.\n\n*Right now:*\n→ Pick one person you've been meaning to message\n→ Send something — ugly, short, imperfect\n→ "Been thinking about you. How are you?" is enough\n\n*This week:*\n→ Find one context where depth is normal (interest group, online community)\n→ One relationship at a time — breadth is exhausting, depth is nourishing\n\n---\nReply MENU to see all protocols.`,

  RELATE: `*RELATIONSHIP PROTOCOL*\n\nADHD affects intimacy in predictable ways. Naming them changes everything.\n\n*Right now:*\n→ Talk about the hyperfocus-withdrawal cycle — outside of a conflict moment\n→ Name one sensory preference without apology\n→ Create one repair ritual for after conflict\n\n*This week:*\n→ Build novelty into the relationship deliberately\n→ Consider couples therapy with an ADHD-informed therapist\n\nThe pattern isn't personal. It's neurological. And it's fixable.\n\n---\nReply MENU to see all protocols.`,

  TALK: `*COMMUNICATION PROTOCOL*\n\nThe filter is slow. The mouth is fast. Here's the gap.\n\n*Right now:*\n→ One breath before speaking in any high-stakes conversation\n→ If it's important — write it first, say it second\n→ "I notice I want to say something. Is now a good time?" — use this\n\n*After a blurt:*\n→ "I said that badly — can I try again?" is a complete recovery sentence\n\nThe goal isn't silence. It's a pause long enough for the brain to catch up.\n\n---\nReply MENU to see all protocols.`,

  MASK: `*UNMASKING PROTOCOL*\n\nThe performance is exhausting. Here's how to start taking it off — safely.\n\n*Right now:*\n→ Identify one context where you mask the heaviest\n→ Identify one safe space where you don't have to\n\n*This week:*\n→ Drop one trait in your safe space. Notice how it feels.\n→ Don't go zero to naked — selective unmasking is valid\n→ Let yourself grieve the years of performance. That's real.\n\nYou are not broken. You were performing for an audience that didn't deserve the show.\n\n---\nReply MENU to see all protocols.`,

  NEWME: `*LATE DIAGNOSIS PROTOCOL*\n\nYou just got a new map. Here's how to use it.\n\n*Right now:*\n→ Let the emotions happen. Relief, grief, anger — all valid. Don't rush to "okay."\n→ Write one sentence: "This explains..."\n\n*This week:*\n→ Find a late-diagnosis community online — people who get it\n→ Book a medication assessment if you haven't\n→ Request workplace accommodations — you have the right now\n\nYou're not starting over. You're starting with better information.\n\n---\nReply MENU to see all protocols.`,

  HOME: `*HOME RESET PROTOCOL*\n\nVisible storage. One-decision zones. Lower the bar.\n\n*Right now:*\n→ Set a 10-minute timer\n→ Reduce the worst 3 surfaces only\n→ Stop when the timer goes — not when it's "done"\n\n*This week:*\n→ Replace one closed storage with open storage\n→ Designate one spot per category of thing — everything goes there\n→ Body double for cleaning: call someone or put on a video\n\nFunctional is the target. Not tidy.\n\n---\nReply MENU to see all protocols.`,

  TIME: `*TIME BLINDNESS PROTOCOL*\n\nYou can't fix the internal clock. You can install external ones everywhere.\n\n*Right now:*\n→ Set an alarm for your next transition — not just the event, the departure\n→ Add 50% to whatever you think something will take\n\n*This week:*\n→ Time your morning routine once — know exactly how long it takes\n→ Get a visual timer (Time Timer app or physical)\n→ Alarms for: wake up, leave, wrap up, wind down\n\nTime blindness isn't disrespect. It's a perception gap. External structure fills it.\n\n---\nReply MENU to see all protocols.`,

  DOPAMINE: `*DOPAMINE MENU PROTOCOL*\n\nYour brain needs dopamine. Give it safer sources.\n\n*Right now:*\n→ Pick one from this list:\n   Cold water on face · 10 jumping jacks · Put on a song you love · Message someone you like · Step outside for 2 mins\n\n*Build your personal menu:*\n→ List 10 things that give you a genuine hit\n→ Include at least 3 that work in under 5 minutes\n→ When the urge hits — open the menu first\n\nYou're not fighting the need. You're redirecting it.\n\n---\nReply MENU to see all protocols.`,

  CALM: `*SELF-MEDICATION PROTOCOL*\n\nIf you're using substances to cope — this isn't weakness. It's an undertreated brain finding its own pharmacy.\n\n*Right now:*\n→ Name what the substance is doing for you: focus? calm? sleep? connection?\n→ That tells you what your brain actually needs\n\n*This week:*\n→ Get assessed for ADHD if you haven't — this changes the calculation\n→ Harm reduction first — you don't have to quit to start improving\n→ Tell your GP the full picture: "I use X because it helps me Y"\n\nMedication isn't trading one drug for another. It's treating the root.\n\n---\nReply MENU to see all protocols.`,

  SENSORY: `*SENSORY PROTOCOL*\n\nYour environment is consuming resources your brain needs for everything else.\n\n*Right now:*\n→ Identify the loudest sensory input in your current environment\n→ Remove or reduce it — headphones, dimmer light, move rooms\n→ Give yourself 10 minutes of low-input recovery\n\n*This week:*\n→ Do a sensory audit: what drains you fastest?\n→ Build a go-kit: headphones, sunglasses, comfort item\n→ Advocate: "I work better with X" is a complete professional request\n\n---\nReply MENU to see all protocols.`,

  MEDS: `*MEDICATION PROTOCOL*\n\nMeds work. The crash is manageable. Here's the system.\n\n*Right now:*\n→ Eat before meds kick in — liquid calories if you have no appetite\n→ Set a "wrap up" alarm 1 hour before your expected comedown\n→ Water at 3pm\n\n*If you're crashing:*\n→ Label it: "This is dopamine dropping, not my life falling apart"\n→ No big decisions in the comedown window\n→ Low-stimulation evening on purpose\n\n*This week:*\n→ Review timing with your prescriber\n→ Never skip meds on hard days — that's when you need them most\n\n---\nReply MENU to see all protocols.`,

  MENU: `*SOR7ED PROTOCOL MENU*\n\nReply with any keyword:\n\n🧠 TRIAGE — Executive function reset\n⚡ INITIATION — Can't start anything\n🌊 OVERWHELM — Everything feels urgent\n🔥 BURNOUT — Running on empty\n😴 SLEEP — Can't wind down or wake up\n💸 MONEY — ADHD tax and budget chaos\n🌀 SHAME — Guilt spiral eating your day\n❤️ FEELINGS — RSD and emotional overwhelm\n📅 PLAN — Paralysed by your task list\n💪 WILLPOWER — Building better systems\n🎯 FOCUS — Sharpen attention now\n🏃 MOVE — Exercise as brain fuel\n📱 SCREEN — Break the doom scroll\n🔄 PATTERN — Interrupt self-sabotage\n🤝 CONNECT — Build real connection\n💑 RELATE — ADHD and relationships\n💬 TALK — Verbal impulsivity help\n🎭 MASK — Safe unmasking steps\n🆕 NEWME — Late diagnosis guide\n🏠 HOME — ADHD clutter reset\n⏰ TIME — Time blindness fix\n⚡ DOPAMINE — Safer dopamine sources\n🍃 CALM — Self-medication support\n👂 SENSORY — Sensory overwhelm reset\n💊 MEDS — Medication crash protocol\n\n---\nsor7ed.com · No app. No spam. Just what works.`,
};

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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }
  return new NextResponse('Forbidden', { status: 403 });
}

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

      const from = msg.from;
      const text = msg.text?.body?.trim().toUpperCase().replace(/[^A-Z]/g, '') ?? '';

      const protocol = PROTOCOLS[text] ?? `*SOR7ED*\n\nWe don't have a protocol for "${msg.text?.body?.trim()}" yet.\n\nReply *MENU* to see all available protocols.\n\n---\nsor7ed.com`;

      await sendMessage(from, protocol);
      console.log(`Meta WA: ${from} sent "${text}" → responded`);
    }

    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    console.error('Meta webhook error:', err);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}
