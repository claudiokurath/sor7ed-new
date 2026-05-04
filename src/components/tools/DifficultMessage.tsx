'use client';
import { useState } from 'react';
import Link from 'next/link';

const SCENARIOS = [
  { id: 'boundary',   label: 'Setting a boundary',        emoji: '🛑' },
  { id: 'apology',    label: 'Apologising for something',  emoji: '🙏' },
  { id: 'followup',   label: 'Following up / chasing',     emoji: '📬' },
  { id: 'pushback',   label: 'Pushing back / disagreeing', emoji: '✋' },
  { id: 'checkin',    label: 'Checking in on someone',     emoji: '💛' },
];

const TONES = [
  { id: 'warm',    label: 'Warm & kind' },
  { id: 'firm',    label: 'Firm & direct' },
  { id: 'neutral', label: 'Neutral & professional' },
];

const AUDIENCES = [
  { id: 'partner',   label: 'Partner / spouse' },
  { id: 'friend',    label: 'Friend' },
  { id: 'family',    label: 'Family member' },
  { id: 'colleague', label: 'Colleague' },
  { id: 'manager',   label: 'Manager / boss' },
  { id: 'service',   label: 'Company / service' },
];

type Draft = { label: string; body: string; short: string };

function generateDrafts(scenario: string, tone: string, audience: string, context: string): Draft[] {
  const s = SCENARIO_COPY[scenario] || SCENARIO_COPY['boundary'];
  const t = TONE_MOD[tone] || TONE_MOD['neutral'];
  const a = AUDIENCE_MOD[audience] || AUDIENCE_MOD['colleague'];
  const ctx = context.trim();

  return s.drafts.map((draft, i) => ({
    label: draft.label,
    body: draft.body(t, a, ctx),
    short: draft.short(t, a, ctx),
  }));
}

const TONE_MOD: Record<string, { open: string; close: string; style: string }> = {
  warm:    { open: "I hope you're doing well.",          close: "Thanks so much for understanding.",    style: "gentle and caring"    },
  firm:    { open: "I want to be direct with you.",      close: "I appreciate your understanding.",     style: "clear and assertive"  },
  neutral: { open: "I wanted to reach out about this.", close: "Thank you for your time.",              style: "calm and professional" },
};

const AUDIENCE_MOD: Record<string, { salutation: string; register: string }> = {
  partner:   { salutation: "Hey,",          register: "personal and honest"     },
  friend:    { salutation: "Hey,",          register: "casual and warm"         },
  family:    { salutation: "Hi,",           register: "caring and direct"       },
  colleague: { salutation: "Hi,",           register: "professional and clear"  },
  manager:   { salutation: "Hi [Name],",    register: "respectful and concise"  },
  service:   { salutation: "To whom it may concern,", register: "formal and factual" },
};

