"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { parseDate } from "chrono-node";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { toast } from "sonner";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

const schema = z.object({
  title: z.string().min(3),
  caption: z.string().optional(),
  tag: z.string().optional(),
  deadline: z.string().optional(),
  status: z.enum(["DRAFT", "SCHEDULED", "PUBLISHED"]),
  sosmed: z.enum(["INSTAGRAM", "TIKTOK", "FACEBOOK", "YOUTUBE", "TWITTER"]),
});

function formatDate(date: Date | undefined) {
  if (!date) return "";
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function TambahKontenPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    caption: "",
    tag: "",
    deadline: "",
    status: "__placeholder__",
    sosmed: "__placeholder__",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(undefined);
  const [calendarText, setCalendarText] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setError("Data tidak valid");
      setIsLoading(false);
      return;
    }

    if (
      form.status === "__placeholder__" ||
      form.sosmed === "__placeholder__"
    ) {
      setError("Status dan platform sosial harus dipilih");
      setIsLoading(false);
      return;
    }

    let payload = { ...parsed.data };

    // hapus deadline kalau kosong
    if (!payload.deadline) {
      delete payload.deadline;
    }

    const res = await fetch("/api/contents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setError("Gagal menyimpan konten");
      setIsLoading(false);
      return;
    }

    toast.success("Konten berhasil disimpan!");
    setTimeout(() => {
      router.push("/content");
    }, 1500);
  }

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
        <div className="flex flex-1 flex-col px-6 py-8">
          <h1 className="text-2xl font-semibold mb-6">Tambah Konten Baru</h1>
          <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
            <div className="space-y-2">
              <Label htmlFor="title">Judul</Label>
              <Input
                id="title"
                placeholder="Beri judul pada konten"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="caption">Caption</Label>
              <Textarea
                id="caption"
                placeholder="Tulis caption di sini..."
                value={form.caption}
                onChange={(e) => setForm({ ...form, caption: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tag">Tag</Label>
              <Input
                id="tag"
                placeholder="#hashtag1, #hashtag2..."
                value={form.tag}
                onChange={(e) => setForm({ ...form, tag: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <div className="relative flex gap-2">
                <Input
                  id="deadline"
                  value={calendarText}
                  placeholder="Kosongkan jika tidak ada deadline"
                  className="bg-background pr-10"
                  onChange={(e) => {
                    setCalendarText(e.target.value);
                    const parsed = parseDate(e.target.value);
                    if (parsed) {
                      setCalendarDate(parsed);
                      setForm({ ...form, deadline: parsed.toISOString() });
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setCalendarOpen(true);
                    }
                  }}
                />
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                    >
                      <CalendarIcon className="size-4" />
                      <span className="sr-only">Pilih tanggal</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="end"
                  >
                    <Calendar
                      mode="single"
                      selected={calendarDate}
                      captionLayout="dropdown"
                      month={calendarDate}
                      onMonthChange={setCalendarDate}
                      onSelect={(date) => {
                        setCalendarDate(date);
                        setCalendarText(formatDate(date));
                        setForm({
                          ...form,
                          deadline: date?.toISOString() || "",
                        });
                        setCalendarOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="text-muted-foreground px-1 text-sm">
                Konten akan dijadwalkan pada{" "}
                <span className="font-medium">{formatDate(calendarDate)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(value) => setForm({ ...form, status: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__placeholder__">
                    -- Pilih status --
                  </SelectItem>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Platform Sosial</Label>
              <Select
                value={form.sosmed}
                onValueChange={(value) => setForm({ ...form, sosmed: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Media Sosial" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__placeholder__">
                    -- Pilih platform --
                  </SelectItem>
                  <SelectItem value="INSTAGRAM">Instagram</SelectItem>
                  <SelectItem value="TIKTOK">TikTok</SelectItem>
                  <SelectItem value="FACEBOOK">Facebook</SelectItem>
                  <SelectItem value="YOUTUBE">YouTube</SelectItem>
                  <SelectItem value="TWITTER">Twitter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner className="size-4" />
                  Menyimpan...
                </span>
              ) : (
                "Simpan Konten"
              )}
            </Button>
          </form>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
