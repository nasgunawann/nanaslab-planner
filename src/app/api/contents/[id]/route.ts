import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ContentSchema } from "@/lib/schemas/content";

// GET detail
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const content = await prisma.content.findUnique({
    where: { id: params.id },
  });
  if (!content) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(content);
}

// UPDATE
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const parsed = ContentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error },
        { status: 400 }
      );
    }

    const updated = await prisma.content.update({
      where: { id: params.id },
      data: {
        ...parsed.data,
        deadline: parsed.data.deadline ?? null,
      },
    });

    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

// PATCH (partial update)
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    // hanya ambil field yang diizinkan
    const allowed = ["title", "caption", "tag", "deadline", "status", "sosmed"];
    const data: any = {};
    for (const key of allowed) {
      if (body[key] !== undefined) data[key] = body[key];
    }

    const updated = await prisma.content.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

// DELETE
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.content.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
