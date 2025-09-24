// src/app/api/contents/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

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

const ContentSchema = z.object({
  title: z.string().min(3),
  caption: z.string().optional(),
  tag: z.string().optional(),
  deadline: z.coerce.date().optional(),
  status: z.enum(["DRAFT", "SCHEDULED", "PUBLISHED"]),
  sosmed: z.enum(["INSTAGRAM", "TIKTOK", "YOUTUBE", "FACEBOOK", "TWITTER"]),
});

export async function POST(req: Request) {
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

  const body = await req.json();
  const parsed = ContentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data", details: parsed.error },
      { status: 400 }
    );
  }

  const content = await prisma.content.create({
    data: {
      ...parsed.data,
      userId: user.id,
    },
  });

  return NextResponse.json(content);
}
