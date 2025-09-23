// src/app/api/contents/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const contents = await prisma.content.findMany({
    where: { userId: user.id },
    orderBy: { deadline: "asc" },
    select: {
      id: true,
      title: true,
      caption: true,
      tag: true,
      deadline: true,
      status: true,
      sosmed: true,
      createdAt: true,
    },
  });

  return NextResponse.json(contents);
}
