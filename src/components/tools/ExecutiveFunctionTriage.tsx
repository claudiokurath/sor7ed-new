'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type Props = {
  signupHref: string;
  initiallyUnlocked?: boolean;
};

type DimensionKey =
  | 'taskInitiation'
  | 'overwhelm'
  | 'workingMemory'
  | 'emotionalDrag'
  | 'decisionFriction'
  | 'timeBlindness';

type Question = {
  id: string;
  prompt: string;
  helper: string;
  weights: Partial<Record<DimensionKey, number>>;
};

type ResultProfile = {
  title: string;
  whyItShowsUp: string;
  immediateAction: string;
  fifteenMinuteReset: string;
  avoid: string;
};

const STORAGE_KEY = 'sor7ed-triage-answers-v1';
const UNLOCK_KEY = 'sor7ed-triage-unlocked-v1';

const SCALE = [
  { value: 0, label: 'Not true', note: 'This is not really the problem.' },
  { value: 1, label: 'A bit true', note: 'It shows up, but not strongly.' },
  { value: 2, label: 'Mostly true', note: 'This is affecting me a lot.' },
  { value: 3, label: 'Very true', note: 'This is the main problem right now.' },
];

const PROFILES: Record<DimensionKey, ResultProfile> = {
  taskInitiation: {
    title: 'Task Initiation',
    whyItShowsUp:
      'The work may make sense in theory, but your brain is not giving you a clean starting edge. Friction is highest at the moment of beginning.',
    immediateAction: 'Shrink the job to a 2-minute starter move and begin with a body action, not a thinking action.',
    fifteenMinuteReset:
      'Set a 15-minute timer. Open the task, name the first visible step, and only prepare the environment needed for that step.',
    avoid: 'Do not make a bigger plan before starting. More planning will feel productive but delay the first move.',
  },
  overwhelm: {
    title: 'Overwhelm Load',
    whyItShowsUp:
      'Too many moving parts are hitting your system at once. The problem is not laziness — it is overload, compression, and signal collision.',
    immediateAction: 'Reduce the field. Write down the 3 loudest demands and cross out everything that does not matter in the next hour.',
    fifteenMinuteReset:
      'Do a fast external brain-dump, group items into now / later / not mine, then choose only one item from the now list.',
    avoid: 'Do not try to hold the whole picture in your head. Internal juggling is what is creating the freeze.',
  },
  workingMemory: {
    title: 'Working Memory Drag',
    whyItShowsUp:
      'You are losing the thread between steps, interruptions, or details. The task keeps dissolving before you can stabilize it.',
    immediateAction: 'Put the next 3 steps somewhere visible and keep only one step live at a time.',
    fifteenMinuteReset:
      'Create a temporary run-sheet: step 1, step 2, step 3. Leave it open beside the task and update it every time you switch context.',
    avoid: 'Do not rely on “I will remember in a second.” If it is not externalised, it is already at risk.',
  },
  emotionalDrag: {
    title: 'Emotional Regulation Drag',
    whyItShowsUp:
      'This task is carrying threat, shame, dread, or self-judgement. The emotional cost is blocking access to the practical next step.',
    immediateAction: 'Lower the emotional voltage first: name the feeling, lower the stakes, then choose the least exposing next move.',
    fifteenMinuteReset:
      'Take 3 minutes away from the task, regulate physically, then return only to draft, sort, or outline — not to finish.',
    avoid: 'Do not force yourself through the emotional spike with self-criticism. It increases avoidance and makes the task feel bigger.',
  },
  decisionFriction: {
    title: 'Decision Friction',
    whyItShowsUp:
      'The block is not effort alone. It is unclear sequencing, unclear criteria, or too many possible starting points competing at once.',
    immediateAction: 'Choose the next move by one rule only: which action reduces uncertainty fastest.',
    fifteenMinuteReset:
      'List the options, circle the irreversible one if there is one, then choose the smallest reversible step that gives you new information.',
    avoid: 'Do not wait to feel certain. Certainty is not coming before motion.',
  },
  timeBlindness: {
    title: 'Time Blindness',
    whyItShowsUp:
      'The task may only feel real when it becomes urgent. Time is not landing with enough shape to support pacing or prioritisation.',
    immediateAction: 'Convert the task into one visible block with a start time, finish line, and buffer.',
    fifteenMinuteReset:
      'Create one anchor block for the next 15 minutes, then decide what “done enough” looks like before you begin.',
    avoid: 'Do not plan against an abstract clock. Use blocks, timers, and buffers instead of vague intentions.',
  },
};

