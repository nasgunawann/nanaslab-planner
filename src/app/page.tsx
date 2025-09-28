import Audience from "@/components/landing/audience";
import Features from "@/components/landing/features";
import Footer from "@/components/landing/footer";
import Hero from "@/components/landing/hero";
import { Navbar } from "@/components/landing/navbar";
import CTA from "@/components/landing/cta";
import Testimonial from "@/components/landing/testimonial";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Audience />
      <Testimonial />
      <CTA />
      <Footer />
    </>
  );
}
