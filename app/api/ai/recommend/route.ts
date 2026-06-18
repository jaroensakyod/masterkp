import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { getStudyRecommendations } from "@/lib/ai";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const progress = await prisma.userProgress.findMany({
    where: { userId: session.user.id, totalQuestions: { gte: 3 } },
    include: { topic: true },
    orderBy: { correctAnswers: "asc" },
    take: 5,
  });

  if (progress.length === 0) {
    return NextResponse.json({
      recommendation: "เริ่มทำข้อสอบเพื่อให้ AI วิเคราะห์จุดอ่อนและแนะนำแผนการเรียนได้ครับ",
    });
  }

  const weakTopics = progress.map((p) => ({
    name: p.topic.nameTh,
    accuracy: p.totalQuestions > 0 ? Math.round((p.correctAnswers / p.totalQuestions) * 100) : 0,
  }));

  const recommendation = await getStudyRecommendations(weakTopics);
  return NextResponse.json({ recommendation });
}
