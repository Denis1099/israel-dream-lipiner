import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from './types';
import { Phone } from 'lucide-react';
import { scrollToSection } from './utils';

interface DesktopNavProps {
  activeSection: string;
  scrolled: boolean;
  navLinks: NavLink[];
}

const DesktopNav: React.FC<DesktopNavProps> = ({ activeSection, scrolled, navLinks }) => {
  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center justify-center flex-1">
        <div className="flex items-center space-x-2 space-x-reverse">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={(e) => handleNavClick(e, link.sectionId)}
              className={`relative px-4 py-2 rounded-md text-lg font-medium transition-all duration-200
                ${activeSection === link.section 
                  ? 'text-primary-gold' 
                  : scrolled 
                    ? 'text-black hover:text-primary-gold' 
                    : 'text-white hover:text-primary-gold'
                }
              `}
            >
              {link.name}
              {activeSection === link.section && (
                <span className="absolute bottom-0 right-0 left-0 mx-auto w-8 h-0.5 bg-primary-gold rounded-full" />
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="hidden lg:flex items-center">
        <button
          onClick={() => scrollToSection('contact')}
          className="bg-primary-gold hover:bg-primary-gold/90 text-white px-4 py-2 rounded-md text-lg font-medium transition-all duration-300 flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
        >
          התקשרו עכשיו
          <Phone size={18} className="mr-2" />
        </button>
      </div>
    </>
  );
};

export default DesktopNav;