import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json(
      { error: "Email tidak ditemukan" },
      { status: 404 }
    );
  }

  const token = randomUUID();
  const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 jam

  await prisma.passwordResetToken.create({
    data: {
      token,
      userId: user.id,
      expires,
    },
  });

  // MVP: tampilkan token (nanti diganti kirim email)
  return NextResponse.json({ message: "Token dibuat", token });
}
