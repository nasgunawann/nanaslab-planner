"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import {
  CalendarBody,
  CalendarDate,
  CalendarDatePagination,
  CalendarDatePicker,
  CalendarHeader,
  CalendarItem,
  CalendarMonthPicker,
  CalendarProvider,
  CalendarYearPicker,
} from "@/components/ui/shadcn-io/calendar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Content = {
  id: string;
  title: string;
  status: "DRAFT" | "SCHEDULED" | "PUBLISHED";
  deadline: string | null;
};

const statusColors: Record<Content["status"], string> = {
  DRAFT: "#6B7280", // abu-abu
  SCHEDULED: "#F59E0B", // kuning
  PUBLISHED: "#10B981", // hijau
};

// definisi kolom untuk DataTable
const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Judul",
  },
  {
    accessorKey: "status.name",
    header: "Status",
    cell: ({ row }) => (
      <span style={{ color: row.original.status.color }}>
        {row.original.status.name}
      </span>
    ),
  },
  {
    accessorKey: "startAt",
    header: "Deadline",
    cell: ({ row }) =>
      row.original.startAt.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  },
];

export default function ContentCalendarPage() {
  const router = useRouter();
  const [features, setFeatures] = useState<any[]>([]);
  const [earliestYear, setEarliestYear] = useState(new Date().getFullYear());
  const [latestYear, setLatestYear] = useState(new Date().getFullYear());

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/contents");
      const data: Content[] = await res.json();

      const mapped = data
        .filter((c) => c.deadline)
        .map((c) => {
          const d = new Date(c.deadline as string);
          return {
            id: c.id,
            name: c.title,
            startAt: d,
            endAt: d,
            status: {
              name: c.status,
              color: statusColors[c.status],
            },
          };
        });

      setFeatures(mapped);

      const years = mapped.map((f) => f.startAt.getFullYear());
      if (years.length > 0) {
        setEarliestYear(Math.min(...years));
        setLatestYear(Math.max(...years));
      }
    }
    fetchData();
  }, []);

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
          <h1 className="text-2xl font-semibold mb-6">Kalender Konten</h1>
          <CalendarProvider>
            <CalendarDate>
              <CalendarDatePicker>
                <CalendarMonthPicker />
                <CalendarYearPicker start={earliestYear} end={latestYear} />
              </CalendarDatePicker>
              <CalendarDatePagination />
            </CalendarDate>
            <CalendarHeader />
            <CalendarBody features={features}>
              {({ feature }) => (
                <TooltipProvider key={feature.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() =>
                          router.push(`/content/edit/${feature.id}`)
                        }
                        className="w-full text-left cursor-pointer hover:opacity-50 transition focus:outline-none focus:ring-2 focus:ring-ring rounded"
                      >
                        <CalendarItem feature={feature} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <p className="font-medium">{feature.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Status: {feature.status.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Deadline:{" "}
                        {feature.startAt.toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </CalendarBody>
          </CalendarProvider>

          {/* Tabel Data Konten */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Daftar Konten</h2>
            <DataTable />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
