'use client';
import { useState } from 'react';
import Link from 'next/link';

const SCENARIOS = [
  { id: 'boundary', label: 'Setting a boundary', icon: '🛑' },
  { id: 'apology', label: 'Apologising', icon: '🤍' },
  { id: 'followup', label: 'Following up on something ignored', icon: '📬' },
  { id: 'pushback', label: 'Pushing back on something unfair', icon: '⚡' },
  { id: 'checkin', label: 'Checking in after a falling out', icon: '🌱' },
];

const TONES = [
  { id: 'warm', label: 'Warm', desc: 'Kind, gentle, relationship-first' },
  { id: 'firm', label: 'Firm', desc: 'Clear, direct, no room for doubt' },
  { id: 'neutral', label: 'Neutral', desc: 'Factual, professional, low-emotion' },
];

const AUDIENCES = [
  { id: 'partner', label: 'Partner / Spouse' },
  { id: 'friend', label: 'Friend' },
  { id: 'family', label: 'Family member' },
  { id: 'colleague', label: 'Colleague' },
  { id: 'manager', label: 'Manager / Boss' },
  { id: 'stranger', label: 'Service / Stranger' },
];

const DRAFTS: Record<string, Record<string, Record<string, { long: string; short: string }>>> = {
  boundary: {
    warm: {
      partner: {
        long: "Hey — I've been sitting with something and wanted to bring it up while it's still manageable. When [situation] happens, I end up feeling [impact], which I know isn't what you want. I'd love if we could try [alternative]. I'm not going anywhere — I just want us to work better together.",
        short: "Can we talk? Something's been affecting me and I want to sort it before it gets bigger.",
      },
      friend: {
        long: "I value our friendship a lot, which is why I want to be honest about something. When [thing happens], I find it hard to [show up / be present / engage]. I need [boundary]. I hope that's okay — I'm not going anywhere, just need us to adjust slightly.",
        short: "Hey — I need to be honest about something small before it becomes a big thing. Can we talk?",
      },
      colleague: {
        long: "I wanted to flag something I've noticed, not as a complaint, more as a heads up. When [situation], it makes it harder for me to [deliver / focus / collaborate]. Going forward I'd find it helpful if [boundary]. Happy to chat about it if useful.",
        short: "Quick one — can we find 5 mins? Want to mention something before it becomes an issue.",
      },
      manager: {
        long: "I wanted to raise something I've been thinking about. When [situation] happens, it impacts [my output / wellbeing / ability to do X]. I'd like to propose [alternative or limit]. I want to flag it now rather than let it build — happy to discuss if helpful.",
        short: "Can we grab 10 mins this week? Want to flag something proactively.",
      },
      family: {
        long: "I love you and this is coming from that place. When [thing] happens, it affects me more than I usually let on. I need [boundary] to feel okay. I hope we can respect that without it being a big deal.",
        short: "Can we chat? Something's been affecting me and I'd rather say it than not.",
      },
      stranger: {
        long: "Hi — I just wanted to mention that [situation] has been causing me [impact]. I'm not trying to make this difficult, I'd just appreciate [boundary/resolution] if that's possible.",
        short: "Hi — I need to raise something. [Issue]. Could we sort this?",
      },
    },
    firm: {
      partner: {
        long: "I need to be direct: [specific behaviour] isn't working for me and it needs to stop. I'm not saying this to hurt you, I'm saying it because it's affecting my wellbeing. Going forward, [clear boundary]. That's where I stand.",
        short: "[Behaviour] needs to stop. That's my boundary. I'd like to talk about it but it's not negotiable.",
      },
      friend: {
        long: "I need to say this clearly because I've let it go too many times: [behaviour] isn't okay with me. I want to keep this friendship, and that's exactly why I'm saying this. [Boundary]. That's what I need.",
        short: "I've let something slide too many times. [Behaviour] doesn't work for me. Can we talk?",
      },
      colleague: {
        long: "I want to raise this directly: [situation] isn't something I can keep absorbing. Going forward, [boundary/limit]. I'd prefer to handle this without escalating, but I wanted to be clear.",
        short: "[Situation] needs to change. Can we sort this now rather than later?",
      },
      manager: {
        long: "I want to raise something directly and professionally. [Situation] is affecting my ability to [perform / maintain boundaries / operate sustainably]. I need [clear boundary or outcome]. I'd like to resolve this without escalation if possible.",
        short: "I need to raise [issue] formally. Can we meet this week?",
      },
      family: {
        long: "[Behaviour] is not something I'm willing to continue accepting. I love you, but this is a firm boundary. I won't keep engaging with [situation]. I hope we can respect that.",
        short: "[Behaviour] needs to stop. That's not flexible. I hope we can move past it.",
      },
      stranger: {
        long: "This isn't acceptable. [Situation] needs to be resolved. I'd like [clear outcome] and if that isn't possible I'll need to escalate.",
        short: "This needs sorting. [Issue]. What can you do to fix this?",
      },
    },
    neutral: {
      partner: {
        long: "I want to flag something without making it bigger than it needs to be. [Situation] has been affecting me. Going forward, I'd like us to try [alternative]. Just wanted to name it.",
        short: "Can we talk briefly? Want to mention something.",
      },
      friend: {
        long: "Wanted to mention something — [situation] has been affecting me a bit. No big deal, just worth naming. I'd appreciate [boundary] going forward if possible.",
        short: "Small thing — can I mention something? Nothing dramatic.",
      },
      colleague: {
        long: "Flagging something for awareness: [situation] has had an impact on [work / output / workflow]. Going forward it would help if [boundary]. Happy to discuss if useful.",
        short: "Quick flag: [issue]. Happy to chat if helpful.",
      },
      manager: {
        long: "Flagging for your awareness: [situation] is affecting [work / output / sustainability]. I'd like to discuss [solution or boundary]. Available to talk when convenient.",
        short: "Can we find time this week? Want to flag something.",
      },
      family: {
        long: "Just wanted to name something: [situation] affects me and I'd prefer [outcome] going forward. Not trying to make it a big thing, just wanted to say it.",
        short: "Can I mention something quickly? Not a big deal, just want to name it.",
      },
      stranger: {
        long: "I wanted to flag [situation]. I'd appreciate [resolution]. Please let me know how you can help.",
        short: "[Issue]. Can you advise on how to resolve this?",
      },
    },
  },
  apology: {
    warm: {
      partner: { long: "I've been thinking about what happened and I want to say sorry properly. I [what you did] and I can see how that affected you. You deserved better from me. I'm not making excuses — I just want you to know I understand and I'm working on it.", short: "I'm sorry. Properly. Can we talk?" },
      friend: { long: "I owe you an apology. [What happened] wasn't okay and I knew it even when I did it. I'm sorry I let you down. You mean a lot to me and I don't want this to sit between us.", short: "I owe you an apology. Can I say it properly?" },
      colleague: { long: "I want to apologise for [what happened]. It wasn't professional and it wasn't fair to you. I'm sorry — and I'll make sure it doesn't happen again.", short: "I want to apologise for [incident]. Can we talk briefly?" },
      manager: { long: "I want to apologise for [situation]. It fell short of the standard I want to hold myself to. I'm sorry for the impact it had and I'm [what you're doing to address it].", short: "I want to apologise for [incident]. Can we speak briefly?" },
      family: { long: "I'm sorry. [What you did] was wrong and I knew it. I love you and I hate that I hurt you. I'm not asking you to pretend it's fine — I just want you to know I mean it.", short: "I'm sorry. Can I say it properly?" },
      stranger: { long: "I'd like to apologise for [what happened]. That wasn't okay and I regret it.", short: "I'm sorry for [incident]." },
    },
    firm: {
      partner: { long: "I'm apologising because it's the right thing to do, not because I've been asked to. [What I did] was wrong. I take responsibility for it. I'm working on making sure it doesn't repeat.", short: "I was wrong. I'm sorry. I'm working on it." },
      friend: { long: "I'm sorry. [What I did] wasn't fair and there's no good excuse for it. I own that.", short: "I was wrong. No excuses. I'm sorry." },
      colleague: { long: "I'm apologising directly: [what happened] was my error. I take responsibility and I'm [corrective action].", short: "I was wrong on [issue]. I'm sorry and I'm fixing it." },
      manager: { long: "I'm apologising directly for [situation]. It was my responsibility and I failed to meet it. I've [corrective action] to ensure it doesn't happen again.", short: "I take full responsibility for [issue]. I'm sorry." },
      family: { long: "I'm sorry. Not because anyone asked me to say it — because I was wrong. [What I did] wasn't okay and I know it.", short: "I was wrong. I'm sorry." },
      stranger: { long: "I apologise for [what happened]. It was wrong and I take responsibility.", short: "I'm sorry for [incident]. That was wrong of me." },
    },
    neutral: {
      partner: { long: "I want to acknowledge what happened and apologise. [Situation] — I handled that badly and I'm sorry for the impact it had.", short: "I want to apologise for [situation]." },
      friend: { long: "I owe you an apology for [situation]. It wasn't okay and I'm sorry.", short: "I'm sorry for [situation]." },
      colleague: { long: "I'd like to apologise for [incident] and acknowledge the impact it may have had.", short: "Apologies for [incident]." },
      manager: { long: "I'm writing to apologise for [situation] and to confirm I've [corrective action].", short: "Apologies for [situation]. I've [corrective action]." },
      family: { long: "I want to apologise for [situation]. I handled it poorly and I'm sorry.", short: "I'm sorry about [situation]." },
      stranger: { long: "I apologise for any inconvenience caused by [situation].", short: "Sorry for [situation]." },
    },
  },
  followup: {
    warm: {
      partner: { long: "Hey — I mentioned [thing] a while ago and I haven't heard back. I'm not trying to nag, I just wanted to check in because it's still on my mind. Can we find a moment to talk about it?", short: "Hey — still thinking about [thing] I mentioned. Can we talk?" },
      friend: { long: "I know life gets busy, but I wanted to follow up on [thing]. No pressure — I just didn't want to let it disappear into the void. Are you okay?", short: "Just checking in — did [thing] ever get resolved?" },
      colleague: { long: "Following up on my message from [timeframe] re: [topic]. Happy to jump on a quick call if easier. Just want to make sure it doesn't fall through the gaps.", short: "Following up on [topic] — any update?" },
      manager: { long: "Wanted to follow up on [topic] from [timeframe]. No rush, but I wanted to check in before [deadline or next step]. Happy to discuss when convenient.", short: "Following up on [topic]. Can we find 5 mins?" },
      family: { long: "Hey — I haven't forgotten about [thing] we talked about. Just checking in. How are you doing with it?", short: "Still thinking about [thing] — wanted to check in." },
      stranger: { long: "Following up on my previous message regarding [issue]. I'd appreciate an update when possible.", short: "Following up re: [issue]. Any update?" },
    },
    firm: {
      partner: { long: "[Thing] is still unresolved and I need us to address it. Can we make time this week?", short: "We still need to talk about [thing]. This week?" },
      friend: { long: "[Thing] hasn't been resolved and it's still affecting me. I need to know where we stand.", short: "[Thing] is still on my mind. Can we talk?" },
      colleague: { long: "I'm following up on [topic] for the third time. I need a response by [date] to move forward.", short: "Need a response on [topic] by [date]." },
      manager: { long: "I'm following up on [topic] — this is now blocking [work / decision]. I need clarity by [date].", short: "[Topic] is blocking progress. Need a decision by [date]." },
      family: { long: "[Thing] is still unresolved and it matters to me. Can we address it?", short: "Still need to talk about [thing]." },
      stranger: { long: "This is my third follow-up regarding [issue]. If I don't hear back by [date] I'll need to escalate.", short: "Final follow-up on [issue] before I escalate." },
    },
    neutral: {
      partner: { long: "Just following up on [thing] we discussed. Let me know when you have a moment.", short: "Following up on [thing]. When can we talk?" },
      friend: { long: "Quick follow-up on [topic]. Still on my mind — any update?", short: "Any update on [topic]?" },
      colleague: { long: "Following up re: [topic]. Happy to discuss if helpful.", short: "Any update on [topic]?" },
      manager: { long: "Following up re: [topic] from [date]. Please advise when convenient.", short: "Following up on [topic]." },
      family: { long: "Just checking in on [thing]. No rush, just didn't want to forget.", short: "Checking in on [thing]." },
      stranger: { long: "Following up on [issue]. Please advise.", short: "Update on [issue] please." },
    },
  },
  pushback: {
    warm: {
      partner: { long: "I hear you, and I want to work through this together — but I need to push back on [specific thing]. From my side, [your perspective]. Can we find a middle ground?", short: "I want to find a solution but I need to push back on [thing]. Can we talk?" },
      friend: { long: "I love you but I disagree here. [Your perspective]. I don't want this to become a fight — but I can't just go along with [thing].", short: "I hear you — but I need to push back on [thing]." },
      colleague: { long: "I want to be collaborative here, but I have some concerns about [thing]. [Your reasoning]. Can we discuss before moving forward?", short: "Quick one — I want to flag a concern about [thing] before we proceed." },
      manager: { long: "I want to flag some concerns about [thing] before we proceed. [Reasoning]. I'm not trying to block this — I just think it's worth discussing first.", short: "Can I raise a concern about [thing] before we commit?" },
      family: { long: "I want to say this gently — I disagree about [thing]. [Your perspective]. I hope we can talk it through.", short: "I need to respectfully disagree about [thing]. Can we talk?" },
      stranger: { long: "I appreciate your position but I have to respectfully push back. [Issue]. I'd like to discuss further.", short: "I need to push back on [thing]. Can we discuss?" },
    },
    firm: {
      partner: { long: "I need to be honest — I don't agree with [decision/action]. [Your reasoning]. I need us to revisit this before it goes further.", short: "I don't agree with [thing]. We need to revisit this." },
      friend: { long: "[Thing] isn't something I can support. [Your reasoning]. I'm saying that because I care, not to be difficult.", short: "I can't support [thing]. Here's why: [reason]." },
      colleague: { long: "I have to push back on [thing]. [Reasoning]. I don't think we should proceed without addressing this.", short: "I'm not comfortable with [thing] as it stands. We need to talk." },
      manager: { long: "I need to formally flag my concern about [thing]. [Reasoning]. I'd like this on record before we proceed.", short: "I need to raise a formal concern about [thing]." },
      family: { long: "I disagree — clearly and firmly. [Your reasoning]. I'm not going to pretend otherwise.", short: "I disagree about [thing]. That's not going to change." },
      stranger: { long: "I'm pushing back on [thing]. [Reasoning]. I'd like this resolved or escalated.", short: "I don't accept [thing]. I'd like to escalate if needed." },
    },
    neutral: {
      partner: { long: "I wanted to flag a different perspective on [thing]. [Reasoning]. Worth discussing?", short: "Different view on [thing] — worth a chat?" },
      friend: { long: "I see it differently on [thing]. [Perspective]. Just wanted to name it.", short: "I see [thing] differently. Can I say why?" },
      colleague: { long: "I have a different view on [thing] that I'd like to flag. [Reasoning]. Happy to discuss.", short: "Flagging a concern on [thing]. Can we discuss?" },
      manager: { long: "I'd like to raise an alternative view on [thing] for consideration. [Reasoning].", short: "Wanted to raise an alternative view on [thing]." },
      family: { long: "I see this differently — [perspective]. Just wanted to say it.", short: "I see [thing] differently." },
      stranger: { long: "I'd like to raise a concern about [thing]. [Reasoning].", short: "Concern re: [thing]." },
    },
  },
  checkin: {
    warm: {
      partner: { long: "I've been thinking about us and I miss [connection/ease/you]. I know things have been hard. I'm not looking to relitigate everything — I just wanted to check in and see if there's space to reconnect.", short: "I miss us. Can we check in?" },
      friend: { long: "I've been thinking about you. I know things got complicated between us and I'm not sure where we land — but I wanted to reach out and just say I'm here if you want to talk.", short: "Been thinking about you. Are we okay?" },
      colleague: { long: "Wanted to check in after [situation]. I hope we're okay. I value working with you and didn't want anything to sit awkwardly.", short: "Quick check-in after [situation]. Hope we're good." },
      manager: { long: "I wanted to check in after [situation]. I want to make sure we're aligned and that anything unresolved gets addressed.", short: "Wanted to check in after [situation]. Can we find 5 mins?" },
      family: { long: "I've been thinking about you a lot. I know we haven't talked properly in a while. I just wanted to reach out — no agenda, just wanted to say I'm thinking of you.", short: "Been thinking of you. Hope you're okay. Can we talk?" },
      stranger: { long: "Hi — I just wanted to follow up after [situation] and check that everything is okay from your end.", short: "Following up after [situation]. Hope all is okay." },
    },
    firm: {
      partner: { long: "I need to know where we stand. [Situation] changed something and I can't keep going without addressing it. Can we talk properly?", short: "I need to know where we stand. Can we talk?" },
      friend: { long: "I think we need to clear the air. [Situation] has been sitting between us and I'd rather deal with it than let it fester.", short: "We need to clear the air. Can we talk?" },
      colleague: { long: "After [situation] I think it's important we get aligned. Can we find time to talk it through?", short: "We need to get aligned after [situation]. Can we talk?" },
      manager: { long: "After [situation] I think we need to have a direct conversation to make sure we're on the same page.", short: "Can we debrief on [situation]? Want to make sure we're aligned." },
      family: { long: "I think we need to talk — really talk. [Situation] has left things unresolved and I don't want to keep pretending otherwise.", short: "We need to talk about [situation]. Can we?" },
      stranger: { long: "Following up on [situation] — I'd like to resolve anything that's outstanding.", short: "Can we resolve [situation] properly?" },
    },
    neutral: {
      partner: { long: "Just checking in — wanted to see how you're doing and if things feel okay between us.", short: "Just checking in. You okay?" },
      friend: { long: "Hey — just checking in. Hope you're okay.", short: "Hey. You okay?" },
      colleague: { long: "Checking in after [situation]. Let me know if anything needs following up.", short: "Checking in post-[situation]. All good?" },
      manager: { long: "Checking in after [situation]. Happy to discuss if anything needs clarifying.", short: "Checking in on [situation]. All okay?" },
      family: { long: "Just checking in. Haven't heard from you in a while.", short: "Just checking in. You okay?" },
      stranger: { long: "Following up to check that [situation] has been resolved.", short: "Is [situation] resolved?" },
    },
  },
};

