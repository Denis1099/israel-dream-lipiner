
import { useState, useEffect, useCallback } from 'react';

interface UseNavbarScrollEffectsProps {
  propActiveSection?: string;
}

export const useNavbarScrollEffects = ({ propActiveSection }: UseNavbarScrollEffectsProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(propActiveSection || 'hero');

  const handleScroll = useCallback(() => {
    // Check if page is scrolled for navbar background
    if (window.scrollY > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // Only determine active section if not provided as a prop
    if (!propActiveSection) {
      const sections = ['hero', 'about', 'faq', 'contact'];
      const currentPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            currentPosition >= offsetTop &&
            currentPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    }
  }, [propActiveSection]);

  useEffect(() => {
    // Update active section when prop changes
    if (propActiveSection) {
      setActiveSection(propActiveSection);
    }
  }, [propActiveSection]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // Initial check for the active section
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { scrolled, activeSection };
};
