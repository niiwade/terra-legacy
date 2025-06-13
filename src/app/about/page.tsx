import JourneySection from "@/components/about/JourneySection";
import ValuesSection from "@/components/about/ValuesSection";
import AchievementsSection from "@/components/about/AchievementsSection";
import ExperienceSection from "@/components/about/ExperienceSection";
import TeamSection from "@/components/about/TeamSection";
import ClientsSection from "@/components/about/ClientsSection";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "About Us | Terra Legacy Real Estate",
  description: "Learn about Terra Legacy's journey, values, and the team behind our success in the real estate industry.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
     
      <main>
        <JourneySection />
        <ValuesSection />
        <AchievementsSection />
        <ExperienceSection />
        <TeamSection />
        <ClientsSection />
        <CTASection />
      </main>
     
    </div>
  );
}
