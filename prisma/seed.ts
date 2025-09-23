import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.content.createMany({
    data: [
      {
        userId: "cmfty2kal0000eiacslbhet7h",
        title: "Promo Akhir Tahun",
        caption: "Dapatkan diskon hingga 50% untuk semua produk!",
        tag: "promo",
        deadline: new Date("2025-12-20"),
        status: "SCHEDULED",
        sosmed: "INSTAGRAM",
      },
      {
        userId: "cmfty2kal0000eiacslbhet7h",
        title: "Tips Bisnis Online",
        caption: "5 strategi untuk meningkatkan penjualan online Anda.",
        tag: "tips",
        deadline: new Date("2025-10-05"),
        status: "DRAFT",
        sosmed: "TIKTOK",
      },
      {
        userId: "cmfty2kal0000eiacslbhet7h",
        title: "Video Behind the Scenes",
        caption: "Lihat proses kreatif di balik layar produksi kami.",
        tag: "bts",
        deadline: new Date("2025-10-15"),
        status: "PUBLISHED",
        sosmed: "YOUTUBE",
      },
    ],
  });

  // Contoh ScheduledPost dengan override caption
  await prisma.scheduledPost.create({
    data: {
      userId: "cmfty2kal0000eiacslbhet7h",
      contentId: (await prisma.content.findFirst({
        where: { title: "Promo Akhir Tahun" },
      }))!.id,
      platform: "INSTAGRAM",
      scheduledAt: new Date("2025-12-20T09:00:00Z"),
      status: "SCHEDULED",
      captionOverride:
        "Promo spesial akhir tahun! Jangan sampai ketinggalan 🎉",
    },
  });

  console.log("✅ Seed konten & jadwal selesai");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
