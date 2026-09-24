import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { SignalJourney } from "@/components/pipeline/SignalJourney";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { FleetShowcase } from "@/components/home/FleetShowcase";
import { CareerTeaser } from "@/components/home/CareerTeaser";
import { FinalCta } from "@/components/home/FinalCta";

const OtdrSimulator = dynamic(() =>
  import("@/components/simulator/OtdrSimulator").then((m) => m.OtdrSimulator)
);

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <SignalJourney />
      <ServicesGrid />
      <OtdrSimulator />
      <FleetShowcase />
      <CareerTeaser />
      <FinalCta />
    </>
  );
}