const SCENARIO_COPY: Record<string, {
  drafts: Array<{ label: string; body: (t: any, a: any, ctx: string) => string; short: (t: any, a: any, ctx: string) => string }>;
}> = {
  boundary: {
    drafts: [
      {
        label: "Direct & clear",
        body:  (t, a, ctx) => `${a.salutation}\n\n${t.open}\n\nI need to be honest about something that matters to me.${ctx ? ` ${ctx}.` : ''} Going forward, I'm not able to continue as things have been — I need [specific boundary here].\n\nThis isn't about blame. It's about what I need to function well.\n\n${t.close}`,
        short: (t, a, ctx) => `${a.salutation} I need to set a boundary around [topic]${ctx ? ` — ${ctx}` : ''}. Can we talk?`,
      },
      {
        label: "Soft but firm",
        body:  (t, a, ctx) => `${a.salutation}\n\n${t.open}\n\nI've been thinking about how to say this in a way that's honest and respectful.${ctx ? ` ${ctx}.` : ''} I care about our relationship, and that's exactly why I need to ask for something different: [specific need].\n\nI'd love to talk through this together.\n\n${t.close}`,
        short: (t, a, ctx) => `Can we chat? I want to talk about something that's been on my mind${ctx ? ` — ${ctx}` : ''}.`,
      },
      {
        label: "Written record version",
        body:  (t, a, ctx) => `${a.salutation}\n\nI'm writing this down so there's no ambiguity.${ctx ? ` ${ctx}.` : ''} My boundary is: [state it clearly]. I'm not open to negotiating on this right now, but I'm happy to discuss how we move forward within it.\n\n${t.close}`,
        short: (t, a, ctx) => `Just to be clear: [boundary]. Not negotiable right now. Happy to discuss how we work with it.`,
      },
    ],
  },
  apology: {
    drafts: [
      {
        label: "Full accountability",
        body:  (t, a, ctx) => `${a.salutation}\n\n${t.open}\n\nI owe you an apology.${ctx ? ` ${ctx}.` : ''} I got it wrong — I [what happened], and that wasn't okay. I'm not going to make excuses. I'm genuinely sorry, and I want to do better.\n\nIf you're open to it, I'd like to [make it right / talk it through].\n\n${t.close}`,
        short: (t, a, ctx) => `I'm sorry. I got it wrong${ctx ? ` — ${ctx}` : ''}. No excuses. I want to do better.`,
      },
      {
        label: "Repair-focused",
        body:  (t, a, ctx) => `${a.salutation}\n\n${t.open}\n\nI've been sitting with this and I know I need to reach out.${ctx ? ` ${ctx}.` : ''} I'm sorry for [what happened]. More than the apology, I want to understand the impact and figure out how to repair things between us.\n\nCan we talk?\n\n${t.close}`,
        short: (t, a, ctx) => `I'm sorry${ctx ? ` for ${ctx}` : ''}. Can we talk about how to repair this?`,
      },
      {
        label: "Simple & genuine",
        body:  (t, a, ctx) => `${a.salutation}\n\nI just wanted to say I'm sorry.${ctx ? ` ${ctx}.` : ''} I know words only go so far — I'll show it through how I show up going forward.\n\n${t.close}`,
        short: (t, a, ctx) => `I'm sorry${ctx ? ` — ${ctx}` : ''}. I'll do better.`,
      },
    ],
  },
  followup: {
    drafts: [
      {
        label: "Polite nudge",
        body:  (t, a, ctx) => `${a.salutation}\n\n${t.open}\n\nI just wanted to follow up on [topic]${ctx ? ` — ${ctx}` : ''}. I know things get busy — I'm just checking whether there's anything you need from me to move this forward.\n\n${t.close}`,
        short: (t, a, ctx) => `Following up on [topic]${ctx ? ` — ${ctx}` : ''}. Anything needed from my end?`,
      },
      {
        label: "Clear deadline",
        body:  (t, a, ctx) => `${a.salutation}\n\n${t.open}\n\nI'm following up on [topic]${ctx ? ` — ${ctx}` : ''}. I need a response by [date/time] to keep things on track. If that's not possible, let me know and we can figure out next steps.\n\n${t.close}`,
        short: (t, a, ctx) => `Quick chase on [topic]${ctx ? ` — ${ctx}` : ''}. Need to hear back by [date]. Thanks.`,
      },
      {
        label: "Escalation-ready",
        body:  (t, a, ctx) => `${a.salutation}\n\nThis is my [second/third] follow-up on [topic]${ctx ? ` — ${ctx}` : ''}. I haven't received a response yet and I need to resolve this urgently. Could you confirm receipt and let me know next steps?\n\n${t.close}`,
        short: (t, a, ctx) => `This is a follow-up on [topic]${ctx ? ` — ${ctx}` : ''}. Need a response urgently.`,
      },
    ],
  },
  pushback: {
    drafts: [
      {
        label: "Disagree & propose",
        body:  (t, a, ctx) => `${a.salutation}\n\n${t.open}\n\nI want to be honest — I see this differently.${ctx ? ` ${ctx}.` : ''} My concern is [concern]. I'd suggest an alternative: [your proposal]. Happy to talk through it.\n\n${t.close}`,
        short: (t, a, ctx) => `I see this differently${ctx ? ` — ${ctx}` : ''}. Can I suggest [alternative]?`,
      },
      {
        label: "Questions first",
        body:  (t, a, ctx) => `${a.salutation}\n\n${t.open}\n\nBefore I can agree, I have a few questions.${ctx ? ` ${ctx}.` : ''} [Question 1]. [Question 2]. I want to make sure I understand fully before moving forward.\n\n${t.close}`,
        short: (t, a, ctx) => `Before I agree, can I ask a couple of questions${ctx ? ` — ${ctx}` : ''}?`,
      },
      {
        label: "Hold the line",
        body:  (t, a, ctx) => `${a.salutation}\n\n${t.open}\n\nI've considered this carefully${ctx ? ` — ${ctx}` : ''}, and I have to respectfully decline / disagree. My position is [position]. I'm open to hearing more, but I wanted to be transparent about where I stand.\n\n${t.close}`,
        short: (t, a, ctx) => `I've thought about it and my position stands${ctx ? ` — ${ctx}` : ''}. Happy to discuss.`,
      },
    ],
  },
  checkin: {
    drafts: [
      {
        label: "Simple & warm",
        body:  (t, a, ctx) => `${a.salutation}\n\n${t.open}\n\nI've been thinking about you${ctx ? ` — ${ctx}` : ''} and just wanted to reach out. No pressure to respond with anything big — I just wanted you to know I'm here.\n\n${t.close}`,
        short: (t, a, ctx) => `Hey — just thinking of you${ctx ? ` — ${ctx}` : ''}. Hope you're okay. 💛`,
      },
      {
        label: "Offer specific help",
        body:  (t, a, ctx) => `${a.salutation}\n\n${t.open}\n\nI've been thinking about you${ctx ? ` — ${ctx}` : ''}. If there's anything I can do — even just a call, a coffee, or someone to vent to — I'm here. You don't have to carry it alone.\n\n${t.close}`,
        short: (t, a, ctx) => `Thinking of you${ctx ? ` — ${ctx}` : ''}. Here if you need anything — even just to talk.`,
      },
      {
        label: "Light touch",
        body:  (t, a, ctx) => `${a.salutation}\n\nJust a quick note${ctx ? ` — ${ctx}` : ''} — I'm thinking of you. No need to reply if you're not up to it. Just wanted you to know.\n\n${t.close}`,
        short: (t, a, ctx) => `Just thinking of you${ctx ? ` — ${ctx}` : ''}. No need to reply. 🤍`,
      },
    ],
  },
};

