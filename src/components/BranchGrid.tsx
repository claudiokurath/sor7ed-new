import { BRANCHES } from '@/data/branches';

export default function BranchGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {BRANCHES.map((b) => (
        <article key={b.slug} className="branch-card">
          <div className="text-3xl mb-2" aria-hidden>{b.emoji}</div>
          <p className="display text-2xl mb-1">{b.name}</p>
          <p className="text-sm">{b.focus}</p>
        </article>
      ))}
    </div>
  );
}
