// No need for client directive or useEffect here as AOS is initialized in AOSInitializer component
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import RecentArticlesSection from "@/components/RecentArticlesSection";
import CTASection from "@/components/CTASection";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
    
      <main>
        <div data-aos="fade-up">
          <HeroSection />
        </div>
        
        <div data-aos="fade-up" data-aos-delay="100">
          <FeaturesSection />
        </div>
        
        <div data-aos="fade-up" data-aos-delay="100">
          <TestimonialsSection />
        </div>
        
        <div data-aos="fade-up" data-aos-delay="100">
          <RecentArticlesSection />
        </div>
        
        <div data-aos="fade-up" data-aos-delay="100">
          <FAQSection />
        </div>
        
        <div data-aos="fade-up" data-aos-delay="100">
          <CTASection />
        </div>
      </main>
      
    </div>
  );
}
