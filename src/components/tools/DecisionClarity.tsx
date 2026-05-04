'use client';
import { useState } from 'react';
import Link from 'next/link';

type Option = { name: string; scores: Record<string, number> };
type Factor = { id: string; label: string; question: string; highIsGood: boolean };

const FACTORS: Factor[] = [
  { id: 'urgency', label: 'Urgency', question: 'How urgently do you need this resolved?', highIsGood: true },
  { id: 'regret', label: 'Regret risk', question: 'How much would you regret NOT choosing this?', highIsGood: true },
  { id: 'energy', label: 'Energy cost', question: 'How much energy will this take from you?', highIsGood: false },
  { id: 'reversible', label: 'Reversibility', question: 'How easy is it to undo if it goes wrong?', highIsGood: true },
  { id: 'values', label: 'Values fit', question: 'How well does this fit who you actually are?', highIsGood: true },
];

function computeScores(options: Option[]): { name: string; total: number; lowEnergy: number }[] {
  return options.map(opt => {
    let total = 0;
    let lowEnergy = 0;
    for (const factor of FACTORS) {
      const score = opt.scores[factor.id] || 5;
      total += factor.highIsGood ? score : (11 - score);
      if (factor.id === 'energy') lowEnergy = 11 - score;
    }
    return { name: opt.name, total, lowEnergy };
  });
}

