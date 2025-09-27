// app/page.tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 flex flex-col-reverse lg:flex-row items-center gap-10">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold">
              Rencanakan, Kelola, dan Publikasikan Konten Sosial Anda dengan
              Lebih Mudah.
            </h1>
            <p className="text-lg text-gray-700">
              Nanasgunung Content Planner membantu UMKM, kreator, dan tim
              marketing mengatur ide, menjadwalkan posting, dan memanfaatkan AI
              untuk membuat caption yang menarik.
            </p>
            <div className="flex gap-4">
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                Coba Gratis Sekarang
              </Button>
              <Button variant="outline">Lihat Demo</Button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <Image
              src="/images/dashboard-mockup.png"
              alt="Dashboard Nanasgunung"
              width={600}
              height={400}
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center space-y-10">
          <h2 className="text-3xl font-semibold">
            Kenapa Memilih Nanasgunung?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center">
              <CardContent>
                <p className="text-3xl">📅</p>
                <h3 className="font-semibold mt-4">Kalender Visual</h3>
                <p className="text-gray-600 mt-2">
                  Drag & drop jadwal posting dengan mudah.
                </p>
              </CardContent>
            </Card>
            <Card className="p-6 text-center">
              <CardContent>
                <p className="text-3xl">✍️</p>
                <h3 className="font-semibold mt-4">AI Assistant</h3>
                <p className="text-gray-600 mt-2">
                  Generate caption & hashtag (ID/EN) secara instan.
                </p>
              </CardContent>
            </Card>
            <Card className="p-6 text-center">
              <CardContent>
                <p className="text-3xl">📊</p>
                <h3 className="font-semibold mt-4">Dashboard Ringkas</h3>
                <p className="text-gray-600 mt-2">
                  Pantau draft, jadwal, dan konten terpublikasi.
                </p>
              </CardContent>
            </Card>
            <Card className="p-6 text-center">
              <CardContent>
                <p className="text-3xl">🔗</p>
                <h3 className="font-semibold mt-4">Ekspor & Copy Cepat</h3>
                <p className="text-gray-600 mt-2">
                  Siap untuk Instagram, YouTube, dll.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center space-y-10">
          <h2 className="text-3xl font-semibold">Cara Kerjanya</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <Card className="p-6">
              <CardContent>
                <h3 className="font-semibold text-xl">1. Buat Konten Baru</h3>
                <p className="text-gray-600 mt-2">
                  Isi judul, platform, dan deadline konten Anda.
                </p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent>
                <h3 className="font-semibold text-xl">2. Gunakan AI</h3>
                <p className="text-gray-600 mt-2">
                  Dapatkan caption & hashtag siap pakai.
                </p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent>
                <h3 className="font-semibold text-xl">
                  3. Jadwalkan & Publikasikan
                </h3>
                <p className="text-gray-600 mt-2">
                  Atur di kalender, ekspor, dan posting ke platform Anda.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center space-y-10">
          <h2 className="text-3xl font-semibold">Fitur Unggulan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-10">
            {[
              "AI Chatbot",
              "AI Assistant di Form",
              "Profil Usaha",
              "Multi-bahasa",
              "UI Minimalis",
            ].map((feat) => (
              <Card key={feat} className="p-6 text-center">
                <CardContent>
                  <h3 className="font-semibold">{feat}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-semibold">Siapa yang Bisa Memakai?</h2>
          <p className="text-gray-600">
            UMKM, kreator konten, dan tim marketing kecil.
          </p>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold">Testimoni</h2>
          <p className="mt-6 text-gray-600 italic">
            “Dengan Nanasgunung, jadwal konten saya jadi lebih teratur dan
            caption lebih engaging.”
          </p>
        </div>
      </section>

      {/* Pricing / CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-semibold">Coba Gratis 7 Hari</h2>
          <Button className="bg-green-600 text-white hover:bg-green-700 mt-4">
            Mulai Rencanakan Konten Anda Hari Ini
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 Nanasgunung Content Planner</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {["Fitur", "Harga", "Bantuan", "Kontak"].map((link) => (
              <a key={link} href="#" className="hover:text-white">
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
