import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { sessionId } = await params;

  const examSession = await prisma.examSession.findUnique({
    where: { id: sessionId, userId: session.user.id },
    include: {
      answers: {
        include: {
          question: {
            include: {
              options: { orderBy: { order: "asc" } },
              topic: { include: { subject: true } },
            },
          },
        },
      },
    },
  });

  if (!examSession) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(examSession);
}
