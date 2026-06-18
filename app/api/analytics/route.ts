import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;

  // Get progress per topic
  const progress = await prisma.userProgress.findMany({
    where: { userId },
    include: { topic: { include: { subject: true } } },
  });

  // Group by subject
  const subjectMap = new Map<string, { name: string; nameTh: string; total: number; correct: number }>();
  for (const p of progress) {
    const key = p.topic.subject.id;
    const cur = subjectMap.get(key) ?? {
      name: p.topic.subject.name,
      nameTh: p.topic.subject.nameTh,
      total: 0,
      correct: 0,
    };
    cur.total += p.totalQuestions;
    cur.correct += p.correctAnswers;
    subjectMap.set(key, cur);
  }

  const subjectStats = Array.from(subjectMap.values()).map((s) => ({
    ...s,
    accuracy: s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0,
  }));

  // Recent sessions
  const recentSessions = await prisma.examSession.findMany({
    where: { userId, status: "COMPLETED" },
    orderBy: { endTime: "desc" },
    take: 10,
    select: { id: true, score: true, totalQuestions: true, endTime: true, mode: true },
  });

  return NextResponse.json({ subjectStats, recentSessions });
}
