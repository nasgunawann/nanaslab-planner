import { useTheme } from "next-themes";
import Image from "next/image";
import clsx from "clsx";
import { useEffect, useState } from "react";

type LogoProps = Omit<React.ComponentProps<typeof Image>, "src" | "alt"> & {
  className?: string;
};

export function Logo({ className, ...props }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // jangan render logo sampai di client

  const logoSrc =
    resolvedTheme === "light" ? "/logo-dark.png" : "/logo-light.png";

  return (
    <Image
      src={logoSrc}
      alt="Nanasgunung Logo"
      width={160}
      height={80}
      className={clsx("h-18 w-auto", className)}
      {...props}
      suppressHydrationWarning
    />
  );
}
