import { useState, useEffect } from 'react';
import { 
  Scale, 
  Sun, 
  Moon, 
  Tv, 
  Menu, 
  X, 
  Sparkles,
  Eye
} from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  onOpenPresentationMode: () => void;
}

export default function Navbar({
  darkMode,
  onToggleDarkMode,
  reducedMotion,
  onToggleReducedMotion,
  onOpenPresentationMode
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Track active section
      const sections = ['hero', 'laws', 'timeline', 'categories', 'compare', 'about'];
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div 
        id="top-progress-bar"
        className="fixed top-0 left-0 right-0 h-[3px] z-[70] bg-transparent"
        aria-hidden="true"
      >
        <div 
          className="h-full bg-gradient-to-r from-amber-500 via-teal-400 to-purple-500 transition-transform duration-75 origin-left"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header 
        id="main-navigation"
        className={`fixed top-0 inset-x-0 z-[60] transition-all duration-300 ${
          scrolled 
            ? 'glass-panel shadow-lg shadow-black/5 dark:shadow-black/40 py-2.5 sm:py-3' 
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Tagline */}
          <button 
            id="nav-brand-button"
            onClick={() => scrollToSection('hero')} 
            className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
            aria-label="Scroll to top of presentation"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-400/20 to-teal-400/20 border border-amber-500/30 dark:border-amber-400/30 flex items-center justify-center text-amber-600 dark:text-amber-400 transition-transform duration-300 group-hover:scale-105">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm sm:text-base tracking-wide text-neutral-900 dark:text-neutral-100">
                  Gender & Society
                </span>
                <span className="hidden md:inline-block text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                  Legal Archive
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium hidden sm:block">
                Laws Supporting Sexuality and Gender
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs xl:text-sm font-medium" aria-label="Main Navigation">
            {[
              { id: 'laws', label: '01 · Exhibits' },
              { id: 'timeline', label: '02 · Timeline' },
              { id: 'categories', label: '03 · Taxonomy' },
              { id: 'compare', label: '04 · Matrix' },
              { id: 'about', label: '05 · Concepts' }
            ].map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1.5 rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  activeSection === item.id
                    ? 'text-amber-700 dark:text-amber-300 bg-amber-500/10 font-semibold'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Controls: Presentation Mode, Reduced Motion & Dark Mode Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Presentation Mode Button */}
            <button
              id="presentation-deck-btn"
              onClick={onOpenPresentationMode}
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-sm shadow-amber-500/20 transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              title="Open full-screen Presentation Deck (Keyboard: P)"
              aria-label="Open presentation slide deck"
            >
              <Tv className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Present Deck</span>
              <kbd className="hidden md:inline-block ml-1 px-1.5 py-0.2 text-[10px] font-mono rounded bg-white/20">
                P
              </kbd>
            </button>

            {/* Accessibility / Motion Toggle */}
            <button
              id="reduced-motion-toggle-btn"
              onClick={onToggleReducedMotion}
              className={`p-2 rounded-lg text-xs transition-colors duration-200 border focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                reducedMotion
                  ? 'bg-teal-500/20 text-teal-700 dark:text-teal-300 border-teal-500/40'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border-transparent hover:bg-black/5 dark:hover:bg-white/5'
              }`}
              title={reducedMotion ? 'Enable Motion Animations' : 'Reduce Motion (Accessibility)'}
              aria-label={reducedMotion ? 'Enable animations' : 'Reduce motion animations'}
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              id="dark-mode-toggle-btn"
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg transition-colors duration-200 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 border border-neutral-200/80 dark:border-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              title={darkMode ? 'Switch to Light Editorial Mode' : 'Switch to Dark Museum Mode'}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-neutral-800 transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Menu */}
        {mobileMenuOpen && (
          <div 
            id="mobile-nav-drawer"
            className="lg:hidden glass-panel border-b border-neutral-200 dark:border-neutral-800 px-4 pt-3 pb-5 mt-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200"
          >
            {[
              { id: 'laws', label: '01 · Exhibits & Law Map' },
              { id: 'timeline', label: '02 · Chronological Timeline' },
              { id: 'categories', label: '03 · Taxonomy & Pillars' },
              { id: 'compare', label: '04 · Comparative Matrix' },
              { id: 'about', label: '05 · Core Societal Concepts' }
            ].map((item) => (
              <button
                key={item.id}
                id={`mobile-link-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-amber-700 dark:text-amber-300 bg-amber-500/10 font-semibold'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
              <span className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Philippine Legal Archive
              </span>
              <span>12 Exhibits</span>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
