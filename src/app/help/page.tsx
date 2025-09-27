"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";

export default function HelpPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-6 overflow-y-auto">
          <div className="max-w-3xl mx-auto w-full space-y-8">
            <h1 className="text-3xl font-bold">Bantuan & Panduan</h1>
            <p className="text-muted-foreground">
              Halaman ini berisi panduan singkat untuk menggunakan fitur utama
              aplikasi Content Planner.
            </p>

            <Separator />

            {/* Cara Menambah Konten */}
            <Card>
              <CardHeader>
                <CardTitle>Cara Menambah Konten</CardTitle>
                <CardDescription>
                  Panduan membuat konten baru di dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <ol className="list-decimal list-inside space-y-1">
                  <li>
                    Buka menu <strong>Dashboard</strong> → klik tombol{" "}
                    <em>Tambah Konten</em>.
                  </li>
                  <li>Isi form dengan detail konten yang ingin dibuat.</li>
                  <li>
                    Simpan untuk menyimpan sebagai draft, atau jadwalkan untuk
                    publish otomatis.
                  </li>
                </ol>
              </CardContent>
            </Card>

            {/* Judul & Caption */}
            <Card>
              <CardHeader>
                <CardTitle>Set Judul & Caption</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Judul digunakan sebagai identitas konten. Caption bisa ditulis
                  manual atau menggunakan <strong>AI Caption Generator</strong>{" "}
                  untuk ide cepat.
                </p>
              </CardContent>
            </Card>

            {/* Tag & Hashtag */}
            <Card>
              <CardHeader>
                <CardTitle>Tag & Hashtag</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Tambahkan <em>tag</em> atau <em>hashtag</em> untuk memudahkan
                  pencarian dan meningkatkan jangkauan di media sosial.
                </p>
              </CardContent>
            </Card>

            {/* Deadline */}
            <Card>
              <CardHeader>
                <CardTitle>Tanggal Deadline</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Atur deadline untuk setiap konten agar tim tahu kapan konten
                  harus selesai dibuat atau dipublikasikan.
                </p>
              </CardContent>
            </Card>

            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>Status Konten</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong>Draft</strong> → konten masih disimpan, belum
                    dijadwalkan.
                  </li>
                  <li>
                    <strong>Scheduled</strong> → konten sudah dijadwalkan untuk
                    publish otomatis.
                  </li>
                  <li>
                    <strong>Published</strong> → konten sudah tayang di media
                    sosial.
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Sosial Media */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Sosial Media</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Konten bisa dipublikasikan ke berbagai platform: Instagram, X
                  (Twitter), TikTok, YouTube, dan Facebook. Pilih platform
                  sesuai target audiens.
                </p>
              </CardContent>
            </Card>

            {/* Kalender Konten */}
            <Card>
              <CardHeader>
                <CardTitle>Kalender</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Content Calendar menampilkan semua posting yang sudah
                  dijadwalkan dalam tampilan kalender. Fitur ini memudahkan tim
                  untuk melihat timeline, menghindari bentrok jadwal, dan
                  menjaga konsistensi publikasi.
                </p>
              </CardContent>
            </Card>

            {/* AI Chatbot Planner */}
            <Card>
              <CardHeader>
                <CardTitle>AI Chatbot Planner</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  AI Chatbot Planner adalah asisten pintar yang membantu
                  brainstorming dengan merencanakan ide konten, membuat caption,
                  dan memberi saran hashtag. Cukup ketikkan kebutuhanmu, AI akan
                  memberikan rekomendasi yang bisa langsung dipakai.
                </p>
              </CardContent>
            </Card>
            {/* Menu Pengaturan */}
            <Card>
              <CardHeader>
                <CardTitle>Menu Pengaturan</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Menu <strong>Pengaturan</strong> digunakan untuk mengelola
                  akun dan preferensi aplikasi. Beberapa hal yang bisa dilakukan
                  di sini:
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>
                    <strong>Profile</strong> → ubah nama, email, dan foto
                    profil.
                  </li>
                  <li>
                    <strong>Security</strong> → ganti password lama dengan yang
                    baru.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
