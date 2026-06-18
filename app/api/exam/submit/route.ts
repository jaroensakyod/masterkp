import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { calculateExamXp, getLevelFromXp } from "@/lib/xp";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { sessionId, answers } = await req.json();
  // answers: Array<{ questionId, selectedOptionId, timeSpent }>

  const examSession = await prisma.examSession.findUnique({
    where: { id: sessionId, userId: session.user.id },
  });
  if (!examSession) return NextResponse.json({ error: "Session not found" }, { status: 404 });

  // Fetch correct answers
  const questions = await prisma.question.findMany({
    where: { id: { in: answers.map((a: { questionId: string }) => a.questionId) } },
    include: { options: true, topic: { include: { subject: true } } },
  });

  const qMap = new Map<string, (typeof questions)[0]>(questions.map((q) => [q.id, q]));

  let correctCount = 0;
  const answerData = answers.map((a: { questionId: string; selectedOptionId: string; timeSpent: number }) => {
    const q = qMap.get(a.questionId);
    const correctOption = q?.options.find((o) => o.isCorrect);
    const isCorrect = a.selectedOptionId === correctOption?.id;
    if (isCorrect) correctCount++;
    return {
      sessionId,
      questionId: a.questionId,
      selectedOptionId: a.selectedOptionId ?? null,
      isCorrect,
      timeSpent: a.timeSpent ?? null,
    };
  });

  // Save answers
  await prisma.examAnswer.createMany({ data: answerData });

  // Update session
  await prisma.examSession.update({
    where: { id: sessionId },
    data: { status: "COMPLETED", score: correctCount, endTime: new Date() },
  });

  // Award XP
  const xpEarned = calculateExamXp(correctCount, answers.length);
  const profile = await prisma.userProfile.findUnique({ where: { userId: session.user.id } });
  const newXp = (profile?.xp ?? 0) + xpEarned;
  const newLevel = getLevelFromXp(newXp).level;

  await prisma.userProfile.update({
    where: { userId: session.user.id },
    data: {
      xp: newXp,
      level: newLevel,
      totalQuestions: { increment: answers.length },
      correctAnswers: { increment: correctCount },
      lastStudyDate: new Date(),
    },
  });

  // Update UserProgress per topic
  const topicProgress = new Map<string, { total: number; correct: number }>();
  for (const a of answerData) {
    const q = qMap.get(a.questionId);
    if (!q) continue;
    const cur = topicProgress.get(q.topicId) ?? { total: 0, correct: 0 };
    cur.total++;
    if (a.isCorrect) cur.correct++;
    topicProgress.set(q.topicId, cur);
  }
  for (const [topicId, prog] of topicProgress) {
    await prisma.userProgress.upsert({
      where: { userId_topicId: { userId: session.user.id, topicId } },
      update: {
        totalQuestions: { increment: prog.total },
        correctAnswers: { increment: prog.correct },
        lastPracticed: new Date(),
      },
      create: {
        userId: session.user.id,
        topicId,
        totalQuestions: prog.total,
        correctAnswers: prog.correct,
        lastPracticed: new Date(),
      },
    });
  }

  return NextResponse.json({
    score: correctCount,
    total: answers.length,
    xpEarned,
    newXp,
    newLevel,
  });
}
