import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const top = await prisma.userProfile.findMany({
    orderBy: { xp: "desc" },
    take: 50,
    include: { user: { select: { id: true, name: true, image: true } } },
  });

  return NextResponse.json(
    top.map((p, i) => ({
      rank: i + 1,
      userId: p.userId,
      name: p.user.name ?? "ผู้ใช้ไม่ระบุชื่อ",
      image: p.user.image,
      xp: p.xp,
      level: p.level,
      totalQuestions: p.totalQuestions,
      correctAnswers: p.correctAnswers,
    }))
  );
}