const STORAGE_KEY = 'sor7ed_difficult_message';

export default function DifficultMessage({
  signupHref,
  initiallyUnlocked = false,
}: {
  signupHref: string;
  initiallyUnlocked?: boolean;
}) {
  const [step, setStep] = useState<'scenario' | 'tone' | 'audience' | 'result'>('scenario');
  const [scenario, setScenario] = useState('');
  const [tone, setTone] = useState('');
  const [audience, setAudience] = useState('');
  const [unlocked, setUnlocked] = useState(initiallyUnlocked);

  const drafts = scenario && tone && audience ? DRAFTS[scenario]?.[tone]?.[audience] : null;

  function restart() {
    setStep('scenario');
    setScenario('');
    setTone('');
    setAudience('');
  }

  // ── RESULT ──────────────────────────────────────────────────────
  if (step === 'result' && drafts) {
    const scenarioLabel = SCENARIOS.find(s => s.id === scenario)?.label || '';
    const toneLabel = TONES.find(t => t.id === tone)?.label || '';
    const audienceLabel = AUDIENCES.find(a => a.id === audience)?.label || '';

    return (
      <div className="border-2 border-[#ffc107] p-6 md:p-8 mb-10">
        <p className="kicker mb-2">Difficult Message</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {[scenarioLabel, toneLabel, audienceLabel].map((l, i) => (
            <span key={i} className="mono text-xs border border-white/20 px-2 py-0.5">{l}</span>
          ))}
        </div>

        {/* Teaser — short version always visible */}
        <div className="border border-white/20 p-4 mb-4">
          <p className="kicker text-xs mb-2">Quick version — send this now</p>
          <p className="text-base leading-relaxed italic">"{drafts.short}"</p>
        </div>

        {!unlocked ? (
          <div className="mt-6">
            <p className="text-sm opacity-70 mb-4">
              The full message draft is ready — with placeholders you can fill in. Sign up to unlock it.
            </p>
            <Link href={signupHref} className="btn-yellow inline-block">
              Unlock full draft →
            </Link>
            <p className="text-xs opacity-40 mt-3">Free account. 30 seconds.</p>
          </div>
        ) : (
          <div className="mt-6">
            <div className="border-l-4 border-[#ffc107] pl-4 mb-6">
              <p className="kicker text-xs mb-2">Full message draft</p>
              <p className="text-base leading-relaxed italic">"{drafts.long}"</p>
              <p className="text-xs opacity-50 mt-3">Replace [brackets] with your specifics before sending.</p>
            </div>
          </div>
        )}

        <button onClick={restart} className="mt-4 text-xs mono opacity-50 hover:opacity-100 transition-opacity">
          ↺ Start over
        </button>
      </div>
    );
  }

  // ── SCENARIO ────────────────────────────────────────────────────
  if (step === 'scenario') {
    return (
      <div className="border-2 border-white p-6 md:p-8 mb-10">
        <p className="kicker mb-6">Difficult Message · Step 1 of 3</p>
        <p className="display text-2xl md:text-3xl mb-8 leading-tight">What kind of message is this?</p>
        <div className="grid gap-3">
          {SCENARIOS.map(s => (
            <button
              key={s.id}
              onClick={() => { setScenario(s.id); setStep('tone'); }}
              className="flex items-center gap-4 border border-white/20 hover:border-[#ffc107] hover:text-[#ffc107] p-4 text-left transition-all"
            >
              <span className="text-2xl">{s.icon}</span>
              <span className="display text-xl">{s.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── TONE ────────────────────────────────────────────────────────
  if (step === 'tone') {
    return (
      <div className="border-2 border-white p-6 md:p-8 mb-10">
        <p className="kicker mb-6">Difficult Message · Step 2 of 3</p>
        <p className="display text-2xl md:text-3xl mb-8 leading-tight">What tone do you want?</p>
        <div className="grid gap-3">
          {TONES.map(t => (
            <button
              key={t.id}
              onClick={() => { setTone(t.id); setStep('audience'); }}
              className="flex items-start gap-4 border border-white/20 hover:border-[#ffc107] hover:text-[#ffc107] p-4 text-left transition-all"
            >
              <div>
                <p className="display text-xl">{t.label}</p>
                <p className="text-sm opacity-50 mt-1">{t.desc}</p>
              </div>
            </button>
          ))}
        </div>
        <button onClick={() => setStep('scenario')} className="mt-4 text-xs mono opacity-40 hover:opacity-80 transition-opacity">← Back</button>
      </div>
    );
  }

  // ── AUDIENCE ─────────────────────────────────────────────────────
  if (step === 'audience') {
    return (
      <div className="border-2 border-white p-6 md:p-8 mb-10">
        <p className="kicker mb-6">Difficult Message · Step 3 of 3</p>
        <p className="display text-2xl md:text-3xl mb-8 leading-tight">Who are you sending this to?</p>
        <div className="grid grid-cols-2 gap-3">
          {AUDIENCES.map(a => (
            <button
              key={a.id}
              onClick={() => { setAudience(a.id); setStep('result'); }}
              className="border border-white/20 hover:border-[#ffc107] hover:text-[#ffc107] p-4 text-left transition-all"
            >
              <p className="display text-lg">{a.label}</p>
            </button>
          ))}
        </div>
        <button onClick={() => setStep('tone')} className="mt-4 text-xs mono opacity-40 hover:opacity-80 transition-opacity">← Back</button>
      </div>
    );
  }

  return null;
}