const QUESTIONS: Question[] = [
  {
    id: 'start',
    prompt: 'Starting feels physically hard, even when I know what I should do.',
    helper: 'This is the “I know, but I still cannot begin” problem.',
    weights: { taskInitiation: 3, emotionalDrag: 1 },
  },
  {
    id: 'overload',
    prompt: 'Everything feels equally urgent, noisy, or demanding right now.',
    helper: 'This catches overload and compression, not just stress.',
    weights: { overwhelm: 3, decisionFriction: 1 },
  },
  {
    id: 'memory',
    prompt: 'I keep losing the thread, forgetting steps, or dropping context halfway through.',
    helper: 'This points to working-memory drag, interruptions, and sequence loss.',
    weights: { workingMemory: 3, taskInitiation: 1 },
  },
  {
    id: 'emotion',
    prompt: 'Thinking about this task triggers shame, dread, panic, or a strong urge to avoid it.',
    helper: 'This captures the emotional load wrapped around the task.',
    weights: { emotionalDrag: 3, overwhelm: 1 },
  },
  {
    id: 'sequence',
    prompt: 'The real problem is that I do not know what to do first.',
    helper: 'This is about unclear sequencing, not motivation.',
    weights: { decisionFriction: 3, taskInitiation: 1 },
  },
  {
    id: 'time',
    prompt: 'The task only feels real when it becomes urgent or nearly too late.',
    helper: 'This identifies time blindness and urgency dependence.',
    weights: { timeBlindness: 3, overwhelm: 1 },
  },
  {
    id: 'switching',
    prompt: 'I start, but any interruption or tiny obstacle knocks me off completely.',
    helper: 'This shows how fragile task continuity feels right now.',
    weights: { workingMemory: 2, taskInitiation: 1, overwhelm: 1 },
  },
];

function clampAnswer(value: number): number {
  if (Number.isNaN(value)) return -1;
  return Math.max(0, Math.min(3, value));
}

function calculateResults(answers: number[]) {
  const scores: Record<DimensionKey, number> = {
    taskInitiation: 0,
    overwhelm: 0,
    workingMemory: 0,
    emotionalDrag: 0,
    decisionFriction: 0,
    timeBlindness: 0,
  };

  QUESTIONS.forEach((question, index) => {
    const answer = clampAnswer(answers[index] ?? -1);
    if (answer < 0) return;

    Object.entries(question.weights).forEach(([dimension, weight]) => {
      scores[dimension as DimensionKey] += answer * (weight ?? 0);
    });
  });

  const ranking = (Object.entries(scores) as Array<[DimensionKey, number]>).sort((a, b) => b[1] - a[1]);
  const primary = ranking[0][0];
  const secondary = ranking[1][0];
  const intensityAverage = answers.reduce((sum, answer) => sum + Math.max(0, answer), 0) / QUESTIONS.length;
  const frictionLoad = Math.round((intensityAverage / 3) * 100);

  return {
    scores,
    primary,
    secondary,
    frictionLoad,
    primaryProfile: PROFILES[primary],
    secondaryProfile: PROFILES[secondary],
  };
}

function getEmergingSignal(answers: number[]) {
  const answered = answers.filter((value) => value >= 0).length;
  if (answered < 3) return null;
  const result = calculateResults(answers.map((value) => (value < 0 ? 0 : value)));
  return {
    title: result.primaryProfile.title,
    subtitle: result.secondaryProfile.title,
  };
}

