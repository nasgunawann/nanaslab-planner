"use client";
import Link from "next/link";
import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              asChild
              tooltip="Quick Create"
              className="bg-primary text-primary-foreground 
             hover:bg-primary/90 hover:scale-[1.02] 
             active:scale-[0.97] 
             transition-all duration-200 ease-linear 
             inline-flex items-center justify-center 
             font-bold rounded-md px-6 py-5"
            >
              <Link href="/content/new" className="flex items-center gap-2">
                <IconCirclePlusFilled className="size-6" />
                <span>Tambah Konten Baru</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname.startsWith(item.url);
            return (
              <SidebarMenuItem key={item.title} data-active={isActive}>
                <SidebarMenuButton
                  tooltip={item.title}
                  asChild
                  className={`px-4 py-5 font-medium ${
                    isActive ? "bg-muted text-foreground" : ""
                  }`}
                >
                  <a href={item.url} className="flex items-center gap-2">
                    {item.icon && <item.icon className="size-5" />}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
