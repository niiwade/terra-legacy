'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import JourneySection from "@/components/about/JourneySection";
import ValuesSection from "@/components/about/ValuesSection";
import AchievementsSection from "@/components/about/AchievementsSection";
import ExperienceSection from "@/components/about/ExperienceSection";
// import TeamSection from "@/components/about/TeamSection";
import ClientsSection from "@/components/about/ClientsSection";
import CTASection from "@/components/CTASection";

// Metadata moved to a separate file since this is now a client component

export default function AboutPage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <main>
        <div data-aos="fade-up">
          <JourneySection />
        </div>
        
        <div data-aos="fade-up" data-aos-delay="100">
          <ValuesSection />
        </div>
        
        <div data-aos="fade-up" data-aos-delay="200">
          <AchievementsSection />
        </div>
        
        <div data-aos="fade-up" data-aos-delay="100">
          <ExperienceSection />
        </div>
        
        {/* <div data-aos="fade-up" data-aos-delay="200">
          <TeamSection />
        </div> */}
        
        <div data-aos="fade-up" data-aos-delay="100">
          <ClientsSection />
        </div>
        
        <div data-aos="fade-up" data-aos-delay="200">
          <CTASection />
        </div>
      </main>
    </div>
  );
}
