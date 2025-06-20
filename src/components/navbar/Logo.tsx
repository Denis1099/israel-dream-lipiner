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
          src="/lovable-uploads/logo.webp?v=2024" 
          alt="עו״ד אבי ליפינר לוגו" 
          className={`transition-all duration-300 ${scrolled ? 'h-14' : 'h-16'}`}
          width="270"
          height="54"
          style={{ 
            width: scrolled ? '170px' : '190px', 
            height: scrolled ? '34px' : '38px',
            objectFit: 'contain'
          }}
        />
      </Link>
    </div>
  );
};

export default Logo;
