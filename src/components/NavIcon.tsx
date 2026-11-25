import {
  BookOpen,
  ClipboardCheck,
  Code2,
  FolderKanban,
  LayoutDashboard,
  Library,
  Map,
  Settings,
  Sigma,
  StickyNote,
} from 'lucide-react';
import type { NavItem } from '../types/academy';

interface NavIconProps {
  name: NavItem['iconName'];
  className?: string;
}

export function NavIcon({ name, className = 'w-4 h-4' }: NavIconProps) {
  switch (name) {
    case 'LayoutDashboard':
      return <LayoutDashboard className={className} aria-hidden="true" />;
    case 'Map':
      return <Map className={className} aria-hidden="true" />;
    case 'BookOpen':
      return <BookOpen className={className} aria-hidden="true" />;
    case 'Library':
      return <Library className={className} aria-hidden="true" />;
    case 'Code2':
      return <Code2 className={className} aria-hidden="true" />;
    case 'Sigma':
      return <Sigma className={className} aria-hidden="true" />;
    case 'FolderKanban':
      return <FolderKanban className={className} aria-hidden="true" />;
    case 'ClipboardCheck':
      return <ClipboardCheck className={className} aria-hidden="true" />;
    case 'StickyNote':
      return <StickyNote className={className} aria-hidden="true" />;
    case 'Settings':
      return <Settings className={className} aria-hidden="true" />;
  }
}
