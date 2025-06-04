import { NavLink } from './types';

export const getNavLinks = (): NavLink[] => [
  { name: 'Home', href: '/', section: 'hero', sectionId: 'hero' },
  { name: 'About', href: '/about', section: 'about', sectionId: 'about' },
  { name: 'Services', href: '/services', section: 'services', sectionId: 'services' },
  { name: 'Contact', href: '/contact', section: 'contact', sectionId: 'contact' },
];

export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
