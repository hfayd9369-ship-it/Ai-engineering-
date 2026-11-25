import { useCallback, useEffect, useState } from 'react';
import { buildDocumentTitle, normalizePathname, resolveRoute } from '../services/router';

export function useRouter() {
  const [pathname, setPathname] = useState<string>(() => {
    if (typeof window === 'undefined') {
      return '/';
    }
    return normalizePathname(window.location.pathname);
  });

  useEffect(() => {
    const handlePopState = () => {
      setPathname(normalizePathname(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const resolved = resolveRoute(pathname);

  useEffect(() => {
    document.title = buildDocumentTitle(resolved.route);
  }, [resolved.route]);

  const navigate = useCallback((targetPath: string) => {
    const normalized = normalizePathname(targetPath);
    if (typeof window !== 'undefined' && window.location.pathname !== normalized) {
      window.history.pushState({}, '', normalized);
    }
    setPathname(normalized);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  return {
    pathname: resolved.normalizedPath,
    isValidRoute: resolved.isValid,
    activeRoute: resolved.route,
    navigate,
  };
}
