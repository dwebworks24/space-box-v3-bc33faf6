import SEO from "@/components/SEO";
import HeroSection from "@/components/HeroSection";
import CategoryBar from "@/components/CategoryBar";
import ServicesSection from "@/components/ServicesSection";
import AboutCompanySection from "@/components/AboutCompanySection";
import PromisesSection from "@/components/PromisesSection";
import OurWorkSection from "@/components/OurWorkSection";
import WorkProcessSection from "@/components/WorkProcessSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import CTAStrip from "@/components/CTAStrip";
import ParallaxSection from "@/components/ParallaxSection";

const Index = () => {
  return (
    <>
      <SEO
        title="Custom Interior Design Solutions in Telangana"
        description="SpaceBox Concepts delivers premium custom interior design solutions for residential and commercial spaces in Telangana. Transform your space with our expert designers."
        keywords="interior design, custom interiors, Telangana, Hyderabad, residential interior, commercial interior, SpaceBox Concepts, home design, office design"
      />

      <ParallaxSection zIndex={1}>
        <HeroSection />
      </ParallaxSection>

      <ParallaxSection zIndex={2}>
        <CategoryBar />
      </ParallaxSection>

      <ParallaxSection zIndex={3}>
        <AboutCompanySection />
      </ParallaxSection>

      <ParallaxSection zIndex={4}>
        <ServicesSection />
      </ParallaxSection>

      <ParallaxSection zIndex={5}>
        <PromisesSection />
      </ParallaxSection>

      <ParallaxSection zIndex={6}>
        <StatsSection />
      </ParallaxSection>

      <ParallaxSection zIndex={7}>
        <OurWorkSection />
      </ParallaxSection>

      <ParallaxSection zIndex={8}>
        <WorkProcessSection />
      </ParallaxSection>

      <ParallaxSection zIndex={9}>
        <TestimonialsSection />
      </ParallaxSection>

      <ParallaxSection zIndex={10}>
        <BlogSection />
      </ParallaxSection>

      <ParallaxSection zIndex={11} isSticky={false}>
        <CTAStrip />
      </ParallaxSection>
    </>
  );
};

export default Index;
