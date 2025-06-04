import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import StatisticsSection from '@/components/AdvantagesSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FaqSection from '@/components/FaqSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import AnimatedBox from '@/components/AnimatedBox';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // On page load, ensure all elements are visible and handle initial loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Track active section for navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'statistics', 'services', 'testimonials', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set page title and description
  useEffect(() => {
    document.title = "Attorney Avi Lipiner - Israeli Real Estate Lawyer for Americans";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Experienced Israeli real estate and business lawyers helping Americans invest in Israel. Legal representation for property purchases, business formation, and estate planning.');
    }
  }, []);

  // Early return for loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-primary-light flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-gold"></div>
      </div>
    );
  }

  // Mid-page CTA component
  const MidPageCTA = () => (
    <section className="py-16 bg-primary-navy">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <AnimatedBox animation="fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-light mb-4">
            Ready to Start Your Israel Investment Journey?
          </h2>
          <p className="text-xl text-primary-light/80 mb-8 max-w-2xl mx-auto">
            Get expert legal guidance from experienced Israeli real estate attorneys who understand American investors' needs.
          </p>
          <a 
            href="#contact" 
            className="inline-block py-4 px-10 bg-primary-gold text-primary-light font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-xl"
            aria-label="Contact us for legal consultation"
          >
            Get Your Free Consultation
          </a>
        </AnimatedBox>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-primary-light font-inter">
      <Navbar activeSection={activeSection} />
      <main>
        <HeroSection />
        <AboutSection />
        <StatisticsSection />
        <ServicesSection />
        <MidPageCTA />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
