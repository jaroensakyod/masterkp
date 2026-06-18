import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const topicId = searchParams.get("topicId");
  const mode = searchParams.get("mode"); // practice | exam
  const limit = parseInt(searchParams.get("limit") ?? "10");

  const where = topicId ? { topicId } : {};

  const questions = await prisma.question.findMany({
    where,
    include: { options: { orderBy: { order: "asc" } }, topic: { include: { subject: true } } },
    take: mode === "exam" ? 100 : limit,
    orderBy: { createdAt: "asc" },
  });

  // Shuffle for exam mode
  if (mode === "exam") {
    questions.sort(() => Math.random() - 0.5);
  }

  return NextResponse.json(questions);
}
