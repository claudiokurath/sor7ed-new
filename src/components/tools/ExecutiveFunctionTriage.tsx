'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

type Answer = { questionId: string; score: number; dimension: string };

const QUESTIONS = [
  { id: 'q1', dimension: 'initiation', text: 'How often do you know exactly what to do but still cannot start?', low: 'Rarely', high: 'Almost always' },
  { id: 'q2', dimension: 'overwhelm', text: 'How overwhelming does your task list feel right now?', low: 'Manageable', high: 'Completely overwhelming' },
  { id: 'q3', dimension: 'working_memory', text: 'How often do you lose track of what you were doing mid-task?', low: 'Rarely', high: 'Constantly' },
  { id: 'q4', dimension: 'emotional_drag', text: 'How much is anxiety or dread slowing you down today?', low: 'Not much', high: 'It is the main blocker' },
  { id: 'q5', dimension: 'time_blindness', text: 'How connected do you feel to deadlines and time today?', low: 'Very connected', high: 'Time feels unreal' },
  { id: 'q6', dimension: 'urgency', text: 'How urgently do you need to get things moving — right now?', low: 'No rush', high: 'Critical urgency' },
];

const DIMENSION_LABELS: Record<string, string> = {
  initiation: 'Task Initiation',
  overwhelm: 'Overwhelm Load',
  working_memory: 'Working Memory',
  emotional_drag: 'Emotional Drag',
  time_blindness: 'Time Blindness',
  urgency: 'Urgency Level',
};

const BOTTLENECK_COPY: Record<string, { label: string; signal: string; action: string; avoid: string; reset: string }> = {
  initiation: {
    label: 'Task Initiation Block',
    signal: 'You know what to do. Your brain will not let you start. This is a dopamine and activation problem — not laziness.',
    action: 'Pick the smallest possible first action. Not the task — the first physical move. Open the doc. Find the file. That is it.',
    avoid: 'Do not make a list of everything. Lists feel productive and change nothing.',
    reset: 'Set a 2-minute timer and do anything related to the task — badly, incompletely, without pressure.',
  },
  overwhelm: {
    label: 'Overwhelm Overload',
    signal: 'Your working context is saturated. Trying to process everything at once is crashing the system.',
    action: 'Write down every task you are holding in your head onto paper or a note. Get it out of your brain.',
    avoid: 'Do not try to prioritise while overwhelmed. First empty the buffer, then sort.',
    reset: 'Pick the one task that would make everything else feel slightly less urgent. Do only that.',
  },
  working_memory: {
    label: 'Working Memory Drain',
    signal: 'Your brain is dropping context between steps. This is not a focus problem — it is a memory load problem.',
    action: 'Narrate what you are doing out loud, or type it as you go. Externalise the state.',
    avoid: 'Do not multitask or switch windows. Every context switch empties the buffer.',
    reset: 'Write the last thing you did and the next thing you need to do. Pin it somewhere visible.',
  },
  emotional_drag: {
    label: 'Emotional Drag',
    signal: 'Something emotional is running in the background — dread, shame, anxiety, or avoidance. It is eating your capacity.',
    action: 'Name it. Write one sentence describing what you are dreading or avoiding. Naming reduces the drag.',
    avoid: 'Do not push through with willpower. Forcing through emotional drag depletes you faster.',
    reset: 'Give yourself 10 minutes to do something completely unrelated. A real break, not a guilt-laden pause.',
  },
  time_blindness: {
    label: 'Time Blindness',
    signal: 'The future does not feel real. Deadlines have no emotional weight. This is a now vs not-now problem.',
    action: 'Make the deadline concrete and visible — write it on paper in front of you with the exact time.',
    avoid: 'Do not rely on mental reminders or digital notifications. They are invisible to a time-blind brain.',
    reset: 'Set a physical timer. Work until it goes off. Repeat. Anchoring to real time overrides time blindness.',
  },
  urgency: {
    label: 'Urgency Paralysis',
    signal: 'High urgency is triggering freeze mode rather than action. Pressure is making it worse, not better.',
    action: 'Lower the stakes mentally. What is the worst realistic outcome? It is almost always survivable.',
    avoid: 'Do not catastrophise or run the worst-case scenario repeatedly. It locks you in freeze.',
    reset: 'Do the easiest task first, even if it is not the most important. Starting anything breaks the freeze.',
  },
};

function computeResult(answers: Answer[]) {
  const scores: Record<string, number[]> = {};
  for (const a of answers) {
    if (!scores[a.dimension]) scores[a.dimension] = [];
    scores[a.dimension].push(a.score);
  }

  const avgScores: Record<string, number> = {};
  for (const [dim, vals] of Object.entries(scores)) {
    avgScores[dim] = vals.reduce((a, b) => a + b, 0) / vals.length;
  }

  const sorted = Object.entries(avgScores).sort((a, b) => b[1] - a[1]);
  const primary = sorted[0]?.[0] || 'initiation';
  const secondary = sorted[1]?.[0] || 'overwhelm';
  const frictionLoad = Math.round((Object.values(avgScores).reduce((a, b) => a + b, 0) / Object.values(avgScores).length) * 10);

  return { primary, secondary, frictionLoad, avgScores };
}

const STORAGE_KEY = 'sor7ed_triage_answers';

