import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "กรุณากรอกข้อมูลให้ครบ" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "อีเมลนี้ถูกใช้งานแล้ว" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        profile: {
          create: { xp: 0, level: 1, streak: 0 },
        },
      },
    });

    return NextResponse.json({ id: user.id, email: user.email });
  } catch (err) {
    console.error("register error:", err);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดของระบบ กรุณาลองใหม่อีกครั้ง" },
      { status: 500 }
    );
  }
}
