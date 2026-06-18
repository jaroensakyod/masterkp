import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const subjects = await prisma.subject.findMany({
    orderBy: { order: "asc" },
    include: {
      topics: {
        orderBy: { order: "asc" },
        include: { _count: { select: { questions: true } } },
      },
    },
  });
  return NextResponse.json(subjects);
}
