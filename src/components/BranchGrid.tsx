import { BRANCHES } from '@/data/branches';

export default function BranchGrid() {
  return (
    <ul className="space-y-5">
      {BRANCHES.map((b) => (
        <li key={b.slug} className="flex gap-4 items-baseline">
          <span aria-hidden className="text-xl shrink-0">{b.emoji}</span>
          <div>
            <p className="display text-2xl text-[#ffc107] leading-none">{b.name}</p>
            <p className="text-sm opacity-60 mt-1">{b.focus}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
