import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sessions = await prisma.examSession.findMany({
    where: { userId: session.user.id, status: "COMPLETED" },
    orderBy: { endTime: "desc" },
    take: 50,
    select: {
      id: true,
      mode: true,
      score: true,
      totalQuestions: true,
      startTime: true,
      endTime: true,
    },
  });

  return NextResponse.json(sessions);
}
