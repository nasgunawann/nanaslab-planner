"use client";

import * as React from "react";

import {
  IconDashboard,
  IconFileText,
  IconCalendar,
  IconSparkles,
  IconSettings,
  IconHelp,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Nasrullah",
    email: "nas@example.com",
    avatar: "/avatars/default.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Konten",
      url: "/content",
      icon: IconFileText,
    },
    {
      title: "Kalender",
      url: "/calendar",
      icon: IconCalendar,
    },
    {
      title: "AI Chatbot Planner",
      url: "/chatbot",
      icon: IconSparkles,
    },
  ],
  navSecondary: [
    {
      title: "Bantuan",
      url: "/help",
      icon: IconHelp,
    },
    {
      title: "Pengaturan",
      url: "/settings",
      icon: IconSettings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard" className="flex items-center gap-2">
                <span className="text-base font-semibold">
                  Nanasgunung Content Planner
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="flex flex-col justify-between h-full overflow-y-auto">
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
