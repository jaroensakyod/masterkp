import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      profile: true,
      userAchievements: {
        include: { achievement: true },
        orderBy: { unlockedAt: "desc" },
        take: 10,
      },
    },
  });

  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const progress = await prisma.userProgress.findMany({
    where: { userId },
    include: { topic: { include: { subject: true } } },
  });

  return NextResponse.json({
    id: user.id,
    name: user.name,
    image: user.image,
    profile: user.profile,
    achievements: user.userAchievements,
    progress,
  });
}
