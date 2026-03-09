// ── Perfumer harmony-score rank system ───────────────────────────────────────
export interface PerfumerRank {
  title: string;
  tier: string;
  color: string;
}

const PERFUMER_RANK_TABLE: PerfumerRank[] = [
  { title: "Grand Perfumer",  tier: "LEGENDARY", color: "text-accent" },
  { title: "Master Alchemist", tier: "MASTER",   color: "text-primary" },
  { title: "Scent Architect",  tier: "EXPERT",   color: "text-primary" },
  { title: "Essence Weaver",   tier: "ADEPT",    color: "text-muted-foreground" },
  { title: "Apprentice Nose",  tier: "NOVICE",   color: "text-muted-foreground" },
];

const PERFUMER_RANK_THRESHOLDS = [95, 85, 70, 50, 0];

export function getPerfumerRank(score: number): PerfumerRank {
  const idx = PERFUMER_RANK_THRESHOLDS.findIndex((t) => score >= t);
  return PERFUMER_RANK_TABLE[idx >= 0 ? idx : PERFUMER_RANK_TABLE.length - 1];
}

// ── Generic "highest rank whose minSales ≤ value" helper ─────────────────────
export function getHighestRank<T extends { minSales: number }>(
  ranks: T[],
  value: number,
): T {
  let best = ranks[0];
  for (const r of ranks) {
    if (value >= r.minSales) best = r;
  }
  return best;
}
