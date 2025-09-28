"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/landing/ui/carousel";
import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Cindy Anggriani",
    designation: "Owner",
    company: "GlowCindy Skincare",
    testimonial:
      "Sejak pakai Nanasgunung Content Planner, jadwal posting Instagram toko saya jauh lebih rapi. Fitur kalendernya bikin saya nggak pernah lupa upload, dan ide konten jadi lebih teratur.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Falwan Rizky",
    designation: "Owner",
    company: "OneProject",
    testimonial:
      "Fitur AI caption generator-nya membantu banget. Saya biasanya bingung cari kata-kata, tapi sekarang lebih cepat dan hasilnya tetap menarik untuk audiens.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "M. Richie Hadiansah",
    designation: "Marketing Specialist",
    company: "Mandiri Jaya Digital Printing",
    testimonial:
      "Kolaborasi tim jadi lebih gampang karena semua ide dan draft konten bisa disimpan dalam satu platform. Tidak perlu lagi ribet pakai spreadsheet manual.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    name: "Tiofandy Hasibuan",
    designation: "Owner",
    company: "PrelovedPiti Shop",
    testimonial:
      "Dengan Content Planner ini, saya bisa menjaga konsistensi upload di Instagram. Sangat membantu untuk copy-paste ke platform lain.",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 5,
    name: "Maya Lestari",
    designation: "Social Media Manager",
    company: "Agensi Kreatif",
    testimonial:
      "Dengan Nanasgunung Content Planner, saya bisa pegang beberapa brand sekaligus tanpa kewalahan. Satu dashboard, semua akun sosial media bisa terkontrol dengan baik.",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    id: 7,
    name: "Budi Santoso",
    designation: "Freelance Designer",
    company: "Personal Branding",
    testimonial:
      "Kami butuh tools sederhana untuk tim kecil. Nanasgunung pas banget, fitur AI caption bikin konten cepat jadi.",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
  },
];

const Testimonial = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section
      id="testimonials"
      className="w-full max-w-(--breakpoint-xl) mx-auto py-6 xs:py-12 px-6"
    >
      <h2 className="mb-8 xs:mb-14 text-4xl md:text-5xl font-bold text-center tracking-tight">
        Apa Kata Pengguna Kami?
      </h2>
      <div className="container w-full mx-auto">
        <Carousel setApi={setApi}>
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn("h-3.5 w-3.5 rounded-full border-2", {
                "bg-primary border-primary": current === index + 1,
              })}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) => (
  <div className="mb-8 bg-accent rounded-xl py-8 px-6 sm:py-6">
    <div className="flex items-center justify-between gap-20">
      <div className="flex flex-col justify-center">
        <div className="flex items-center justify-between gap-1">
          <div className="hidden sm:flex md:hidden items-center gap-4">
            <div>
              <p className="text-lg font-semibold">{testimonial.name}</p>
              <p className="text-sm text-gray-500">{testimonial.designation}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <StarIcon className="w-5 h-5 fill-current text-yellow-500" />
            <StarIcon className="w-5 h-5 fill-current text-yellow-500" />
            <StarIcon className="w-5 h-5 fill-current text-yellow-500" />
            <StarIcon className="w-5 h-5 fill-current text-yellow-500" />
            <StarIcon className="w-5 h-5 fill-current text-yellow-500" />
          </div>
        </div>
        <p className="mt-6 text-lg sm:text-2xl lg:text-[1.75rem] xl:text-3xl leading-normal lg:leading-normal! font-semibold tracking-tight">
          &quot;{testimonial.testimonial}&quot;
        </p>
        <div className="flex sm:hidden md:flex mt-6 items-center gap-4">
          <div>
            <p className="text-lg font-semibold">{testimonial.name}</p>
            <p className="text-sm text-gray-500">
              {testimonial.designation} {testimonial.company}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Testimonial;
