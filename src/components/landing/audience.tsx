import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/landing/ui/accordion";
import { cn } from "@/lib/utils";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { PlusIcon } from "lucide-react";

const faq = [
  {
    question: "UMKM & Bisnis Kecil",
    answer:
      "Bantu mengatur jadwal promosi, melacak ide konten, dan meningkatkan konsistensi pemasaran.",
  },
  {
    question: "Content Creator & Influencer",
    answer:
      "Mudah merencanakan posting, kolaborasi dengan tim, dan gunakan AI untuk caption menarik.",
  },
  {
    question: "Tim Marketing",
    answer:
      "Koordinasikan kampanye, kelola banyak channel sekaligus, dan pantau performa konten.",
  },
  {
    question: "Komunitas & Organisasi",
    answer:
      "Sederhanakan pengelolaan konten event, pengumuman, hingga publikasi informasi.",
  },
];

const FAQ = () => {
  return (
    <section
      id="audience"
      className="w-full max-w-(--breakpoint-xl) mx-auto py-8 xs:py-16 px-6"
    >
      <h2
        className="text-3xl mb-12 xs:text-4xl md:text-5xl leading-[1.15] font-bold tracking-tighter 
             md:text-center sm:max-w-4xl mx-auto"
      >
        Siapa yang bisa menggunakan Nanasgunung Content Planner?
      </h2>

      <div className="min-h-[400px] md:min-h-[280px] xl:min-h-[250px]">
        <Accordion
          type="single"
          collapsible
          className="mt-8 space-y-4 md:columns-2 gap-4"
        >
          {faq.map(({ question, answer }, index) => (
            <AccordionItem
              key={question}
              value={`audience-${index}`}
              className="bg-accent py-1 px-4 rounded-xl border-none mt-0! mb-4! break-inside-avoid"
            >
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger
                  className={cn(
                    "flex flex-1 items-center justify-between py-4 font-semibold tracking-tight transition-all hover:underline [&[data-state=open]>svg]:rotate-45",
                    "text-start text-lg"
                  )}
                >
                  {question}
                  <PlusIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="text-[15px]">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
