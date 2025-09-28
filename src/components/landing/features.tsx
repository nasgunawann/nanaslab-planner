import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  IconSparkles,
  IconLayoutDashboard,
  IconChartPie,
  IconUsers,
  IconClock,
  IconBolt,
} from "@tabler/icons-react";
import Image from "next/image";

const features = [
  {
    icon: IconSparkles,
    title: "AI Chat Assistant",
    description:
      "Dapatkan bantuan instan dengan asisten chat bertenaga AI untuk menjawab pertanyaan dan memberikan rekomendasi.",
    screenshot: "/static/chatbot.png",
  },
  {
    icon: IconLayoutDashboard,
    title: "Dashboard Overview",
    description:
      "Pantau semua metrik, seperti status dan jadwal penting Anda dalam satu tampilan yang mudah dipahami dan diakses.",
    screenshot: "/static/metrics.png",
  },
  {
    icon: IconChartPie,
    title: "Ekspor & Copy Cepat",
    description:
      "Perencanaan konten yang efisien dengan fitur ekspor dan salin cepat ke berbagai platform media sosial.",
    screenshot: "/static/content.png",
  },
  {
    icon: IconUsers,
    title: "Buat Konten Baru",
    description:
      "Mulai dengan mengisi judul, platform, dan deadline. Formulir yang sederhana memastikan Anda tidak kehilangan fokus.",
    screenshot: "/static/addcontent.png",
  },
  {
    icon: IconBolt,
    title: "Gunakan AI untuk Membantu",
    description:
      "AI Assistant akan memberikan saran caption, hashtag, atau bahkan ide judul. Anda bisa langsung menerapkannya.",
    screenshot: "/static/ai-chat.png",
  },
  {
    icon: IconClock,
    title: "Jadwalkan & Publikasikan",
    description:
      "Setelah konten siap, atur jadwal di kalender visual. Semua posting akan tersusun rapi sesuai timeline yang Anda tentukan.",
    screenshot: "/static/calendar.png",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="max-w-(--breakpoint-xl) mx-auto w-full py-12 xs:py-20 px-6"
    >
      <h2 className="text-3xl xs:text-4xl md:text-5xl md:leading-[3.5rem] font-bold tracking-tight sm:max-w-3xl sm:text-center sm:mx-auto">
        Kenapa Memilih Nanasgunung Content Planner?
      </h2>
      <div className="mt-8 xs:mt-14 w-full mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="flex flex-col border rounded-xl overflow-hidden shadow-none"
          >
            <CardHeader>
              <feature.icon className="text-primary" />
              <h4 className="mt-3 text-xl font-bold tracking-tight">
                {feature.title}
              </h4>
              <p className="mt-1 text-muted-foreground text-sm xs:text-[17px]">
                {feature.description}
              </p>
            </CardHeader>

            {feature.screenshot ? (
              <CardContent className="mt-auto px-0 pb-0 relative h-52">
                <Image
                  src={feature.screenshot}
                  alt={feature.title}
                  fill
                  className="object-cover bg-muted shadow-lg h-52 ml-6 rounded-tl-4xl rounded-bl-4xl"
                />
              </CardContent>
            ) : (
              <CardContent className="mt-auto px-0 pb-0">
                <div className="bg-muted h-52 ml-6 rounded-tl-4xl rounded-bl-4xl" />
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Features;
