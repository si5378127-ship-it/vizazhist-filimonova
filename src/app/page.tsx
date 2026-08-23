import { About } from "@/components/About";
import { AdditionalServices } from "@/components/AdditionalServices";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MakeupLesson } from "@/components/MakeupLesson";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { Portfolio } from "@/components/Portfolio";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";
import { Socials } from "@/components/Socials";
import { Studio } from "@/components/Studio";
import { pageCanonical } from "@/lib/seo";
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  _props: PageProps<"/">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentOg = (await parent).openGraph;

  return {
    alternates: {
      canonical: pageCanonical.home,
    },
    openGraph: {
      ...parentOg,
      url: pageCanonical.home,
    },
  };
}

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-cream focus:px-4 focus:py-2"
      >
        Перейти к содержимому
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <Portfolio />
        <Services />
        <About />
        <Reviews />
        <MakeupLesson />
        <AdditionalServices />
        <Studio />
        <Socials />
        <FinalCTA />
      </main>
      <Footer />
      <MobileStickyCta />
    </>
  );
}
