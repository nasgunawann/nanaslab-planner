import Image from "next/image";

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandGmail,
} from "@tabler/icons-react";

import Link from "next/link";
const footerSections = [
  {
    title: "Produk",
    links: [
      { title: "Fitur", href: "#features" },
      { title: "Testimoni", href: "#testimonials" },
      { title: "Coba Sekarang", href: "#cta" },
    ],
  },
  {
    title: "Docs",
    links: [
      { title: "Bantuan", href: "#audience" },
      { title: "FAQ", href: "#testimonials" },
    ],
  },
  {
    title: "Legal",
    links: [
      { title: "Privacy Policy", href: "#" },
      { title: "Terms of Service", href: "#" },
      { title: "Cookies", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-background dark border-t">
      <div className="max-w-(--breakpoint-lg) mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Bagian Kiri: Logo */}
        <div>
          <div className="flex justify-center md:justify-start items-center">
            <Image
              src="/logo-light.png"
              alt="Nanasgunung Logo"
              width={240}
              height={240}
              className="object-contain"
            />
          </div>
        </div>

        {/* Bagian Kanan: Link Sections */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.title}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className=" border mx-auto px-32 py-4 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5">
        {/* Copyright */}
        <span className="text-muted-foreground text-sm text-center xs:text-start">
          &copy; {new Date().getFullYear()}{" "}
          <Link href="https://nanaslab.com" target="_blank">
            Nanasgunung Creative Studio
          </Link>
          . All rights reserved.
        </span>

        <div className="flex items-center gap-5 text-muted-foreground">
          <Link href="https://github.com/nasgunawann" target="_blank">
            <IconBrandGithub className="h-5 w-5" />
          </Link>
          <Link href="https://instagram.com/nanasgunung" target="_blank">
            <IconBrandInstagram className="h-5 w-5" />
          </Link>
          <Link href="https://linkedin.com/in/nasgunawan" target="_blank">
            <IconBrandLinkedin className="h-5 w-5" />
          </Link>
          <Link href="mailto:nasgunawann@gmail.com" target="_blank">
            <IconBrandGmail className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
