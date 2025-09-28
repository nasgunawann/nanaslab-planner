"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetOverlay,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import Link from "next/link";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <VisuallyHidden>
        <SheetTitle>Navigation Drawer</SheetTitle>
      </VisuallyHidden>

      <SheetTrigger asChild aria-label="Open navigation menu">
        <Button variant="outline" size="icon" className="cursor-pointer">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetOverlay className="bg-black/40  transition-opacity duration-300" />

      <SheetContent
        side="right"
        className="w-60 max-w-full p-8 flex flex-col items-center 
                   bg-background shadow-xl rounded-l-3xl animate-slide-in-right"
      >
        {/* Logo */}
        <Link href="/" className="w-full flex justify-center">
          <Logo />
        </Link>

        {/* Menu vertikal */}
        <NavMenu orientation="vertical" className="w-full" />

        {/* Action buttons */}
        <div className="mt-auto w-full flex flex-col gap-3">
          <Link href="/login">
            <Button variant="outline" className="w-full cursor-pointer">
              Log In
            </Button>
          </Link>
          <Link href="/register">
            <Button className="w-full cursor-pointer">Sign Up</Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};
