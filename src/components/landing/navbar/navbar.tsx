"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-4 z-50 w-[80%] mx-auto h-16 bg-background/80 backdrop-blur-lg border-b border-accent rounded-4xl shadow-lg">
      <div className="flex items-center justify-between h-full max-w-screen-xl mx-auto px-4">
        {/* Logo */}
        <Link href="/">
          <Logo />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          <NavMenu orientation="horizontal" />
        </div>

        {/* Actions + Drawer */}
        <div className="flex items-center gap-3">
          <ModeToggle />

          {/* Desktop buttons */}
          <Link href="/login">
            <Button
              variant="outline"
              className="hidden sm:inline-flex cursor-pointer rounded-4xl"
            >
              Log In
            </Button>
          </Link>
          <Link href="/register">
            <Button className="hidden sm:inline-flex cursor-pointer rounded-4xl">
              Sign Up
            </Button>
          </Link>

          {/* Mobile/Tablet drawer */}
          <div className="lg:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
