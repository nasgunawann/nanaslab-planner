import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 422 }
      );
    }

    const emailNormalized = email.toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: { email: emailNormalized },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email sudah terdaftar" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email: emailNormalized,
        passwordHash,
      },
      select: { id: true, name: true, email: true },
    });

    return NextResponse.json(
      { message: "Registrasi berhasil", user },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ error: "Gagal register" }, { status: 500 });
  }
}
