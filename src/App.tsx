import { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ExhibitCard from './components/ExhibitCard';
import LawExhibitModal from './components/LawExhibitModal';
import TimelineSection from './components/TimelineSection';
import CategoryDialSection from './components/CategoryDialSection';
import ComparisonMatrixSection from './components/ComparisonMatrixSection';
import ConceptsSynthesisSection from './components/ConceptsSynthesisSection';
import PresentationModeModal from './components/PresentationModeModal';
import Footer from './components/Footer';

import { LAWS, CATEGORIES } from './data/lawsData';
import { Law } from './types/presentation';
import { Compass, Filter, Search } from 'lucide-react';

export default function App() {
  // Theme & Accessibility State
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme_preference');
    if (saved) return saved === 'dark';
    return true; // Default to dark museum mode
  });

  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  // Modal & Presentation States
  const [selectedLaw, setSelectedLaw] = useState<Law | null>(null);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
  const [presentationSlideIndex, setPresentationSlideIndex] = useState(0);

  // Exhibit Filter State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'RA' | 'BILL'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Synchronize Dark Mode Class on root HTML
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme_preference', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme_preference', 'light');
    }
  }, [darkMode]);

  // Synchronize Reduced Motion Class
  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }, [reducedMotion]);

  // Global keyboard shortcuts (P for presentation, Esc handled by modals)
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      if ((e.key === 'p' || e.key === 'P') && !selectedLaw && !isPresentationOpen) {
        e.preventDefault();
        setIsPresentationOpen(true);
        setPresentationSlideIndex(0);
      }
    };

    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [selectedLaw, isPresentationOpen]);

  // Filtered Laws for Section 01
  const filteredLaws = useMemo(() => {
    return LAWS.filter((law) => {
      const matchesCategory = selectedCategory === 'all' || law.category === selectedCategory;
      const matchesStatus = statusFilter === 'all' || law.kind === statusFilter;
      const matchesSearch = 
        !searchQuery.trim() ||
        law.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        law.ra.toLowerCase().includes(searchQuery.toLowerCase()) ||
        law.short.toLowerCase().includes(searchQuery.toLowerCase()) ||
        law.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        law.concepts.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [selectedCategory, statusFilter, searchQuery]);

  const scrollToLaws = () => {
    const el = document.getElementById('laws');
    if (el) {
      el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Top Navbar */}
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion(!reducedMotion)}
        onOpenPresentationMode={() => {
          setIsPresentationOpen(true);
          setPresentationSlideIndex(0);
        }}
      />

      <main id="main-content">
        {/* Hero / Exhibition Hall Entrance */}
        <HeroSection
          onSelectLaw={(law) => setSelectedLaw(law)}
          onOpenPresentationMode={() => {
            setIsPresentationOpen(true);
            setPresentationSlideIndex(0);
          }}
          onExploreHall={scrollToLaws}
        />

        {/* SECTION 01: THE INTERACTIVE LAW MAP & EXHIBITS */}
        <section
          id="laws"
          className="relative py-24 sm:py-32 scroll-mt-16 pattern-grid border-t border-neutral-200/80 dark:border-neutral-800/80"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-mono tracking-widest text-teal-600 dark:text-teal-400 uppercase">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Section 01 · The Collection</span>
                </div>

                <h2 className="font-display font-bold text-3xl sm:text-5xl text-neutral-900 dark:text-neutral-50 tracking-tight leading-tight">
                  The Interactive <span className="text-teal-600 dark:text-teal-400">Law Map</span>
                </h2>

                <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
                  Twelve pieces of legislation, each arranged as its own curated exhibit. Search, filter by rights domain, and step into any statute to inspect its full legal framework.
                </p>
              </div>

              {/* Status Pill Filters */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl glass-panel border border-neutral-200 dark:border-neutral-700/80 text-xs">
                {(['all', 'RA', 'BILL'] as const).map((status) => (
                  <button
                    key={status}
                    id={`filter-status-${status}`}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      statusFilter === status
                        ? 'bg-amber-500 text-white font-semibold shadow-sm'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    {status === 'all' ? 'All (12)' : status === 'RA' ? 'Enacted (11)' : 'Bills (1)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Pills & Search Ribbon */}
            <div className="mb-10 space-y-4">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist">
                <button
                  id="category-pill-all"
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 border ${
                    selectedCategory === 'all'
                      ? 'bg-amber-500 text-white border-amber-500 shadow-sm shadow-amber-500/20 font-semibold'
                      : 'glass-panel text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white border-neutral-200 dark:border-neutral-800'
                  }`}
                >
                  All Categories (12)
                </button>

                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.key;
                  const count = LAWS.filter((l) => l.category === cat.key).length;

                  return (
                    <button
                      key={cat.key}
                      id={`category-pill-${cat.key}`}
                      onClick={() => setSelectedCategory(cat.key)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 border flex items-center gap-1.5 ${
                        isSelected
                          ? 'text-white border-transparent font-semibold shadow-sm'
                          : 'glass-panel text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white border-neutral-200 dark:border-neutral-800'
                      }`}
                      style={{
                        backgroundColor: isSelected ? cat.accent : undefined
                      }}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: isSelected ? '#ffffff' : cat.accent }}
                      />
                      <span>{cat.short}</span>
                      <span className="text-[10px] opacity-75 font-mono">({count})</span>
                    </button>
                  );
                })}
              </div>

              {/* Sub-search bar inside collection */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Filter collection by keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl glass-panel border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  Displaying {filteredLaws.length} of {LAWS.length} Exhibits
                </div>
              </div>
            </div>

            {/* Exhibits Grid (All 12 Laws) */}
            {filteredLaws.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredLaws.map((law) => {
                  const originalIndex = LAWS.findIndex((l) => l.id === law.id);
                  const cat = CATEGORIES.find((c) => c.key === law.category);

                  return (
                    <ExhibitCard
                      key={law.id}
                      law={law}
                      index={originalIndex}
                      category={cat}
                      onSelect={(l) => setSelectedLaw(l)}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="p-12 text-center rounded-3xl glass-card border border-neutral-200 dark:border-neutral-800 space-y-3">
                <Filter className="w-8 h-8 text-neutral-400 mx-auto" />
                <h3 className="font-display font-bold text-lg text-neutral-900 dark:text-neutral-100">
                  No Matching Exhibits Found
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Try clearing your search term or adjusting the category filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setStatusFilter('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-white font-semibold text-xs"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 02: CHRONOLOGY / TIMELINE */}
        <TimelineSection onSelectLaw={(law) => setSelectedLaw(law)} />

        {/* SECTION 03: TAXONOMY / CATEGORY DIAL */}
        <CategoryDialSection onSelectLaw={(law) => setSelectedLaw(law)} />

        {/* SECTION 04: COMPARATIVE MATRIX */}
        <ComparisonMatrixSection onSelectLaw={(law) => setSelectedLaw(law)} />

        {/* SECTION 05: CONCEPTS & SYNTHESIS */}
        <ConceptsSynthesisSection onSelectLaw={(law) => setSelectedLaw(law)} />
      </main>

      {/* Footer */}
      <Footer onScrollToTop={scrollToTop} />

      {/* Exhibit Detail Modal */}
      {selectedLaw && (
        <LawExhibitModal
          law={selectedLaw}
          allLaws={LAWS}
          categories={CATEGORIES}
          onClose={() => setSelectedLaw(null)}
          onSelectLaw={(law) => setSelectedLaw(law)}
          onOpenPresentationMode={(idx) => {
            setIsPresentationOpen(true);
            setPresentationSlideIndex(idx ?? 0);
          }}
        />
      )}

      {/* Full-Screen Presentation Deck Modal */}
      <PresentationModeModal
        isOpen={isPresentationOpen}
        initialSlideIndex={presentationSlideIndex}
        onClose={() => setIsPresentationOpen(false)}
      />
    </div>
  );
}