export default function ExecutiveFunctionTriage({ signupHref, initiallyUnlocked = false }: Props) {
  const [answers, setAnswers] = useState<number[]>(() => Array(QUESTIONS.length).fill(-1));
  const [hydrated, setHydrated] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [persistedUnlock, setPersistedUnlock] = useState(false);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length === QUESTIONS.length) {
          const nextAnswers = parsed.map((value) => (typeof value === 'number' ? clampAnswer(value) : -1));
          setAnswers(nextAnswers);
          const firstIncomplete = nextAnswers.findIndex((value) => value < 0);
          setCurrentIndex(firstIncomplete === -1 ? QUESTIONS.length : firstIncomplete);
        }
      }

      if (initiallyUnlocked) {
        window.sessionStorage.setItem(UNLOCK_KEY, '1');
        setPersistedUnlock(true);
      } else {
        setPersistedUnlock(window.sessionStorage.getItem(UNLOCK_KEY) === '1');
      }
    } catch {
      // Ignore sessionStorage issues.
    }

    setHydrated(true);
  }, [initiallyUnlocked]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      // Ignore sessionStorage issues.
    }
  }, [answers, hydrated]);

  const answeredCount = useMemo(() => answers.filter((value) => value >= 0).length, [answers]);
  const isComplete = answeredCount === QUESTIONS.length;
  const effectiveUnlocked = initiallyUnlocked || persistedUnlock;
  const emergingSignal = useMemo(() => getEmergingSignal(answers), [answers]);
  const result = useMemo(() => (isComplete ? calculateResults(answers) : null), [answers, isComplete]);
  const currentQuestion = QUESTIONS[Math.min(currentIndex, QUESTIONS.length - 1)];

  function chooseAnswer(value: number) {
    setAnswers((current) => {
      const next = [...current];
      next[currentIndex] = value;
      return next;
    });

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(QUESTIONS.length);
    }
  }

  function goBack() {
    setCurrentIndex((current) => Math.max(0, current - 1));
  }

  function restart() {
    const blank = Array(QUESTIONS.length).fill(-1);
    setAnswers(blank);
    setCurrentIndex(0);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(blank));
    } catch {
      // Ignore sessionStorage issues.
    }
  }

  return (
    <section className="border-2 border-[#ffc107] p-6 md:p-8 my-12">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <p className="kicker">Interactive tool</p>
          <h2 className="text-4xl md:text-5xl mb-2">Executive Function Triage</h2>
          <p className="text-sm max-w-2xl">
            Answer 7 fast questions. We identify the bottleneck, estimate the load, and build a
            practical next-step plan. The final result stays gated until signup.
          </p>
        </div>
        <div className="border border-white px-3 py-2 text-sm min-w-[180px]">
          <p className="kicker">Progress</p>
          <p className="mono mt-1">{answeredCount} / {QUESTIONS.length} answered</p>
        </div>
      </div>

      <div className="w-full h-2 bg-white/15 mb-8">
        <div
          className="h-full bg-[#ffc107] transition-all"
          style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }}
        />
      </div>

      {!isComplete ? (
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] items-start">
          <div className="dark-card">
            <p className="kicker mb-2">
              Question {Math.min(currentIndex + 1, QUESTIONS.length)} of {QUESTIONS.length}
            </p>
            <h3 className="text-3xl md:text-4xl mb-3">{currentQuestion.prompt}</h3>
            <p className="text-sm opacity-85 mb-6">{currentQuestion.helper}</p>

            <div className="grid gap-3">
              {SCALE.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => chooseAnswer(option.value)}
                  className="text-left border-2 border-white px-4 py-4 hover:border-[#ffc107] hover:bg-[#ffc107] hover:text-black transition"
                >
                  <span className="display text-2xl block">{option.label}</span>
                  <span className="text-sm block mt-1">{option.note}</span>
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <button type="button" onClick={goBack} className="btn-outline" disabled={currentIndex === 0}>
                Back
              </button>
              <button type="button" onClick={restart} className="btn-outline">
                Reset
              </button>
            </div>
          </div>

          <div className="border-2 border-white p-5">
            <p className="kicker">Live read</p>
            {emergingSignal ? (
              <>
                <p className="text-base mt-3">
                  A pattern is starting to form. Your answers suggest that the real problem is not
                  generic motivation.
                </p>
                <div className="mt-5 grid gap-3">
                  <div className="border border-[#ffc107] p-3">
                    <p className="kicker">Strongest signal so far</p>
                    <p className="display text-2xl mt-1">{emergingSignal.title}</p>
                  </div>
                  <div className="border border-white p-3">
                    <p className="kicker">Secondary signal</p>
                    <p className="display text-2xl mt-1">{emergingSignal.subtitle}</p>
                  </div>
                </div>
                <p className="text-xs opacity-80 mt-5">
                  Finish the triage to generate the locked action plan and signup prompt.
                </p>
              </>
            ) : (
              <p className="text-sm mt-3 opacity-85">
                Once you answer a few questions, we will start showing the shape of the bottleneck
                before the final result is locked behind signup.
              </p>
            )}
          </div>
        </div>
      ) : result ? (
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <div className="dark-card">
            <p className="kicker mb-2">Triage complete</p>
            <h3 className="text-4xl mb-3">
              {effectiveUnlocked ? 'Your full result is ready.' : 'Your result is ready to unlock.'}
            </h3>
            <p className="text-sm opacity-85 mb-6">
              {effectiveUnlocked
                ? 'You completed the triage and unlocked the detailed readout for this task.'
                : 'You have done the hard part. Create your free account to unlock the detailed readout and next-step plan.'}
            </p>

            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <div className="border border-[#ffc107] p-4">
                <p className="kicker">Friction load</p>
                <p className="display text-4xl mt-1">{result.frictionLoad}%</p>
              </div>
              <div className="border border-white p-4">
                <p className="kicker">Primary</p>
                <p
                  className="display text-2xl mt-1"
                  style={!effectiveUnlocked ? { filter: 'blur(6px)' } : undefined}
                >
                  {result.primaryProfile.title}
                </p>
              </div>
              <div className="border border-white p-4">
                <p className="kicker">Secondary</p>
                <p
                  className="display text-2xl mt-1"
                  style={!effectiveUnlocked ? { filter: 'blur(6px)' } : undefined}
                >
                  {result.secondaryProfile.title}
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              {[
                {
                  title: 'Why this pattern fits',
                  body: result.primaryProfile.whyItShowsUp,
                },
                {
                  title: 'Immediate next move',
                  body: result.primaryProfile.immediateAction,
                },
                {
                  title: '15-minute reset plan',
                  body: result.primaryProfile.fifteenMinuteReset,
                },
                {
                  title: 'Do not do this',
                  body: result.primaryProfile.avoid,
                },
              ].map((item) => (
                <div key={item.title} className="border border-white p-4">
                  <p className="kicker">{item.title}</p>
                  <p
                    className="text-sm mt-2"
                    style={!effectiveUnlocked ? { filter: 'blur(7px)' } : undefined}
                    aria-hidden={!effectiveUnlocked}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-2 border-[#ffc107] p-5">
            {effectiveUnlocked ? (
              <>
                <p className="kicker">Unlocked</p>
                <p className="text-base mt-3">
                  You can now use this triage result as your working plan. If you want a different
                  read, restart and score the task you are stuck on right now — not the whole week.
                </p>
                <div className="flex flex-wrap gap-3 mt-6">
                  <Link href="/signup" className="btn-outline">
                    Update signup details
                  </Link>
                  <button type="button" onClick={restart} className="btn-yellow">
                    Run triage again
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="kicker">Signup gate</p>
                <p className="display text-3xl mt-2">Unlock your full triage result.</p>
                <p className="text-sm mt-3">
                  We have already scored your answers and built the action plan. Create your free
                  account and we will send the magic link, then return you to this tool.
                </p>
                <ul className="text-sm mt-5 space-y-2">
                  <li>✓ Primary bottleneck identified</li>
                  <li>✓ Secondary pattern identified</li>
                  <li>✓ 1 immediate action and 1 reset plan prepared</li>
                </ul>
                <div className="flex flex-wrap gap-3 mt-6">
                  <Link href={signupHref} className="btn-yellow">
                    Sign up for results
                  </Link>
                  <button type="button" onClick={restart} className="btn-outline">
                    Retake triage
                  </button>
                </div>
                <p className="text-xs opacity-80 mt-4">
                  Your answers stay on this device for the return journey after signup.
                </p>
              </>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}
