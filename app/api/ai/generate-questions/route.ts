import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { generateQuestions } from "@/lib/ai";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Only admins can generate questions
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { topicId, difficulty, count } = await req.json();

  const topic = await prisma.topic.findUnique({
    where: { id: topicId },
    include: { subject: true },
  });
  if (!topic) return NextResponse.json({ error: "Topic not found" }, { status: 404 });

  const generated = await generateQuestions(
    topic.nameTh,
    topic.subject.nameTh,
    difficulty ?? "MEDIUM",
    count ?? 5
  );

  const created = await Promise.all(
    generated.map((q) =>
      prisma.question.create({
        data: {
          topicId,
          content: q.content,
          explanation: q.explanation,
          difficulty: difficulty ?? "MEDIUM",
          isAI: true,
          options: { create: q.options },
        },
      })
    )
  );

  return NextResponse.json({ created: created.length });
}
