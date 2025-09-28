"use client";

import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"; // ShadCN version
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "features", label: "Fitur" },
  { id: "audience", label: "Pengguna" },
  { id: "testimonials", label: "Testimoni" },
];

interface NavMenuProps {
  orientation?: "horizontal" | "vertical"; // kontrol layout
  className?: string;
}

export const NavMenu = ({
  orientation = "horizontal",
  className,
}: NavMenuProps) => {
  const [active, setActive] = useState<string>("hero");

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      let current = SECTIONS[0].id;

      SECTIONS.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element && scrollPos >= element.offsetTop) {
          current = section.id;
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <NavigationMenu className={className}>
      <NavigationMenuList
        className={`flex ${
          orientation === "vertical"
            ? "flex-col max-h-[80vh] overflow-hidden gap-2"
            : "flex-row gap-4"
        }`}
      >
        {/* Menu teks biasa */}
        {SECTIONS.map((section) => (
          <NavigationMenuItem key={section.id} className="w-full md:w-auto">
            <NavigationMenuLink asChild>
              <Link
                href={`#${section.id}`}
                aria-current={active === section.id ? "page" : undefined}
                className="hover:bg-transparent"
              >
                <Button
                  variant="ghost"
                  className={`w-full md:w-auto px-2 py-2 transition-colors duration-200 cursor-pointer rounded-4xl hover:bg-transparent  ${
                    active === section.id
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {section.label}
                </Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}

        {/* Tombol CTA */}
        <NavigationMenuItem className="w-full md:w-auto mt-2 md:mt-0">
          <NavigationMenuLink asChild>
            <Link href="#cta" className="w-full md:w-auto hover:bg-transparent">
              <Button className="w-full md:w-auto cursor-pointer rounded-4xl hover:bg-muted hover:text-foreground">
                Mulai Sekarang
              </Button>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
