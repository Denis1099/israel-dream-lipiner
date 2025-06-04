import React from 'react';
import { Link } from 'react-router-dom';
import { scrollToSection } from './utils';

interface LogoProps {
  scrolled: boolean;
}

const Logo: React.FC<LogoProps> = ({ scrolled }) => {
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection('hero');
  };

  return (
    <div className="flex-shrink-0">
      <Link to="/" onClick={handleLogoClick} className="block">
        <img 
          src="/lovable-uploads/logo.webp" 
          alt="עו״ד אבי ליפינר לוגו" 
          className={`transition-all duration-300 ${scrolled ? 'h-14' : 'h-16'}`}
        />
      </Link>
    </div>
  );
};

export default Logo;
