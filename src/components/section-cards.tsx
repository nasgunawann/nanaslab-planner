"use client";

import {
  IconCalendarClock,
  IconFilePencil,
  IconFiles,
  IconLayoutGrid,
  IconSend,
  IconTrendingDown,
  IconTrendingUp,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useSWR from "swr";
import { Skeleton } from "@/components/ui/skeleton";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function SectionCards() {
  const { data, error } = useSWR("/api/dashboard", fetcher);

  if (error || !data) {
    return (
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Card key={idx} className="@container/card" data-slot="card">
            <CardHeader>
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-8 w-24 mb-2" />
              <Skeleton className="h-6 w-20" />
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-32" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  const cards = [
    {
      label: "Total Konten",
      value: data.totalContent,
      description: "Semua konten milik Anda",
      subtext: "Termasuk draft, scheduled, dan published",
      icon: IconLayoutGrid,
    },
    {
      label: "Draft",
      value: data.draftCount,
      description: "Konten belum dijadwalkan",
      subtext: "Perlu dilengkapi sebelum publish",
      icon: IconFilePencil,
    },
    {
      label: "Scheduled",
      value: data.scheduledCount,
      description: "Konten siap tayang",
      subtext: "Akan diposting sesuai jadwal",
      icon: IconCalendarClock,
    },
    {
      label: "Published",
      value: data.publishedCount,
      description: "Konten sudah tayang",
      subtext: "Tersimpan di arsip",
      icon: IconSend,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cards.map((card, idx) => (
        <Card key={idx} className="@container/card" data-slot="card">
          <CardHeader>
            <CardDescription>{card.label}</CardDescription>
            <CardTitle className="flex items-center gap-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              <card.icon className="size-6 text-muted-foreground" />
              {card.value}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {card.description}
            </div>
            <div className="text-muted-foreground">{card.subtext}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
