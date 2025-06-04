import { NavLink } from './types';

export const getNavLinks = (): NavLink[] => [
  { name: 'ראשי', href: '/', section: 'hero', sectionId: 'hero' },
  { name: 'אודות', href: '/about', section: 'about', sectionId: 'about' },
  { name: 'שאלות נפוצות', href: '/faq', section: 'faq', sectionId: 'faq' },
  { name: 'צור קשר', href: '/contact', section: 'contact', sectionId: 'contact' },
];

export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
