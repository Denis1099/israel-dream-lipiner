import React from 'react';
import { PhoneCall, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [{
    name: 'Home',
    href: '#hero'
  }, {
    name: 'About',
    href: '#about'
  }, {
    name: 'Services',
    href: '#services'
  }];

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
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-l-4 border-primary-gold pl-3 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-primary-gold transition-colors duration-200 flex items-center"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(link.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <span className="mr-2 text-primary-gold">›</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4 border-l-4 border-primary-gold pl-3 text-white">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="bg-white/10 text-primary-gold p-2 rounded-full mr-3">
                  <PhoneCall size={16} />
                </div>
                <a 
                  href="tel:+972544302066" 
                  className="text-gray-300 hover:text-primary-gold transition-colors duration-200"
                  dir="ltr"
                >
                  +972-54-430-2066
                </a>
              </div>
              
              <div className="flex items-center">
                <div className="bg-white/10 text-primary-gold p-2 rounded-full mr-3">
                  <Mail size={16} />
                </div>
                <a 
                  href="mailto:yaron@fuks-law.co.il" 
                  className="text-gray-300 hover:text-primary-gold transition-colors duration-200"
                  dir="ltr"
                >
                  yaron@fuks-law.co.il
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright and Disclaimer */}
        <div className="border-t border-white/10 pt-6 space-y-4">
          <div className="text-center text-gray-400 text-sm">
            <p>© {currentYear} Attorneys Yaron Fuks, Avi Lipiner & Koby Bargad</p>
          </div>
          
          <div className="text-center text-gray-400 text-xs max-w-4xl mx-auto">
            <p>
              <strong>Disclaimer:</strong> This page provides general information only and does not constitute legal advice. Communication through this page does not establish an attorney–client relationship.
            </p>
          </div>
          
          <div className="text-center text-gray-400 text-xs">
            <p>
              Design and development by <a href="https://wa.me/message/53U2BBE2KWIAJ1" className="text-primary-gold hover:text-primary-gold/80 transition-colors duration-200" target="_blank" rel="noopener noreferrer">Denis Faerman</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;