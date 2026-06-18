import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;

  const profile = await prisma.userProfile.findUnique({ where: { userId } });

  const recentSessions = await prisma.examSession.findMany({
    where: { userId, status: "COMPLETED" },
    orderBy: { endTime: "desc" },
    take: 5,
    select: { id: true, score: true, totalQuestions: true, endTime: true, mode: true },
  });

  // Weak topics (lowest accuracy with at least 3 attempts)
  const progress = await prisma.userProgress.findMany({
    where: { userId, totalQuestions: { gte: 3 } },
    include: { topic: { include: { subject: true } } },
    orderBy: { correctAnswers: "asc" },
    take: 3,
  });

  const weakTopics = progress.map((p) => ({
    topicId: p.topicId,
    topicName: p.topic.nameTh,
    subjectName: p.topic.subject.nameTh,
    accuracy: p.totalQuestions > 0 ? Math.round((p.correctAnswers / p.totalQuestions) * 100) : 0,
  }));

  // Achievements
  const achievements = await prisma.userAchievement.findMany({
    where: { userId },
    include: { achievement: true },
    orderBy: { unlockedAt: "desc" },
    take: 5,
  });

  return NextResponse.json({ profile, recentSessions, weakTopics, achievements });
}
