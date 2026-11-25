import { useEffect, useState, type ReactNode } from 'react';
import { GraduationCap, Menu, Moon, Play, Sun, X } from 'lucide-react';
import { NAV_ITEMS } from '../data/navigation';
import type { NavItem, ThemeMode } from '../types/academy';
import { BilingualTerm } from './BilingualTerm';
import { NavIcon } from './NavIcon';

interface LayoutShellProps {
  activeRoute: NavItem | null;
  currentPath: string;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onNavigate: (path: string) => void;
  onContinueLearning: () => void;
  children: ReactNode;
}

export function LayoutShell({
  activeRoute,
  currentPath,
  theme,
  onToggleTheme,
  onNavigate,
  onContinueLearning,
  children,
}: LayoutShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  const renderNavLinks = (isMobile = false) => (
    <ul className="space-y-1">
      {NAV_ITEMS.map((item) => {
        const isActive = item.path === currentPath;
        return (
          <li key={item.id}>
            <a
              href={item.path}
              onClick={(e) => handleNavClick(e, item.path)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex items-center justify-between gap-3 rounded-lg px-3 transition-colors ${
                isMobile ? 'min-h-[44px] py-2.5' : 'min-h-[40px] py-2'
              } ${
                isActive
                  ? 'bg-blue-600/10 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <span className="flex items-center gap-2.5 min-w-0">
                <NavIcon
                  name={item.iconName}
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'
                  }`}
                />
                <span className="text-sm truncate">{item.labelAr}</span>
              </span>
              <BilingualTerm className="text-[11px] text-slate-400 dark:text-slate-500 shrink-0">
                {item.labelEn}
              </BilingualTerm>
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 text-slate-900 dark:bg-[#0B0F17] dark:text-slate-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-blue-600 focus:text-white focus:text-sm"
      >
        تخطي إلى المحتوى الرئيسي
      </a>

      {/* Desktop Sidebar (RTL Right Side) */}
      <aside
        aria-label="الشريط الجانبي للأكاديمية"
        className="hidden lg:flex lg:w-72 lg:flex-col lg:shrink-0 lg:sticky lg:top-0 lg:h-screen border-l border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0F1522]"
      >
        <div className="h-16 px-5 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800/80 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
              أكاديمية مهندس الذكاء الاصطناعي
            </div>
            <BilingualTerm className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
              AI Engineer Academy
            </BilingualTerm>
          </div>
        </div>

        <nav aria-label="التنقل الرئيسي" className="flex-1 overflow-y-auto px-3 py-4">
          {renderNavLinks(false)}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            المرحلة الأولى · التأسيس
          </span>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'التبديل إلى المظهر الفاتح' : 'التبديل إلى المظهر الداكن'}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Moon className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </aside>

      {/* Mobile Compact Top Header (< 15% viewport height) */}
      <header className="lg:hidden sticky top-0 z-30 h-14 px-3 flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800/80 bg-white/95 dark:bg-[#0F1522]/95 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="فتح قائمة التنقل"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-drawer"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Menu className="w-5 h-5" aria-hidden="true" />
        </button>

        <a
          href="/"
          onClick={(e) => handleNavClick(e, '/')}
          className="flex items-center gap-2 min-w-0"
        >
          <BilingualTerm className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
            AI Engineer Academy
          </BilingualTerm>
        </a>

        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'التبديل إلى المظهر الفاتح' : 'التبديل إلى المظهر الداكن'}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4" aria-hidden="true" />
          ) : (
            <Moon className="w-4 h-4" aria-hidden="true" />
          )}
        </button>
      </header>

      {/* Mobile Slide-Over Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-[1px]"
            aria-hidden="true"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="قائمة التنقل"
            className="relative w-80 max-w-[85vw] h-full bg-white dark:bg-[#0F1522] border-l border-slate-200 dark:border-slate-800 flex flex-col z-10 shadow-xl"
          >
            <div className="h-14 px-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                  أكاديمية مهندس الذكاء الاصطناعي
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="إغلاق قائمة التنقل"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="التنقل على الجوال" className="flex-1 overflow-y-auto px-3 py-4">
              {renderNavLinks(true)}
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onContinueLearning();
                }}
                className="w-full min-h-[44px] px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Play className="w-4 h-4" aria-hidden="true" />
                <span>متابعة التعلم</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Desktop Top Contextual Bar */}
        <header className="hidden lg:flex h-16 px-8 items-center justify-between gap-8 border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-[#0F1522]/80 backdrop-blur-sm sticky top-0 z-20">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 whitespace-nowrap">
              {activeRoute ? activeRoute.labelAr : 'صفحة غير موجودة'}
            </span>
            {activeRoute && (
              <>
                <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">
                  /
                </span>
                <BilingualTerm className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                  {activeRoute.labelEn}
                </BilingualTerm>
              </>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {currentPath !== '/' && currentPath !== '/classroom' && (
              <button
                type="button"
                onClick={onContinueLearning}
                className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium whitespace-nowrap shrink-0 transition-colors"
              >
                <Play className="w-3.5 h-3.5" aria-hidden="true" />
                <span>متابعة التعلم</span>
              </button>
            )}
          </div>
        </header>

        <main id="main-content" className="flex-1 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