export default function ExecutiveFunctionTriage({
  signupHref,
  initiallyUnlocked = false,
}: {
  signupHref: string;
  initiallyUnlocked?: boolean;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [unlocked, setUnlocked] = useState(initiallyUnlocked);
  const [done, setDone] = useState(false);

  // Restore saved answers on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Answer[];
        if (parsed.length === QUESTIONS.length) {
          setAnswers(parsed);
          setDone(true);
        } else if (parsed.length > 0) {
          setAnswers(parsed);
          setStep(parsed.length);
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (initiallyUnlocked) setUnlocked(true);
  }, [initiallyUnlocked]);

  const currentQ = QUESTIONS[step];
  const result = (done || answers.length === QUESTIONS.length) ? computeResult(answers) : null;
  const primaryCopy = result ? BOTTLENECK_COPY[result.primary] : null;
  const secondaryCopy = result ? BOTTLENECK_COPY[result.secondary] : null;

  function handleSelect(score: number) {
    setSelected(score);
  }

  function handleNext() {
    if (selected === null) return;
    const newAnswers = [...answers, { questionId: currentQ.id, score: selected, dimension: currentQ.dimension }];
    setAnswers(newAnswers);
    setSelected(null);

    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(newAnswers)); } catch {}

    if (step + 1 >= QUESTIONS.length) {
      setDone(true);
    } else {
      setStep(step + 1);
    }
  }

  function handleRestart() {
    setAnswers([]);
    setStep(0);
    setSelected(null);
    setDone(false);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }

  const progress = Math.round(((step + (done ? 1 : 0)) / QUESTIONS.length) * 100);

  // ── DONE — show teaser or full result ──────────────────────────
  if (done && result && primaryCopy) {
    return (
      <div className="border-2 border-[#ffc107] p-6 md:p-8 mb-10">
        {/* Header */}
        <p className="kicker mb-2">Executive Function Triage</p>
        <h2 className="display text-3xl md:text-4xl mb-1 text-[#ffc107]">Triage complete.</h2>
        <p className="text-sm opacity-60 mb-6">Friction load: {result.frictionLoad}/10</p>

        {/* Progress bars */}
        <div className="grid gap-3 mb-8">
          {Object.entries(result.avgScores)
            .sort((a, b) => b[1] - a[1])
            .map(([dim, score]) => (
              <div key={dim}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="mono">{DIMENSION_LABELS[dim]}</span>
                  <span className="mono opacity-60">{Math.round(score * 10)}/10</span>
                </div>
                <div className="h-1 bg-white/10 w-full">
                  <div
                    className="h-1 bg-[#ffc107]"
                    style={{ width: `${score * 10}%`, transition: 'width 0.6s ease' }}
                  />
                </div>
              </div>
            ))}
        </div>

        {/* Primary bottleneck teaser */}
        <div className="border border-white/20 p-4 mb-4">
          <p className="kicker text-xs mb-1">Primary bottleneck identified</p>
          <p className="display text-2xl text-[#ffc107]">{primaryCopy.label}</p>
          <p className="text-sm mt-2 opacity-70">{primaryCopy.signal}</p>
        </div>

        {/* Gate */}
        {!unlocked ? (
          <div className="mt-6">
            <p className="text-sm mb-4 opacity-80">
              Your full result includes: immediate action, 15-minute reset, what to avoid, and your secondary bottleneck — tailored to your scores.
            </p>
            <Link href={signupHref} className="btn-yellow inline-block">
              Create free account to unlock →
            </Link>
            <p className="text-xs opacity-50 mt-3">Takes 30 seconds. Your answers are saved.</p>
          </div>
        ) : (
          <>
            {/* Full result */}
            <div className="mt-6 space-y-5">
              <div className="border-l-4 border-[#ffc107] pl-4">
                <p className="kicker text-xs mb-1">Immediate action</p>
                <p className="text-sm">{primaryCopy.action}</p>
              </div>
              <div className="border-l-4 border-white/30 pl-4">
                <p className="kicker text-xs mb-1">15-minute reset</p>
                <p className="text-sm">{primaryCopy.reset}</p>
              </div>
              <div className="border-l-4 border-red-500/60 pl-4">
                <p className="kicker text-xs mb-1">Do not do this</p>
                <p className="text-sm">{primaryCopy.avoid}</p>
              </div>
              {secondaryCopy && (
                <div className="border border-white/10 p-4 mt-4">
                  <p className="kicker text-xs mb-1">Secondary pattern: {secondaryCopy.label}</p>
                  <p className="text-sm opacity-70">{secondaryCopy.signal}</p>
                  <p className="text-sm mt-2">{secondaryCopy.action}</p>
                </div>
              )}
            </div>
          </>
        )}

        <button onClick={handleRestart} className="mt-6 text-xs mono opacity-50 hover:opacity-100 transition-opacity">
          ↺ Retake triage
        </button>
      </div>
    );
  }

  // ── IN PROGRESS ─────────────────────────────────────────────────
  return (
    <div className="border-2 border-white p-6 md:p-8 mb-10">
      <p className="kicker mb-4">Executive Function Triage · {step + 1} of {QUESTIONS.length}</p>

      {/* Progress bar */}
      <div className="h-1 bg-white/10 w-full mb-6">
        <div className="h-1 bg-[#ffc107] transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <p className="display text-2xl md:text-3xl mb-8 leading-tight">{currentQ.text}</p>

      {/* Scale */}
      <div className="flex gap-2 mb-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
          <button
            key={n}
            onClick={() => handleSelect(n)}
            className={`flex-1 aspect-square text-sm font-bold border transition-all ${
              selected === n
                ? 'bg-[#ffc107] text-black border-[#ffc107]'
                : 'bg-transparent text-white border-white/30 hover:border-white'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-xs opacity-50 mb-8">
        <span>{currentQ.low}</span>
        <span>{currentQ.high}</span>
      </div>

      <button
        onClick={handleNext}
        disabled={selected === null}
        className={`btn-yellow ${selected === null ? 'opacity-40 cursor-not-allowed' : ''}`}
      >
        {step + 1 === QUESTIONS.length ? 'See my results' : 'Next →'}
      </button>
    </div>
  );
}
