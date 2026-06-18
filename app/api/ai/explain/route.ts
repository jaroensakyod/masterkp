import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { explainAnswer } from "@/lib/ai";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { questionId, selectedOptionId } = await req.json();

  const question = await prisma.question.findUnique({
    where: { id: questionId },
    include: { options: true },
  });
  if (!question) return NextResponse.json({ error: "Question not found" }, { status: 404 });

  const selectedOption = question.options.find((o) => o.id === selectedOptionId);
  const correctOption = question.options.find((o) => o.isCorrect);

  const explanation = await explainAnswer(
    question.content,
    selectedOption?.content ?? "(ไม่ได้เลือก)",
    correctOption?.content ?? "",
    question.explanation ?? ""
  );

  return NextResponse.json({ explanation });
}
