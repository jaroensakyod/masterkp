import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const topicIds = searchParams.getAll("topicId");
  const mode = searchParams.get("mode"); // practice | exam
  const limit = parseInt(searchParams.get("limit") ?? "10");
  const ids = searchParams.getAll("id"); // เจาะจงรายข้อ (ใช้กับสอบจำลอง/เฉพาะวิชา)

  // ถ้าระบุ id มา ให้ดึงเฉพาะข้อเหล่านั้นและคงลำดับตามที่ส่งมา
  if (ids.length > 0) {
    const questions = await prisma.question.findMany({
      where: { id: { in: ids } },
      include: { options: { orderBy: { order: "asc" } }, topic: { include: { subject: true } } },
    });
    const byId = new Map(questions.map((q) => [q.id, q]));
    const ordered = ids.map((id) => byId.get(id)).filter(Boolean);
    return NextResponse.json(ordered);
  }

  const where =
    topicIds.length > 0 ? { topicId: { in: topicIds } } : {};

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
