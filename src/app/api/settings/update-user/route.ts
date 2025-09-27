import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // pastikan file ini ada
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, email, image, currentPassword, newPassword } =
      await req.json();

    // Cari user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updateData: {
      name?: string;
      email?: string;
      image?: string;
      passwordHash?: string;
    } = {};

    // Update profil umum
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (image) updateData.image = image;

    // Update password jika diminta
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: "Current password required" },
          { status: 400 }
        );
      }

      const valid = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!valid) {
        return NextResponse.json(
          { error: "Invalid current password" },
          { status: 400 }
        );
      }

      const hashed = await bcrypt.hash(newPassword, 10);
      updateData.passwordHash = hashed;
    }

    try {
      const updated = await prisma.user.update({
        where: { id: user.id },
        data: updateData,
      });

      return NextResponse.json({ user: updated });
    } catch (err: any) {
      // Tangani error unique constraint (email duplicate)
      if (err.code === "P2002") {
        return NextResponse.json(
          { error: "Email already in use" },
          { status: 409 }
        );
      }
      throw err;
    }
  } catch (err: any) {
    console.error("Update user error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update user" },
      { status: 500 }
    );
  }
}
