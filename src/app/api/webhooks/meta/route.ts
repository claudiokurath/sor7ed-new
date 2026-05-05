import { NextRequest, NextResponse } from 'next/server';
import { adminClient } from '@/lib/supabase';

const VERIFY_TOKEN = process.env.META_WEBHOOK_VERIFY_TOKEN ?? 'sor7ed_meta_webhook_2026';
const WHATSAPP_TOKEN = process.env.META_WHATSAPP_TOKEN!;
const PHONE_NUMBER_ID = process.env.META_PHONE_NUMBER_ID!;

async function isRegisteredUser(number: string): Promise<boolean> {
  try {
    const supabase = adminClient();
    const normalised = '+' + number.replace(/^\+/, '');
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .or(`phone.eq.${normalised},whatsapp.eq.${normalised}`)
      .limit(1);
    if (error) { console.error('Supabase error:', error.message); return false; }
    return (data?.length ?? 0) > 0;
  } catch (e) {
    console.error('isRegisteredUser failed:', e);
    return false;
  }
}

async function sendMessage(to: string, body: string) {
  await fetch(`https://graph.facebook.com/v25.0/${PHONE_NUMBER_ID}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ messaging_product: 'whatsapp', to, type: 'text', text: { body } }),
  });
}

const PROTOCOLS: Record<string, string> = {
  TRIAGE: `*EXECUTIVE FUNCTION TRIAGE*\n\nStep 1 — Name the block\nWrite: "I can't start because..."\n\nStep 2 — Shrink the task\nWhat is the tiniest first physical action?\n\nStep 3 — 2-minute timer\nDo anything related. Badly. No pressure.\n\nStep 4 — Remove one input\nClose a tab. Silence a notification.\n\nStep 5 — One anchor\nWhat is the ONE thing that must happen today?`,
  WILLPOWER: `*WILLPOWER PROTOCOL*\n\nWillpower depletes. Systems don't.\n\n→ Stop forcing it\n→ Remove the decision entirely — automate, delegate, or eliminate\n→ Change your environment instead of fighting yourself\n→ Under 2 minutes? Do it right now.\n\nThis week: identify 3 things you're using willpower for that a system could handle. Build one.`,
  INITIATION: `*TASK INITIATION PROTOCOL*\n\nThis is dopamine and activation — not laziness.\n\n→ Open the thing. Don't do it. Just open it.\n→ Set a 2-minute timer\n→ Write one sentence about the task\n→ Stop when the timer ends\n\nStarting badly beats not starting.`,
  OVERWHELM: `*OVERWHELM RESET*\n\n→ Stop trying to prioritise\n→ Write EVERYTHING in your head onto paper\n→ Pick the ONE task that makes everything else feel less urgent\n→ Do only that\n\nEmpty the buffer first. Sort after.`,
  BURNOUT: `*BURNOUT RECOVERY*\n\nRight now:\n→ Stop the output. Cancel one thing today.\n→ Remove stimulation — screens, news, noise\n→ Basic inputs only: sleep, food, daylight, movement\n\nThis week:\n→ One task per day max\n→ Talk to your GP if this has lasted weeks\n\nRecovery is measured in weeks, not days.`,
  SLEEP: `*SLEEP PROTOCOL*\n\nTonight:\n→ Set your fixed wake time now\n→ Brain dump onto paper before bed\n→ Devices down 30 mins before sleep\n→ Boring on purpose — rewatch something familiar\n\nThis week:\n→ 10 mins outside within 30 mins of waking\n→ Review medication timing with your GP`,
  MONEY: `*ADHD BUDGET PROTOCOL*\n\n→ Open your bank app — highlight every recurring charge\n→ Cancel anything unused in 30 days\n→ Automate all bills via direct debit\n→ One separate account for bills only\n→ Non-essential purchase over £30? Wait 48 hours first.`,
  SHAME: `*SHAME SPIRAL INTERRUPT*\n\n→ Name it: "I'm in the spiral"\n→ Separate you from the behaviour\n→ 2-minute engage: touch the avoided thing — don't finish it\n→ Shrink it: what is the tiniest first step?\n\nShame is not a productivity tool. It's a brake.`,
  FEELINGS: `*EMOTIONAL REGULATION*\n\nRight now:\n→ Name it: "This is RSD. This feeling is disproportionate."\n→ Delay your response — 20 minutes minimum\n→ Reality test: what are 3 other explanations?\n\nReset:\n→ Inhale twice, long slow exhale\n→ Cold water on your wrists\n→ 5 minutes outside`,
  PLAN: `*PLAN AHEAD PROTOCOL*\n\nStep 1: 3 tasks only. Not 10. Three.\nStep 2: Assign each to a time slot — not a list.\nStep 3: Start with the stupidest smallest step.`,
  FOCUS: `*FOCUS PROTOCOL*\n\n→ 20 mins aerobic exercise first\n→ Cold water on your face\n→ All notifications off for the next hour\n→ One tab. One task. One timer.\n\nExercise is the legal version of your ADHD medication.`,
  MOVE: `*MOVEMENT PROTOCOL*\n\nPut on shoes. Step outside. Walk fast for 10 minutes.\n\nThat is the entire protocol.\n\nDo it before screens — not after. 20 minutes of aerobic activity gives you 2-4 hours of meaningfully better brain function.`,
  SCREEN: `*SCREEN PROTOCOL*\n\n→ Delete the worst app from your phone (not limit — delete)\n→ Charger outside the bedroom tonight\n→ Decide one specific thing to do instead of scrolling\n\nYou cannot out-discipline an algorithm. Build structural friction instead.`,
  PATTERN: `*SELF-SABOTAGE INTERRUPT*\n\n→ Name the urge: "I want to [quit/blow up/disappear] because..."\n→ Do not act on it for 24 hours\n→ Call it a review period, not a prohibition\n\nThe pattern only breaks when you see it coming.`,
  CONNECT: `*CONNECTION PROTOCOL*\n\n→ Pick one person. The easiest one. No pressure.\n→ Send something small — "Hey, been in my head. How are you?"\n→ A reaction counts. A voice note counts.\n\nYou don't need a full social event. One message.`,
  RELATE: `*RELATIONSHIP PROTOCOL*\n\n→ Talk about the hyperfocus-withdrawal cycle outside of conflict\n→ Name one sensory preference without apologising for it\n→ Create one repair ritual for after arguments\n\nThe pattern isn't personal. It's neurological. And it's fixable.`,
  TALK: `*COMMUNICATION PROTOCOL*\n\n→ One breath before speaking in any high-stakes conversation\n→ Write it first, say it second for anything important\n→ "I notice I want to say something. Is now a good time?"\n\nPost-blurt: "I said that badly — can I try again?" is a complete recovery.`,
  MASK: `*UNMASKING PROTOCOL*\n\n→ Identify one context where you mask the heaviest\n→ Find one safe space where you don't have to\n→ Drop one trait in your safe space this week\n\nYou're not broken. You were performing for an audience that didn't deserve the show.`,
  NEWME: `*LATE DIAGNOSIS PROTOCOL*\n\n→ Let the emotions happen. Relief, grief, anger — all valid.\n→ Write: "This explains..."\n→ Find a late-diagnosis community — people who get it\n→ Book a medication assessment if you haven't\n\nYou're not starting over. You're starting with better information.`,
  HOME: `*HOME RESET PROTOCOL*\n\n→ Set a 10-minute timer\n→ Reduce the worst 3 surfaces only\n→ Stop when the timer goes — not when it's "done"\n\nThis week:\n→ Replace one closed storage with open storage\n→ One spot per category — everything goes there\n\nFunctional is the target. Not tidy.`,
  TIME: `*TIME BLINDNESS PROTOCOL*\n\n→ Set an alarm for your next transition — not just the event, the departure\n→ Add 50% to whatever you think something will take\n\nThis week:\n→ Time your morning routine once — know exactly how long it takes\n→ Alarms for: wake, leave, wrap up, wind down\n\nExternal clocks replace the internal one you don't have.`,
  DOPAMINE: `*DOPAMINE MENU*\n\nPick one right now:\nCold water on face · 10 jumping jacks · One song you love · Message someone you like · Step outside for 2 minutes\n\nBuild your personal list:\n→ 10 sources of genuine reward\n→ At least 3 that work in under 5 minutes\n→ When the urge hits — list first.`,
  CALM: `*SELF-MEDICATION PROTOCOL*\n\n→ Name what the substance is doing for you: focus? calm? connection?\n→ That tells you what your brain actually needs\n\nThis week:\n→ Get assessed for ADHD if you haven't\n→ Tell your GP: "I use X because it helps me Y"\n→ Harm reduction first — you don't have to quit to start improving`,
  SENSORY: `*SENSORY PROTOCOL*\n\n→ Identify the loudest sensory input in your environment right now\n→ Remove or reduce it — headphones, dimmer light, move rooms\n→ 10 minutes of low-input recovery\n\nThis week:\n→ Build a go-kit: headphones, sunglasses, one comfort item\n→ "I work better with X" is a complete professional request`,
  MEDS: `*MEDICATION PROTOCOL*\n\n→ Eat before meds kick in — liquid calories if needed\n→ Set a wrap-up alarm 1 hour before your comedown\n→ Water at 3pm\n\nIf you're crashing:\n→ "This is dopamine dropping, not my life falling apart"\n→ No big decisions in the comedown window\n→ Low-stimulation evening on purpose`,
  ISOLATED: `*ISOLATION RESET*\n\n→ Write: "I've been isolating for approximately [x] days"\n→ Pick one person — the easiest one\n→ Send something small. A reaction counts.\n→ Move first — even 5 minutes outside\n\nYou don't have to feel ready. You just have to do it badly.`,
  TIRED: `*SLEEP DEPRIVATION PROTOCOL*\n\n→ Accept impairment — plan for reduced capacity today\n→ Triage ruthlessly: what are the absolute non-negotiables?\n→ 10-20 minute nap if possible (set an alarm — not more)\n→ Caffeine in small doses throughout the day, not one large hit\n→ Ask for one specific thing from one specific person`,
  ENERGY: `*ENERGY BUDGETING PROTOCOL*\n\n→ Morning audit: 1-10, what's your energy today?\n→ Plan to spend 60% of it — not 100%\n→ Batch tasks by energy cost: high-cost in your best window\n→ Rest before you need it, not after you've crashed\n→ Communicate your capacity: "I have limited energy today" is enough`,
  JOBLOSS2: `*JOB LOSS — FIRST 72 HOURS*\n\n→ Get written confirmation of the dismissal or redundancy\n→ Claim Universal Credit or JSA today — not next week\n→ Check your redundancy entitlement (2+ years service)\n→ Contact HMRC — you may be owed a tax refund\n→ Pause non-essential direct debits\n→ Tell three people you trust`,
  BREAKUP: `*BREAKUP ADMIN*\n\nMoney first:\n→ Joint accounts: notify the bank\n→ Joint credit cards: check the balance — you're both liable\n→ Direct debits: redirect each one\n\nHousing:\n→ Check whose name is on the tenancy\n→ Transfer utilities out of their name\n\nDigital:\n→ Change passwords on everything\n→ Remove shared location sharing`,
  HEALTH: `*HEALTH ANXIETY PROTOCOL*\n\n→ 72-hour rule: wait 72 hours before Googling any symptom\n→ If it persists, book a GP — not forums\n→ One search maximum: NHS.uk only\n→ No reassurance from non-medical sources\n→ Book the appointment — the worry of not knowing is worse\n→ Ask your GP about CBT for health anxiety`,
  INBOX: `*INBOX RESET*\n\nOne time only:\n→ Create folder: "Archive Pre-[today]"\n→ Select all old emails → move to archive\n→ Inbox is now empty\n→ Nothing is lost — everything is searchable\n\nNew system:\n→ Action needed: leave in inbox\n→ Read, no action: archive\n→ Not relevant: delete or unsubscribe`,
  FEES: `*LATE FEES PROTOCOL*\n\n→ Open everything — all letters, all emails, today\n→ Triage: Red (legal consequences 7 days) / Orange (30 days) / Yellow (rest)\n→ Make minimum contact for Red and Orange today\n→ Set up autopay for everything possible\n→ Create a financial calendar with reminders 3 days before each payment`,
  DEBT2: `*DEBT PROTOCOL*\n\n→ List every debt: who, how much, type\n→ Priority first: rent, council tax, utilities, court fines\n→ Call — don't write. Ask for a payment plan.\n→ "I'm in financial difficulty and would like to set up a payment plan" is enough\n→ Free help: StepChange (stepchange.org) or National Debtline`,
  TOXIC: `*TOXIC WORKPLACE PROTOCOL*\n\n→ Start a private log today (personal email only)\n→ Record: date, what was said/done, who was present\n→ Save evidence: screenshot emails and messages\n→ Note patterns — repetition defines bullying legally\n→ Contact ACAS (acas.org.uk) for free advice\n→ If your health is affected: GP referral to occupational health`,
  BENEFITS: `*BENEFITS CHECK*\n\n→ Check your entitlement: entitledto.co.uk or turn2us.org.uk\n→ PIP: call 0800 917 2222 to start a claim\n→ Access to Work: DWP grant for disabled people in work — often unclaimed\n→ Get help filling in forms: Citizens Advice\n→ A refusal is not the end — 68% of PIP decisions overturned at tribunal`,
  RETURN: `*RETURN TO WORK PROTOCOL*\n\n→ Get a GP fit note saying "may be fit for work with adjustments"\n→ Come with a proposal: weeks 1-4, what hours, what adjustments\n→ Identify what caused the burnout — the phased return should address it\n→ Protect your recovery practices as you return\n→ Agree a relapse plan in writing before you go back`,
  GRIEF: `*GRIEF ADMIN — ORDER OF OPERATIONS*\n\nWithin 5 days:\n→ Register the death (legally required)\n→ Order minimum 6 certified death certificates\n\nWithin 2 weeks:\n→ Tell the DWP immediately\n→ Notify the bank\n→ Use Tell Us Once: gov.uk/tell-us-once\n\nGive yourself permission to delegate the paperwork.`,
  IMMIGRATION: `*IMMIGRATION CHECKLIST*\n\n→ Start early — processing times are unpredictable\n→ Read gov.uk first, not forums\n→ Document everything twice: original and certified copy\n→ Record every communication: date, time, name\n→ Get regulated help: OISC adviser or ILPA solicitor\n→ Never use unregulated "immigration consultants"`,
  HOUSING: `*HOUSING CRISIS PROTOCOL*\n\n→ Contact your local council housing team today — not when evicted\n→ Don't ignore court documents — ever\n→ Contact Shelter: shelter.org.uk — free legal housing advice\n→ If HB stopped: call your council immediately\n→ Speak to your landlord directly — most prefer a payment plan to eviction`,
  RECOVERY: `*RECOVERY LIFE STRUCTURE*\n\nDaily:\n→ Fixed wake time\n→ One recovery activity\n→ Movement\n→ Regular meals\n\nPriorities in early recovery:\n→ Housing stability first\n→ GP registration\n→ Benefits — claim what you're owed\n→ Employment waits until foundation is built`,
  PARENT: `*SINGLE PARENT PROTOCOL*\n\nWeekly reset (Sunday, 20 mins):\n→ Check school calendar\n→ Pack Monday bags\n→ Plan meals roughly\n→ Review any forms due\n\nAsk for specific help — not general offers.\n"Can you collect on Thursdays?" is a complete sentence.`,
  CARER: `*CARER PROTOCOL*\n\nMedication list: name, dose, frequency, prescribing GP. Copy with them, copy with you.\n\nYour rights:\n→ Carer's Assessment — request from your local council\n→ Carer's Allowance if 35+ hours/week\n→ Register as a carer with your GP\n→ Carers UK helpline: 0808 808 7777`,
  TAX: `*SELF-ASSESSMENT PROTOCOL*\n\nGather first:\n→ Government Gateway login\n→ National Insurance number\n→ P60 or P45\n→ Bank statements for self-employed income\n→ Receipts for allowable expenses\n\nDeadline: 31 January online.\nLate filing = £100 penalty immediately.\nCan't pay? Arrange a payment plan with HMRC.`,
  FOOD: `*FOOD AND MONEY PROTOCOL*\n\n£5 emergency base per person per week:\n→ Oats (500g)\n→ Eggs (12)\n→ Bread\n→ Tinned tomatoes (3)\n→ Pasta or rice (500g)\n\nResources:\n→ Trussell Trust foodbanks: trusselltrust.org\n→ OLIO app: free local food\n→ Community Fridge Network: communityfridgenetwork.org`,
  EMAIL: `*EMAIL PROTOCOL*\n\n→ Open. Don't think. Type whatever you know.\n→ The three things: what they need to know / what you need / what happens next\n→ One read-through. Fix obvious errors only.\n→ Send. Not "save draft." Send.\n\nFor guilt emails: "I apologise for the delayed response — I've had a lot on." That's it. Send.`,
};

// ── GET — webhook verification ─────────────────────────────
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

// ── POST — inbound messages ────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body?.entry?.[0]?.changes?.[0]?.value?.messages;
    if (!messages?.length) return NextResponse.json({ status: 'no_messages' });

    for (const msg of messages) {
      if (msg.type !== 'text') continue;

      const from = msg.from;
      const text = msg.text?.body?.trim().toUpperCase().replace(/[^A-Z0-9]/g, '') ?? '';

      // ── AUTH CHECK — must be registered ──────────────────
      const registered = await isRegisteredUser(from);

      if (!registered) {
        await sendMessage(from,
          `Hi! To receive SOR7ED protocols you need a free account first.\n\nSign up at:\nhttps://sor7ed.com/signup\n\nTakes 30 seconds. Then come back and send your keyword.`
        );
        console.log(`Unregistered user ${from} sent "${text}" — sent signup link`);
        continue;
      }

      // ── REGISTERED — send protocol ────────────────────────
      const protocol = PROTOCOLS[text];

      if (protocol) {
        await sendMessage(from, protocol);
        console.log(`✅ ${from} → ${text}`);
      } else {
        // Unknown keyword — don't send menu, just a gentle nudge
        await sendMessage(from,
          `We don't have a protocol for "${msg.text?.body?.trim()}" yet.\n\nVisit sor7ed.com/blog to find your keyword, then send it here.`
        );
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}
