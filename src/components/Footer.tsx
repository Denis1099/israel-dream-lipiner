import React from 'react';
import { PhoneCall, Mail, MapPin, Clock, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [{
    name: 'ראשי',
    href: '#hero'
  }, {
    name: 'אודות',
    href: '#about'
  }, {
    name: 'שאלות נפוצות',
    href: '#faq'
  }, {
    name: 'צור קשר',
    href: '#contact'
  }];

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=61550740123868',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      )
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/avi_lipiner/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-black text-white pt-14 pb-6 relative">
      {/* Back to top button */}
      <button 
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-primary-gold text-white p-3 rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-gold focus:ring-opacity-50"
        aria-label="חזרה לראש הדף"
      >
        <ArrowUp size={20} />
      </button>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Logo and Description */}
          <div className="md:col-span-5">
            <div className="flex items-start md:items-center mb-6">
              <img src="/lovable-uploads/logo.webp" alt="עו״ד אבי ליפינר" className="h-20" />
            </div>
            
            <p className="text-gray-300 mb-6 text-base leading-relaxed">
              עו"ד אבי ליפינר - מומחה במקרקעין. מעניק ללקוחותיו ליווי משפטי מקצועי, אישי וזמין בעסקאות מכר דירות, תוך שילוב ייחודי של ידע משפטי ופיננסי.
            </p>
            
            {/* Social links */}
            <div className="flex space-x-4 space-x-reverse mb-6">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="bg-white/10 hover:bg-primary-gold text-white p-2.5 rounded-full transition-colors duration-300" 
                  aria-label={link.name}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-xl font-bold mb-6 border-r-4 border-primary-gold pr-3 text-white">ניווט מהיר</h3>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-primary-gold transition-colors duration-200 flex items-center"
                  >
                    <span className="ml-2 text-primary-gold">›</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="md:col-span-4">
            <h3 className="text-xl font-bold mb-6 border-r-4 border-primary-gold pr-3 text-white">צור קשר</h3>
            <div className="space-y-5">
              <div className="flex items-start">
                <div className="bg-white/10 text-primary-gold p-2.5 rounded-full ml-4">
                  <PhoneCall size={20} />
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-white">טלפון</h4>
                  <a 
                    href="tel:0502230066" 
                    className="text-gray-300 hover:text-primary-gold transition-colors duration-200"
                    dir="ltr"
                  >
                    050-2230066
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white/10 text-primary-gold p-2.5 rounded-full ml-4">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-white">דוא"ל</h4>
                  <a 
                    href="mailto:lipiner10@gmail.com" 
                    className="text-gray-300 hover:text-primary-gold transition-colors duration-200"
                    dir="ltr"
                  >
                    lipiner10@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white/10 text-primary-gold p-2.5 rounded-full ml-4">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-white">כתובת</h4>
                  <a 
                    href="https://maps.google.com/?q=ורדינון+אליעזר+3+פתח+תקווה"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-primary-gold transition-colors duration-200"
                  >
                    ורדינון אליעזר 3, פתח תקווה
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white/10 text-primary-gold p-2.5 rounded-full ml-4">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-white">שעות פעילות</h4>
                  <p className="text-gray-300">ימים א׳-ה׳, 9:00-19:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-gray-400 text-sm">
          <p>© {currentYear} כל הזכויות שמורות | עו"ד אבי ליפינר - מומחה במקרקעין</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;