export default function DifficultMessage({
  signupHref,
  initiallyUnlocked = false,
}: {
  signupHref: string;
  initiallyUnlocked?: boolean;
}) {
  const [step, setStep] = useState<'scenario' | 'tone' | 'audience' | 'context' | 'result'>('scenario');
  const [scenario, setScenario] = useState('');
  const [tone, setTone] = useState('');
  const [audience, setAudience] = useState('');
  const [context, setContext] = useState('');
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [copied, setCopied] = useState<number | null>(null);
  const unlocked = initiallyUnlocked;

  function handleScenario(id: string) {
    setScenario(id);
    setStep('tone');
  }

  function handleTone(id: string) {
    setTone(id);
    setStep('audience');
  }

  function handleAudience(id: string) {
    setAudience(id);
    setStep('context');
  }

  function handleGenerate() {
    const d = generateDrafts(scenario, tone, audience, context);
    setDrafts(d);
    setStep('result');
  }

  function handleRestart() {
    setStep('scenario');
    setScenario('');
    setTone('');
    setAudience('');
    setContext('');
    setDrafts([]);
    setCopied(null);
  }

  async function handleCopy(text: string, idx: number) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(idx);
      setTimeout(() => setCopied(null), 2000);
    } catch {}
  }

  const progress = { scenario: 25, tone: 50, audience: 75, context: 90, result: 100 }[step] || 0;

  // RESULT
  if (step === 'result' && drafts.length > 0) {
    const scenarioLabel = SCENARIOS.find(s => s.id === scenario)?.label || '';
    const toneLabel = TONES.find(t => t.id === tone)?.label || '';
    const audienceLabel = AUDIENCES.find(a => a.id === audience)?.label || '';

    return (
      <div className="border-2 border-[#ffc107] p-6 md:p-8 mb-10">
        <p className="kicker mb-1">Difficult Message</p>
        <h2 className="display text-3xl text-[#ffc107] mb-1">3 drafts ready.</h2>
        <p className="text-xs opacity-50 mb-6 mono">{scenarioLabel} · {toneLabel} · {audienceLabel}</p>

        {/* Teaser — always show first draft short version */}
        <div className="border border-white/20 p-4 mb-4">
          <p className="kicker text-xs mb-2">Quick send version</p>
          <p className="text-sm leading-relaxed opacity-80">{drafts[0].short}</p>
        </div>

        {!unlocked ? (
          <div className="mt-6">
            <p className="text-sm mb-4 opacity-70">
              Your full result includes 3 tone-matched drafts — full messages ready to copy and send.
            </p>
            <Link href={signupHref} className="btn-yellow inline-block">
              Create free account to unlock all 3 →
            </Link>
            <p className="text-xs opacity-40 mt-3">Takes 30 seconds.</p>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            {drafts.map((draft, i) => (
              <div key={i} className="border border-white/20 p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="kicker text-xs">{draft.label}</p>
                  <button
                    onClick={() => handleCopy(draft.body, i)}
                    className="mono text-xs text-[#ffc107] hover:opacity-70 transition-opacity"
                  >
                    {copied === i ? '✓ Copied' : 'Copy →'}
                  </button>
                </div>
                <pre className="text-sm whitespace-pre-wrap leading-relaxed opacity-80 font-sans">{draft.body}</pre>
                <div className="mt-3 border-t border-white/10 pt-3">
                  <p className="kicker text-xs mb-1">Short version</p>
                  <p className="text-xs opacity-60">{draft.short}</p>
                  <button
                    onClick={() => handleCopy(draft.short, i + 100)}
                    className="mono text-xs text-[#ffc107] hover:opacity-70 mt-1 transition-opacity"
                  >
                    {copied === i + 100 ? '✓ Copied' : 'Copy short →'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button onClick={handleRestart} className="mt-6 text-xs mono opacity-40 hover:opacity-100 transition-opacity">
          ↺ Start over
        </button>
      </div>
    );
  }

  return (
    <div className="border-2 border-white p-6 md:p-8 mb-10">
      <p className="kicker mb-4">Difficult Message · {step === 'scenario' ? '1' : step === 'tone' ? '2' : step === 'audience' ? '3' : '4'} of 4</p>

      {/* Progress */}
      <div className="h-1 bg-white/10 w-full mb-6">
        <div className="h-1 bg-[#ffc107] transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      {/* Step: Scenario */}
      {step === 'scenario' && (
        <>
          <p className="display text-2xl md:text-3xl mb-6 leading-tight">What do you need to say?</p>
          <div className="grid gap-3">
            {SCENARIOS.map(s => (
              <button
                key={s.id}
                onClick={() => handleScenario(s.id)}
                className="text-left border border-white/20 px-4 py-3 hover:border-[#ffc107] hover:text-[#ffc107] transition-all flex items-center gap-3"
              >
                <span className="text-xl">{s.emoji}</span>
                <span className="text-sm">{s.label}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Step: Tone */}
      {step === 'tone' && (
        <>
          <p className="display text-2xl md:text-3xl mb-6 leading-tight">What tone fits?</p>
          <div className="grid gap-3">
            {TONES.map(t => (
              <button
                key={t.id}
                onClick={() => handleTone(t.id)}
                className="text-left border border-white/20 px-4 py-3 hover:border-[#ffc107] hover:text-[#ffc107] transition-all"
              >
                <span className="text-sm">{t.label}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Step: Audience */}
      {step === 'audience' && (
        <>
          <p className="display text-2xl md:text-3xl mb-6 leading-tight">Who are you messaging?</p>
          <div className="grid grid-cols-2 gap-3">
            {AUDIENCES.map(a => (
              <button
                key={a.id}
                onClick={() => handleAudience(a.id)}
                className="text-left border border-white/20 px-4 py-3 hover:border-[#ffc107] hover:text-[#ffc107] transition-all text-sm"
              >
                {a.label}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Step: Context */}
      {step === 'context' && (
        <>
          <p className="display text-2xl md:text-3xl mb-2 leading-tight">Any context? <span className="text-base font-normal opacity-50">(optional)</span></p>
          <p className="text-sm opacity-60 mb-5">A sentence or two about the situation. The more specific, the better the drafts.</p>
          <textarea
            value={context}
            onChange={e => setContext(e.target.value)}
            placeholder="e.g. My flatmate keeps leaving dishes and I've mentioned it twice already..."
            className="w-full bg-black text-white border-2 border-white/30 px-4 py-3 text-sm resize-none h-28 focus:border-[#ffc107] outline-none transition-colors"
          />
          <button onClick={handleGenerate} className="btn-yellow mt-4">
            Generate my drafts →
          </button>
          <button onClick={handleGenerate} className="block mt-3 text-xs mono opacity-40 hover:opacity-70">
            Skip context
          </button>
        </>
      )}
    </div>
  );
}