export default function DecisionClarity({
  signupHref,
  initiallyUnlocked = false,
}: {
  signupHref: string;
  initiallyUnlocked?: boolean;
}) {
  const [step, setStep] = useState<'options' | 'factors' | 'result'>('options');
  const [optionNames, setOptionNames] = useState(['', '']);
  const [currentFactor, setCurrentFactor] = useState(0);
  const [options, setOptions] = useState<Option[]>([]);
  const [unlocked, setUnlocked] = useState(initiallyUnlocked);

  const allOptionsNamed = optionNames.every(n => n.trim().length > 0) && optionNames.length >= 2;

  function startFactors() {
    const initialOptions: Option[] = optionNames
      .filter(n => n.trim())
      .map(name => ({ name: name.trim(), scores: {} }));
    setOptions(initialOptions);
    setCurrentFactor(0);
    setStep('factors');
  }

  function setScore(optIndex: number, factorId: string, score: number) {
    setOptions(prev => prev.map((opt, i) =>
      i === optIndex ? { ...opt, scores: { ...opt.scores, [factorId]: score } } : opt
    ));
  }

  function nextFactor() {
    if (currentFactor + 1 >= FACTORS.length) {
      setStep('result');
    } else {
      setCurrentFactor(currentFactor + 1);
    }
  }

  function restart() {
    setStep('options');
    setOptionNames(['', '']);
    setOptions([]);
    setCurrentFactor(0);
  }

  const factor = FACTORS[currentFactor];
  const progress = Math.round(((currentFactor + (step === 'result' ? 1 : 0)) / FACTORS.length) * 100);

  // ── RESULT ──────────────────────────────────────────────────────
  if (step === 'result') {
    const scored = computeScores(options).sort((a, b) => b.total - a.total);
    const winner = scored[0];
    const lowestEnergy = [...scored].sort((a, b) => b.lowEnergy - a.lowEnergy)[0];
    const maxTotal = FACTORS.length * 10;

    return (
      <div className="border-2 border-[#ffc107] p-6 md:p-8 mb-10">
        <p className="kicker mb-2">Decision Clarity</p>
        <h2 className="display text-3xl md:text-4xl mb-2 text-[#ffc107]">One option is winning.</h2>
        <p className="text-sm opacity-60 mb-8">Based on urgency, regret risk, energy cost, reversibility, and values fit.</p>

        {/* Score bars */}
        <div className="space-y-4 mb-8">
          {scored.map((opt, i) => (
            <div key={opt.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="mono">{opt.name}</span>
                <span className="mono opacity-60">{opt.total}/{maxTotal}</span>
              </div>
              <div className="h-2 bg-white/10">
                <div
                  className="h-2 bg-[#ffc107] transition-all duration-700"
                  style={{ width: `${(opt.total / maxTotal) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Teaser — winner revealed */}
        <div className="border border-white/20 p-4 mb-4">
          <p className="kicker text-xs mb-1">The data points to</p>
          <p className="display text-2xl text-[#ffc107]">{winner.name}</p>
          <p className="text-sm opacity-70 mt-2">It scored highest across your weighted priorities.</p>
        </div>

        {!unlocked ? (
          <div className="mt-6">
            <p className="text-sm opacity-70 mb-4">
              Unlock your full breakdown: why it wins, what to do next, and a low-energy fallback if you're running on empty.
            </p>
            <Link href={signupHref} className="btn-yellow inline-block">
              Unlock full result →
            </Link>
            <p className="text-xs opacity-40 mt-3">Free. 30 seconds.</p>
          </div>
        ) : (
          <div className="mt-6 space-y-5">
            <div className="border-l-4 border-[#ffc107] pl-4">
              <p className="kicker text-xs mb-1">Why {winner.name} wins</p>
              <p className="text-sm">It scored best on the factors that carry the most weight for you — particularly regret risk and values fit. Those are the two that tend to haunt people when they get it wrong.</p>
            </div>
            <div className="border-l-4 border-white/30 pl-4">
              <p className="kicker text-xs mb-1">Next action</p>
              <p className="text-sm">Decide that {winner.name} is your direction. Don't revisit it. The next step is: what's the smallest first move to commit?</p>
            </div>
            {lowestEnergy.name !== winner.name && (
              <div className="border-l-4 border-white/20 pl-4">
                <p className="kicker text-xs mb-1">Low-energy fallback</p>
                <p className="text-sm">If you're running on empty right now, {lowestEnergy.name} costs you the least. It's not the optimal choice — but it's the sustainable one if capacity is the real constraint today.</p>
              </div>
            )}
            <div className="border border-red-500/30 p-4">
              <p className="kicker text-xs mb-1">Don't do this</p>
              <p className="text-sm">Don't re-run this exercise with slightly different inputs hoping for a different answer. If you're tempted to do that, the resistance is the real issue — not the decision.</p>
            </div>
          </div>
        )}

        <button onClick={restart} className="mt-6 text-xs mono opacity-50 hover:opacity-100 transition-opacity">↺ New decision</button>
      </div>
    );
  }

  // ── FACTOR SCORING ───────────────────────────────────────────────
  if (step === 'factors') {
    const allScored = options.every(opt => opt.scores[factor.id] !== undefined);

    return (
      <div className="border-2 border-white p-6 md:p-8 mb-10">
        <p className="kicker mb-4">Decision Clarity · Factor {currentFactor + 1} of {FACTORS.length}</p>
        <div className="h-1 bg-white/10 w-full mb-6">
          <div className="h-1 bg-[#ffc107] transition-all" style={{ width: `${progress}%` }} />
        </div>

        <p className="display text-2xl md:text-3xl mb-2 leading-tight">{factor.question}</p>
        <p className="text-sm opacity-50 mb-8">{factor.highIsGood ? 'Higher = better for this factor' : 'Higher = more costly — rate honestly'}</p>

        <div className="space-y-6 mb-8">
          {options.map((opt, i) => (
            <div key={opt.name}>
              <p className="mono text-sm mb-3">{opt.name}</p>
              <div className="flex gap-2">
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <button
                    key={n}
                    onClick={() => setScore(i, factor.id, n)}
                    className={`flex-1 aspect-square text-sm font-bold border transition-all ${
                      opt.scores[factor.id] === n
                        ? 'bg-[#ffc107] text-black border-[#ffc107]'
                        : 'bg-transparent text-white border-white/30 hover:border-white'
                    }`}
                  >{n}</button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={nextFactor}
          disabled={!allScored}
          className={`btn-yellow ${!allScored ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          {currentFactor + 1 === FACTORS.length ? 'See my result' : 'Next factor →'}
        </button>
      </div>
    );
  }

  // ── OPTIONS INPUT ────────────────────────────────────────────────
  return (
    <div className="border-2 border-white p-6 md:p-8 mb-10">
      <p className="kicker mb-6">Decision Clarity · Step 1</p>
      <p className="display text-2xl md:text-3xl mb-8 leading-tight">What are you deciding between?</p>

      <div className="space-y-4 mb-6">
        {optionNames.map((name, i) => (
          <div key={i}>
            <label className="kicker text-xs block mb-2">Option {i + 1}</label>
            <input
              value={name}
              onChange={e => {
                const updated = [...optionNames];
                updated[i] = e.target.value;
                setOptionNames(updated);
              }}
              placeholder={i === 0 ? 'e.g. Stay in current job' : 'e.g. Take the new offer'}
              className="w-full bg-black text-white border-2 border-white/30 focus:border-[#ffc107] px-4 py-3 outline-none transition-colors"
            />
          </div>
        ))}
        {optionNames.length < 4 && (
          <button
            onClick={() => setOptionNames([...optionNames, ''])}
            className="text-xs mono opacity-40 hover:opacity-80 transition-opacity"
          >
            + Add another option
          </button>
        )}
      </div>

      <button
        onClick={startFactors}
        disabled={!allOptionsNamed}
        className={`btn-yellow ${!allOptionsNamed ? 'opacity-40 cursor-not-allowed' : ''}`}
      >
        Rate these options →
      </button>
      <p className="text-xs opacity-40 mt-3">You'll rate each option on 5 factors. Takes about 2 minutes.</p>
    </div>
  );
}
