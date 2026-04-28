'use client';
import { useEffect, useState } from 'react';

type Pref = { reducedMotion: boolean; highContrast: boolean; dyslexiaFont: boolean };
const DEFAULTS: Pref = { reducedMotion: false, highContrast: false, dyslexiaFont: false };

export default function AccessibilityControls() {
  const [prefs, setPrefs] = useState<Pref>(DEFAULTS);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sor7ed-a11y');
      if (stored) setPrefs(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('reduce-motion', prefs.reducedMotion);
    root.classList.toggle('high-contrast', prefs.highContrast);
    root.classList.toggle('dyslexia-font', prefs.dyslexiaFont);
    try { localStorage.setItem('sor7ed-a11y', JSON.stringify(prefs)); } catch {}
  }, [prefs]);

  const toggle = (key: keyof Pref) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Accessibility settings"
        className="btn-yellow !text-sm !py-2 !px-3"
      >
        ♿ A11Y
      </button>
      {open && (
        <div
          role="dialog"
          aria-label="Accessibility controls"
          className="absolute bottom-14 right-0 w-64 bg-black border-2 border-[#ffc107] p-4"
        >
          <p className="kicker mb-3">Access controls</p>
          {(
            [
              ['reducedMotion', 'Reduced Motion'],
              ['highContrast', 'High Contrast'],
              ['dyslexiaFont', 'Dyslexia Font'],
            ] as [keyof Pref, string][]
          ).map(([key, label]) => (
            <label key={key} className="flex items-center gap-3 mb-2 cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={prefs[key]}
                onChange={() => toggle(key)}
                className="h-4 w-4 accent-[#ffc107]"
              />
              <span>{label}</span>
            </label>
          ))}
          <p className="text-xs mt-2 opacity-80">Saved to your device.</p>
        </div>
      )}
    </div>
  );
}
