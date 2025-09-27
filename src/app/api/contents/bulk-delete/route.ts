import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // pastikan path prisma sesuai project kamu

export async function POST(req: Request) {
  try {
    const { ids } = await req.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "Array ids wajib diisi" },
        { status: 400 }
      );
    }

    // Hapus banyak konten sekaligus
    await prisma.content.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Bulk delete error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus konten" },
      { status: 500 }
    );
  }
}
