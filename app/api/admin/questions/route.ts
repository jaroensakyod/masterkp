import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (user?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { topicId, content, explanation, difficulty, options } = await req.json();

  const question = await prisma.question.create({
    data: {
      topicId,
      content,
      explanation,
      difficulty,
      isAI: false,
      options: { create: options },
    },
  });

  return NextResponse.json(question);
}
