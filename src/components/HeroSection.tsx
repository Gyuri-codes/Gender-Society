import { useState } from 'react';
import { 
  Play, 
  Compass, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  Calendar, 
  Layers, 
  HeartHandshake
} from 'lucide-react';
import { LAWS } from '../data/lawsData';
import { Law } from '../types/presentation';

interface HeroSectionProps {
  onSelectLaw: (law: Law) => void;
  onOpenPresentationMode: () => void;
  onExploreHall: () => void;
}

export default function HeroSection({
  onSelectLaw,
  onOpenPresentationMode,
  onExploreHall
}: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const searchResults = searchQuery.trim()
    ? LAWS.filter((l) =>
        l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.ra.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.short.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.concepts.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <section 
      id="hero" 
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden pattern-grid"
    >
      {/* Subtle architectural ambient radial gradient */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] bg-gradient-to-b from-amber-500/10 via-teal-500/5 to-transparent blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Curatorial Kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-amber-500/20 text-xs font-mono tracking-widest text-amber-600 dark:text-amber-400 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>Philippine Legal Archive · Curated Exhibition</span>
          </div>

          {/* Main Title with Elegant Typography */}
          <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-neutral-900 dark:text-neutral-50 leading-[1.08]">
            Laws Supporting <br />
            <span className="bg-gradient-to-r from-amber-500 via-teal-400 to-purple-500 bg-clip-text text-transparent">
              Sexuality & Gender
            </span>
          </h1>

          {/* Exhibition Description */}
          <p className="text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal max-w-2xl mx-auto">
            An interactive educational presentation exploring landmark Philippine legislation, protective statutes, and pending equality measures that safeguard human dignity, security, and equal rights.
          </p>

          {/* Interactive Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              id="hero-start-presenting-btn"
              onClick={onOpenPresentationMode}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-sm shadow-md shadow-amber-500/25 transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch Slide Deck</span>
            </button>

            <button
              id="hero-explore-exhibits-btn"
              onClick={onExploreHall}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl glass-panel text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white font-semibold text-sm border border-neutral-300 dark:border-neutral-700/80 hover:border-amber-500/50 transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <Compass className="w-4 h-4 text-teal-500" />
              <span>Explore 12 Exhibits</span>
            </button>
          </div>

          {/* Quick Search and Filter Bar */}
          <div className="pt-6 max-w-xl mx-auto relative">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="hero-search-input"
                type="text"
                placeholder="Search by law, title, or topic (e.g. Magna Carta, VAWC, SOGIE, Maternity)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                className="w-full pl-11 pr-4 py-3 rounded-xl text-sm glass-panel border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-200"
                aria-label="Search laws and provisions"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-1"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Search Dropdown Results */}
            {isFocused && searchResults.length > 0 && (
              <div 
                id="hero-search-results-dropdown"
                className="absolute top-full left-0 right-0 mt-2 glass-card rounded-xl p-2 z-50 shadow-2xl border border-neutral-200 dark:border-neutral-800 text-left max-h-72 overflow-y-auto"
              >
                <div className="px-3 py-1 text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                  Matching Exhibits ({searchResults.length})
                </div>
                {searchResults.map((law) => (
                  <button
                    key={law.id}
                    onClick={() => {
                      onSelectLaw(law);
                      setIsFocused(false);
                      setSearchQuery('');
                    }}
                    className="w-full px-3 py-2.5 rounded-lg hover:bg-amber-500/10 dark:hover:bg-amber-400/10 flex items-center justify-between text-left transition-colors duration-150 group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                          {law.ra}
                        </span>
                        <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-amber-600 dark:group-hover:text-amber-300">
                          {law.short}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1">
                        {law.purpose}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                      {law.yearLabel}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Metrics Ribbon */}
          <div 
            id="hero-stats-ribbon"
            className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-left max-w-4xl mx-auto"
          >
            {[
              {
                icon: BookOpen,
                value: '12',
                label: 'Exhibits & Laws',
                sub: '11 Enacted · 1 Pending Bill',
                color: 'text-amber-500'
              },
              {
                icon: Calendar,
                value: '1989 — Now',
                label: 'Chronology Span',
                sub: 'Over 3 Decades of Reform',
                color: 'text-teal-500'
              },
              {
                icon: Layers,
                value: '9 Pillars',
                label: 'Rights Categories',
                sub: 'From Workplace to Health',
                color: 'text-purple-500'
              },
              {
                icon: HeartHandshake,
                value: '8 Concepts',
                label: 'Core Human Values',
                sub: 'Equality, Safety & Dignity',
                color: 'text-sky-500'
              }
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="glass-card rounded-xl p-3.5 sm:p-4 border border-neutral-200/80 dark:border-neutral-800 transition-all duration-300 hover:border-amber-500/30"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                    <span className="font-display font-bold text-lg sm:text-xl text-neutral-900 dark:text-neutral-100">
                      {stat.value}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    {stat.sub}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Constitutional Citation Badge */}
          <div className="pt-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-panel border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>
                <strong>Philippine Constitution Art. II, Sec. 14:</strong> "The State recognizes the role of women in nation-building, and shall ensure fundamental equality before the law."
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
