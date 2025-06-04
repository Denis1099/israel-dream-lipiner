
import React from 'react';
import { NavbarProps } from './navbar/types';
import { getNavLinks } from './navbar/utils';
import Logo from './navbar/Logo';
import DesktopNav from './navbar/DesktopNav';
import MobileNav from './navbar/MobileNav';
import { useNavbarScrollEffects } from './navbar/useNavbarScrollEffects';
import { useMobileMenuHandlers } from './navbar/useMobileMenuHandlers';

const Navbar: React.FC<NavbarProps> = ({ activeSection: propActiveSection }) => {
  const { scrolled, activeSection } = useNavbarScrollEffects({ propActiveSection });
  const { isMenuOpen, setIsMenuOpen, toggleMenu } = useMobileMenuHandlers();
  const navLinks = getNavLinks();

  return (
    <nav 
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-primary-light shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Logo scrolled={scrolled} />

          {/* Desktop Navigation */}
          <DesktopNav 
            activeSection={activeSection} 
            scrolled={scrolled} 
            navLinks={navLinks} 
          />

          {/* Mobile Navigation - pass scrolled prop */}
          <MobileNav 
            isMenuOpen={isMenuOpen} 
            toggleMenu={toggleMenu} 
            activeSection={activeSection} 
            navLinks={navLinks}
            setIsMenuOpen={setIsMenuOpen}
            scrolled={scrolled}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
