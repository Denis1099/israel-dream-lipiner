export interface NavLink {
  name: string;
  href: string;
  section: string;
  sectionId: string;
}

export interface NavbarProps {
  activeSection?: string;
}
