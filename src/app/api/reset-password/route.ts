import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { token, password } = await req.json();

  const reset = await prisma.passwordResetToken.findUnique({
    where: { token },
  });
  if (!reset || reset.expires < new Date()) {
    return NextResponse.json(
      { error: "Token tidak valid atau kadaluarsa" },
      { status: 400 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: reset.userId },
    data: { passwordHash },
  });

  await prisma.passwordResetToken.delete({ where: { token } });

  return NextResponse.json({ message: "Password berhasil direset" });
}
