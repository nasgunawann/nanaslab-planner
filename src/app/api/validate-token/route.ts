import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ error: "Token wajib diisi" }, { status: 400 });
  }

  const reset = await prisma.passwordResetToken.findUnique({
    where: { token },
  });

  if (!reset || reset.expires < new Date()) {
    return NextResponse.json(
      { error: "Token tidak valid atau kadaluarsa" },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: "Token valid", userId: reset.userId });
}
