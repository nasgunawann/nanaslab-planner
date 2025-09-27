import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ContentSchema } from "@/lib/schemas/content";
import type { Prisma, ContentStatus, SocialPlatform } from "@prisma/client";
import { z } from "zod";

// PATCH schema for partial updates
const PatchSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  caption: z.string().max(2000).nullable().optional(),
  tag: z.string().max(200).nullable().optional(),
  deadline: z
    .union([
      z.date(),
      z.string().transform((s) => {
        const d = new Date(s);
        if (isNaN(d.getTime())) throw new Error("Invalid date");
        return d;
      }),
      z.null(),
    ])
    .optional(),
  status: z
    .nativeEnum((await import("@prisma/client")).ContentStatus)
    .optional(),
  sosmed: z
    .nativeEnum((await import("@prisma/client")).SocialPlatform)
    .optional(),
});

// GET detail
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const content = await prisma.content.findUnique({ where: { id } });
  if (!content) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(content);
}

// UPDATE (replace)
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const body = await req.json();
    const parsed = ContentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const updated = await prisma.content.update({
      where: { id },
      data: {
        ...parsed.data,
        deadline: parsed.data.deadline ?? null,
      },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// PATCH (partial update)
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const body = await req.json();
    const parsed = PatchSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const val = parsed.data;
    const data: Prisma.ContentUpdateInput = {};

    if (val.title !== undefined) data.title = val.title;
    if (val.caption !== undefined) data.caption = val.caption ?? null;
    if (val.tag !== undefined) data.tag = val.tag ?? null;
    if (val.deadline !== undefined) data.deadline = val.deadline ?? null;
    if (val.status !== undefined) data.status = val.status as ContentStatus;
    if (val.sosmed !== undefined) data.sosmed = val.sosmed as SocialPlatform;

    const updated = await prisma.content.update({ where: { id }, data });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

// DELETE
export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    await prisma.content.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
