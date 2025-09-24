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
