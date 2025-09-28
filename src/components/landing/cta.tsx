import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const CTA = () => {
  return (
    <section
      id="cta"
      className="max-w-[var(--breakpoint-lg)] min-h-[85vh] mx-auto px-6 flex flex-col items-center justify-center text-center"
    >
      <h2 className="text-3xl xs:text-4xl md:text-5xl font-bold tracking-tight">
        Mulai Rencanakan Konten Anda Hari Ini 🚀
      </h2>
      <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
        Coba gratis selama 7 hari. Tingkatkan produktivitas Anda dengan AI
        Caption Generator, Kalender Konten, dan Dashboard yang simpel.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/register" passHref>
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto rounded-full text-base"
          >
            <span>
              Mulai Rencanakan Sekarang!{" "}
              <ArrowUpRight className="h-5 w-5 inline-block ml-2" />
            </span>
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CTA;
