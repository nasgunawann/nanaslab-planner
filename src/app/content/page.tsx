import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function KontenPage() {
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
        <div className="flex flex-1 flex-col px-6 py-4">
          <div className="flex items-center justify-between py-2">
            <h1 className="text-xl font-semibold">Konten Saya</h1>
            <Button
              asChild
              className="bg-primary text-primary-foreground 
             hover:bg-primary/90 hover:scale-[1.02] 
             active:scale-[0.97] 
             transition-all duration-200 ease-linear 
             min-w-8"
            >
              <Link href="/content/new">+ Tambah Konten</Link>
            </Button>
          </div>
          <DataTable />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
