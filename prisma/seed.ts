import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst();
  if (!user) {
    console.error("No user found. Please create a user first.");
    return;
  }

  // Template data
  const sosmeds = [
    "INSTAGRAM",
    "TIKTOK",
    "FACEBOOK",
    "YOUTUBE",
    "TWITTER",
  ] as const;
  const statuses = ["DRAFT", "SCHEDULED", "PUBLISHED"] as const;

  const titles = [
    "Tips & Tricks {sosmed}",
    "Behind the Scenes {sosmed}",
    "Capstone Showcase {sosmed}",
    "Weekly Update {sosmed}",
    "Highlight Feature {sosmed}",
    "Storytelling {sosmed}",
    "Engagement Post {sosmed}",
    "Promo Campaign {sosmed}",
  ];

  const captions = [
    "Jangan lewatkan update terbaru 🚀",
    "Proses kreatif di balik layar ✨",
    "Capstone project siap tampil 🎉",
    "Konten ini untuk meningkatkan engagement 📈",
    "Cerita singkat perjalanan tim 💡",
    "Rayakan milestone baru 🎊",
    "Konten showcase presentasi 🎥",
    "Ikuti terus update mingguan 🔔",
  ];

  const hashtags = [
    "#kontenhariini",
    "#capstone",
    "#project",
    "#showcase",
    "#timkreatif",
    "#belajarcoding",
    "#uiux",
    "#fullstack",
    "#nextjs",
    "#prisma",
    "#opensource",
    "#startup",
    "#community",
    "#designsystem",
    "#contentplanner",
    "#productivity",
    "#inspiration",
    "#milestone",
    "#devlife",
    "#creativejourney",
  ];

  function randomPick<T>(arr: readonly T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function randomHashtags() {
    const count = Math.floor(Math.random() * 3) + 1; // 1–3 hashtag
    const shuffled = [...hashtags].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).join(" ");
  }

  // Helper: generate tanggal sesuai pola
  function generateDatesForMonth(year: number, month: number): Date[] {
    const dates: Date[] = [];
    const current = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);

    const oddMonth = (month + 1) % 2 === 1; // bulan ganjil
    const allowedDays = oddMonth ? [1, 3, 5] : [2, 4, 6]; // Mon/Wed/Fri atau Tue/Thu/Sat

    while (current <= last) {
      if (allowedDays.includes(current.getDay())) {
        dates.push(new Date(current));
      }
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }

  // Generate full tahun 2025
  const seedData: any[] = [];
  for (let month = 0; month < 12; month++) {
    const dates = generateDatesForMonth(2025, month);
    dates.forEach((date) => {
      const count = Math.random() > 0.5 ? 2 : 1; // 1–2 konten per hari
      for (let i = 0; i < count; i++) {
        const sosmed = randomPick(sosmeds);
        const status = randomPick(statuses);
        const titleTemplate = randomPick(titles).replace("{sosmed}", sosmed);
        const caption = randomPick(captions);

        seedData.push({
          userId: user.id,
          title: `${titleTemplate} #${i + 1}`,
          caption,
          tag: randomHashtags(),
          deadline: date,
          status,
          sosmed,
        });
      }
    });
  }

  await prisma.content.createMany({ data: seedData });
  console.log(
    `✅ Seed ${seedData.length} konten tahun 2025 berhasil ditambahkan!`
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
