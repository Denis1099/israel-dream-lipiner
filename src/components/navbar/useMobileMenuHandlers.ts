
import { useState, useEffect } from 'react';

export const useMobileMenuHandlers = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle mobile menu with additional safeguards
  const toggleMenu = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  return { isMenuOpen, setIsMenuOpen, toggleMenu };
};
