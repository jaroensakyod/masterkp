export const LEVELS = [
  { level: 1, title: "ผู้สมัคร", minXp: 0 },
  { level: 2, title: "นักเรียน", minXp: 100 },
  { level: 3, title: "ผู้ช่วยเจ้าหน้าที่", minXp: 300 },
  { level: 4, title: "เจ้าหน้าที่", minXp: 600 },
  { level: 5, title: "เจ้าพนักงาน", minXp: 1000 },
  { level: 6, title: "นักวิชาการ", minXp: 1500 },
  { level: 7, title: "ข้าราชการ", minXp: 2200 },
  { level: 8, title: "ข้าราชการชำนาญการ", minXp: 3000 },
  { level: 9, title: "ข้าราชการชำนาญการพิเศษ", minXp: 4000 },
  { level: 10, title: "ผู้เชี่ยวชาญ กพ", minXp: 5500 },
];

export const XP_REWARDS = {
  CORRECT_ANSWER: 5,
  COMPLETE_EXAM: 50,
  SCORE_ABOVE_80: 25,
  DAILY_STREAK: 10,
};

export function getLevelFromXp(xp: number) {
  let currentLevel = LEVELS[0];
  for (const level of LEVELS) {
    if (xp >= level.minXp) currentLevel = level;
    else break;
  }
  return currentLevel;
}

export function getNextLevel(currentLevel: number) {
  return LEVELS.find((l) => l.level === currentLevel + 1) ?? null;
}

export function getXpProgress(xp: number) {
  const current = getLevelFromXp(xp);
  const next = getNextLevel(current.level);
  if (!next) return { current, next: null, progress: 100, xpInLevel: 0, xpNeeded: 0 };
  const xpInLevel = xp - current.minXp;
  const xpNeeded = next.minXp - current.minXp;
  const progress = Math.round((xpInLevel / xpNeeded) * 100);
  return { current, next, progress, xpInLevel, xpNeeded };
}

export function calculateExamXp(correctAnswers: number, totalQuestions: number): number {
  let xp = correctAnswers * XP_REWARDS.CORRECT_ANSWER;
  xp += XP_REWARDS.COMPLETE_EXAM;
  const pct = (correctAnswers / totalQuestions) * 100;
  if (pct >= 80) xp += XP_REWARDS.SCORE_ABOVE_80;
  return xp;
}
