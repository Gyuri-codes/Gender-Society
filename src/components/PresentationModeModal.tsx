import { useState, useEffect, useCallback } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Play, 
  Pause, 
  MessageSquare, 
  Scale, 
  ShieldCheck, 
  Heart, 
  Layers, 
  Sparkles,
  HelpCircle,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { LAWS, CATEGORIES } from '../data/lawsData';
import { Law } from '../types/presentation';

interface PresentationModeModalProps {
  isOpen: boolean;
  initialSlideIndex?: number;
  onClose: () => void;
}

export default function PresentationModeModal({
  isOpen,
  initialSlideIndex = 0,
  onClose
}: PresentationModeModalProps) {
  const [currentSlide, setCurrentSlide] = useState(initialSlideIndex);
  const [showNotes, setShowNotes] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Total slides: Slide 0 is Title, Slides 1..12 are the 12 Laws, Slide 13 is Conclusion
  const totalSlides = LAWS.length + 2;

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  }, [totalSlides]);

  // Sync initialSlideIndex when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentSlide(initialSlideIndex);
    }
  }, [isOpen, initialSlideIndex]);

  // Auto-play timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && isOpen) {
      timer = setInterval(() => {
        goToNext();
      }, 7000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, isOpen, goToNext]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'n' || e.key === 'N') {
        setShowNotes((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, goToNext, goToPrev]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  if (!isOpen) return null;

  // Identify content for current slide
  const isTitleSlide = currentSlide === 0;
  const isConclusionSlide = currentSlide === totalSlides - 1;
  const currentLaw: Law | null = (!isTitleSlide && !isConclusionSlide) 
    ? LAWS[currentSlide - 1] 
    : null;

  const category = currentLaw ? CATEGORIES.find((c) => c.key === currentLaw.category) : null;
  const accentColor = category?.accent || '#D9B36A';

  return (
    <div
      id="presentation-deck-overlay"
      className="fixed inset-0 z-[100] bg-neutral-950 text-neutral-100 flex flex-col justify-between overflow-hidden animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Full-Screen Presentation Deck"
    >
      {/* Top Presentation Bar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-neutral-950/80 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <span className="font-display font-bold text-xs sm:text-sm tracking-wide">
              Gender & Society · Legislative Masterclass
            </span>
            <span className="text-[10px] text-neutral-400 block font-mono">
              Slide {currentSlide + 1} of {totalSlides}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Notes Toggle */}
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              showNotes ? 'bg-amber-500 text-neutral-950 font-bold' : 'bg-white/10 text-neutral-300 hover:bg-white/20'
            }`}
            title="Toggle Speaker Notes (Shortcut: N)"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Speaker Notes</span>
          </button>

          {/* Autoplay Toggle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-2 rounded-lg text-xs transition-colors ${
              isPlaying ? 'bg-teal-500 text-neutral-950' : 'bg-white/10 text-neutral-300 hover:bg-white/20'
            }`}
            title={isPlaying ? 'Pause Auto-play' : 'Start Auto-play'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-white/10 text-neutral-300 hover:bg-white/20 transition-colors hidden sm:block"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close / Exit Presentation */}
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors focus:outline-none ml-2"
            title="Exit Presentation Deck (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Slide Stage */}
      <main className="flex-1 relative flex items-center justify-center p-6 sm:p-12 overflow-y-auto z-10">
        {/* Subtle Slide Background Aura */}
        <div 
          className="absolute inset-0 bg-radial from-amber-500/5 via-transparent to-transparent pointer-events-none" 
          aria-hidden="true" 
        />

        {/* SLIDE 0: TITLE SLIDE */}
        {isTitleSlide && (
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>Philippine Legislative Master Presentation</span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl text-neutral-100 tracking-tight leading-tight">
              Laws Supporting <br />
              <span className="bg-gradient-to-r from-amber-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
                Sexuality & Gender
              </span>
            </h1>

            <p className="text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              A comprehensive examination of 12 statutory instruments and proposed reforms shaping equality, bodily autonomy, and human rights in the Philippines.
            </p>

            <div className="pt-6">
              <button
                onClick={goToNext}
                className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-sm shadow-xl shadow-amber-500/20 transition-all active:scale-95 inline-flex items-center gap-2"
              >
                <span>Begin Presentation</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-8 text-xs font-mono text-neutral-500">
              Press Spacebar or → to proceed · Press N for speaker notes · Esc to exit
            </div>
          </div>
        )}

        {/* SLIDES 1-12: LAW EXHIBIT SLIDES */}
        {currentLaw && (
          <div 
            key={currentLaw.id}
            className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-300"
          >
            {/* Slide Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                    Exhibit {String(currentSlide).padStart(2, '0')} · {currentLaw.status}
                  </span>
                  <span className="text-white/30">|</span>
                  <span className="font-mono text-xs font-semibold" style={{ color: accentColor }}>
                    {category?.name || currentLaw.label}
                  </span>
                </div>
                <h2 className="font-display font-bold text-3xl sm:text-5xl text-neutral-50">
                  {currentLaw.ra}: {currentLaw.short}
                </h2>
              </div>

              <div className="text-right">
                <div className="font-mono text-2xl font-bold" style={{ color: accentColor }}>
                  {currentLaw.yearLabel}
                </div>
                <span className="text-xs font-mono text-neutral-400 uppercase">Enactment Year</span>
              </div>
            </div>

            {/* Guiding Premise Banner */}
            <div 
              className="p-6 rounded-2xl border-l-4 space-y-2 shadow-2xl"
              style={{
                borderColor: accentColor,
                backgroundColor: `${accentColor}15`
              }}
            >
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400">
                <Heart className="w-4 h-4" style={{ color: accentColor }} />
                <span>Core Philosophical Premise</span>
              </div>
              <p className="text-xl sm:text-2xl italic font-medium text-neutral-100 leading-snug">
                "{currentLaw.keyIdea}"
              </p>
            </div>

            {/* 3 Presentation Pillars Grid */}
            <div className="grid md:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-amber-400">
                  <HelpCircle className="w-4 h-4" />
                  <span>Why It Matters</span>
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {currentLaw.why}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-teal-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Who It Protects</span>
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {currentLaw.protects}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-purple-400">
                  <TrendingUp className="w-4 h-4" />
                  <span>Societal Impact</span>
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {currentLaw.impact}
                </p>
              </div>
            </div>

            {/* Key Provisions */}
            {currentLaw.keyProvisions && currentLaw.keyProvisions.length > 0 && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-wrap gap-4 text-xs text-neutral-300">
                <span className="font-mono uppercase font-bold text-neutral-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> Key Mandates:
                </span>
                {currentLaw.keyProvisions.slice(0, 3).map((p, idx) => (
                  <span key={idx} className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{p}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SLIDE 13: CONCLUSION SLIDE */}
        {isConclusionSlide && (
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 font-mono text-xs uppercase tracking-widest">
              <Scale className="w-4 h-4" />
              <span>Synthesis & Conclusion</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-5xl text-neutral-50 tracking-tight leading-tight">
              Legal Literacy as an Instrument of Justice
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Legislation only breathes through the citizens who understand, invoke, and defend it. Knowing these twelve statutory frameworks empowers every Filipino to stand up for dignity, equality, and safety.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 pt-6 max-w-3xl mx-auto text-left text-xs">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="font-mono text-amber-400 font-bold">1989 — 2004</span>
                <h4 className="font-semibold text-neutral-200">Worker & Survivor Safety</h4>
                <p className="text-neutral-400 text-[11px]">Anti-discrimination, anti-harassment, anti-rape, and anti-VAWC protection orders.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="font-mono text-teal-400 font-bold">2009 — 2012</span>
                <h4 className="font-semibold text-neutral-200">Holistic Empowerment</h4>
                <p className="text-neutral-400 text-[11px]">The Magna Carta of Women and the Reproductive Health Act.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="font-mono text-purple-400 font-bold">The Horizon</span>
                <h4 className="font-semibold text-neutral-200">SOGIE Equality</h4>
                <p className="text-neutral-400 text-[11px]">Universal non-discrimination protections for all sexualities and identities.</p>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => setCurrentSlide(0)}
                className="px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs transition-colors"
              >
                Restart Presentation
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Speaker Notes Drawer */}
      {showNotes && currentLaw && (
        <div 
          id="presentation-speaker-notes"
          className="border-t border-white/15 bg-neutral-900/95 p-4 sm:p-6 text-xs text-neutral-300 max-h-48 overflow-y-auto animate-in slide-in-from-bottom duration-200 z-20"
        >
          <div className="max-w-4xl mx-auto space-y-2">
            <div className="flex items-center justify-between text-amber-400 font-mono text-[11px] uppercase font-bold">
              <span>Presenter Talking Points · {currentLaw.ra}</span>
              <span>Press N to hide notes</span>
            </div>
            <p className="leading-relaxed">
              <strong>Context & Emphasis:</strong> When discussing {currentLaw.short}, highlight that it was designed to solve: "{currentLaw.why}". Ensure students/audience understand that this law covers "{currentLaw.protects}".
            </p>
            <p className="leading-relaxed text-neutral-400">
              <strong>Discussion Prompt:</strong> How does {currentLaw.ra} reflect the constitutional mandate of Article II, Section 14, and what challenges persist in grassroots enforcement today?
            </p>
          </div>
        </div>
      )}

      {/* Bottom Deck Navigation Bar */}
      <footer className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-neutral-950/90 backdrop-blur-md z-20">
        <button
          onClick={goToPrev}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-neutral-200 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous Slide</span>
        </button>

        {/* Slide Indicator Dots */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-md px-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-200 focus:outline-none ${
                currentSlide === i 
                  ? 'w-6 bg-amber-400' 
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              title={`Go to Slide ${i + 1}`}
              aria-label={`Go to Slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 text-xs font-bold transition-colors"
          aria-label="Next slide"
        >
          <span className="hidden sm:inline">Next Slide</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
}
