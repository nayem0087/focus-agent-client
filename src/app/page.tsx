import { FaqCtaSection } from "@/components/FAQ";
import { FeaturesSection } from "@/components/Features";
import Hero from "@/components/Hero";
import LiveAgentTicker from "@/components/LiveAgentTicker";
import { ServicesSection } from "@/components/Services";
import { StatsSection } from "@/components/Statistics";
import { TestimonialsSection } from "@/components/Testimonials";


export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Hero/>
      <LiveAgentTicker/>
      <FeaturesSection/>
      <StatsSection/>
      <ServicesSection/>
      <TestimonialsSection/>
      <FaqCtaSection/>
    </div>
  );
}
