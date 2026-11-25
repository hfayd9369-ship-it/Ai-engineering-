import { NAV_ITEMS } from '../data/navigation';
import type { NavItem, RouteId } from '../types/academy';

export interface ResolvedRoute {
  isValid: boolean;
  route: NavItem | null;
  normalizedPath: string;
}

export function normalizePathname(rawPath: string): string {
  if (!rawPath || rawPath === '/') {
    return '/';
  }
  const withoutQuery = rawPath.split('?')[0].split('#')[0];
  const trimmed = withoutQuery.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

export function resolveRoute(rawPath: string): ResolvedRoute {
  const normalizedPath = normalizePathname(rawPath);

  if (normalizedPath === '/dashboard') {
    const dashboardItem = NAV_ITEMS.find((item) => item.id === 'dashboard') ?? null;
    return {
      isValid: Boolean(dashboardItem),
      route: dashboardItem,
      normalizedPath: '/',
    };
  }

  const matched = NAV_ITEMS.find((item) => item.path === normalizedPath) ?? null;
  return {
    isValid: Boolean(matched),
    route: matched,
    normalizedPath,
  };
}

export function getPathByRouteId(routeId: RouteId): string {
  const found = NAV_ITEMS.find((item) => item.id === routeId);
  return found ? found.path : '/';
}

export function buildDocumentTitle(route: NavItem | null): string {
  if (!route) {
    return 'صفحة غير موجودة | AI Engineer Academy';
  }
  return `${route.labelAr} (${route.labelEn}) | AI Engineer Academy`;
}
