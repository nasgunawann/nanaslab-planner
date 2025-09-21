import { PrismaClient, Role } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // console.log("🗑 Menghapus semua user lama...");
  // await prisma.user.deleteMany(); // Hapus semua user (dev only)

  // ===== 1. Buat Admin =====
  const adminEmail = "admin@nanaslab.com";
  const adminPassword = "admin123"; // ganti sesuai kebutuhan
  const adminPasswordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.create({
    data: {
      name: "Administrator",
      email: adminEmail,
      passwordHash: adminPasswordHash,
      role: Role.ADMIN,
    },
  });
  console.log(`✅ Admin dibuat: ${adminEmail} / ${adminPassword}`);

  // ===== 2. Buat User Dummy =====
  const dummyCount = 5;
  for (let i = 0; i < dummyCount; i++) {
    const name = faker.person.fullName();
    const email = faker.internet
      .email({ firstName: name.split(" ")[0] })
      .toLowerCase();
    const passwordHash = await bcrypt.hash("password123", 10);

    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: Role.USER,
      },
    });
    console.log(`👤 User dummy dibuat: ${email}`);
  }

  console.log("🎯 Seed selesai!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
