import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/lessons          → บทเรียนทั้งหมด จัดกลุ่มตามวิชา/หัวข้อ
// GET /api/lessons?topicId= → บทเรียนของหัวข้อนั้น
export async function GET(req: NextRequest) {
  const topicId = req.nextUrl.searchParams.get("topicId");

  if (topicId) {
    const lessons = await prisma.lesson.findMany({
      where: { topicId },
      orderBy: { order: "asc" },
    });
    return NextResponse.json(lessons);
  }

  // รวมเป็นโครงสร้าง subject → topic → lessons (เฉพาะหัวข้อที่มีบทเรียน)
  const subjects = await prisma.subject.findMany({
    orderBy: { order: "asc" },
    include: {
      topics: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
            select: { id: true, title: true, titleTh: true, order: true },
          },
        },
      },
    },
  });

  const result = subjects
    .map((s) => ({
      ...s,
      topics: s.topics.filter((t) => t.lessons.length > 0),
    }))
    .filter((s) => s.topics.length > 0);

  return NextResponse.json(result);
}
