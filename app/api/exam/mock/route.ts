import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// สัดส่วนข้อสอบเสมือนจริง อิงโครงสร้างสนามจริง ก.พ. ภาค ก
// วิชาคิดวิเคราะห์ ~50% · ภาษาอังกฤษ ~25% · ความเป็นข้าราชการที่ดี ~25%
const BLUEPRINT: Record<string, number> = {
  "general-ability": 20, // คณิต/อนุกรม/เงื่อนไขสัญลักษณ์/ตาราง/อุปมา
  "thai-language": 12, // ภาษาไทย (อยู่ในวิชาคิดวิเคราะห์)
  english: 12, // ภาษาอังกฤษ
  "civil-service": 12, // กฎหมายปกครอง/ระเบียบ/จริยธรรม
  "general-knowledge": 4, // ความรู้ทั่วไป
};

function pickRandom<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

// GET /api/exam/mock → สุ่มข้อสอบตามสัดส่วน คืน { questionIds }
export async function GET() {
  const questionIds: string[] = [];

  for (const [slug, count] of Object.entries(BLUEPRINT)) {
    const questions = await prisma.question.findMany({
      where: { topic: { subject: { slug } } },
      select: { id: true },
    });
    questionIds.push(...pickRandom(questions, count).map((q) => q.id));
  }

  // คละลำดับข้ามวิชาให้เหมือนสนามจริง
  return NextResponse.json({ questionIds: pickRandom(questionIds, questionIds.length) });
}
