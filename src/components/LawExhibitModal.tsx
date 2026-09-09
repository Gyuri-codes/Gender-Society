import { useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Heart, 
  TrendingUp, 
  FileText, 
  Layers, 
  CheckCircle2, 
  HelpCircle,
  Tv
} from 'lucide-react';
import { Law, Category } from '../types/presentation';

interface LawExhibitModalProps {
  law: Law | null;
  allLaws: Law[];
  categories: Category[];
  onClose: () => void;
  onSelectLaw: (law: Law) => void;
  onOpenPresentationMode: (initialIndex?: number) => void;
}

export default function LawExhibitModal({
  law,
  allLaws,
  categories,
  onClose,
  onSelectLaw,
  onOpenPresentationMode
}: LawExhibitModalProps) {
  if (!law) return null;

  const currentIndex = allLaws.findIndex((l) => l.id === law.id);
  const prevLaw = currentIndex > 0 ? allLaws[currentIndex - 1] : allLaws[allLaws.length - 1];
  const nextLaw = currentIndex < allLaws.length - 1 ? allLaws[currentIndex + 1] : allLaws[0];
  const category = categories.find((c) => c.key === law.category);
  const accentColor = category?.accent || '#D9B36A';

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onSelectLaw(prevLaw);
      } else if (e.key === 'ArrowRight') {
        onSelectLaw(nextLaw);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onSelectLaw, prevLaw, nextLaw]);

  return (
    <div
      id="law-exhibit-modal-overlay"
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-law-title"
    >
      <div
        id="law-exhibit-modal-content"
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl glass-card overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        style={{
          borderTop: `4px solid ${accentColor}`
        }}
      >
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">
              Exhibit {String(currentIndex + 1).padStart(2, '0')} of {allLaws.length}
            </span>
            <span className="text-neutral-300 dark:text-neutral-700">·</span>
            <span
              className="text-xs font-semibold"
              style={{ color: accentColor }}
            >
              {category?.name || law.label}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Step to Slide Deck */}
            <button
              id="modal-open-slide-btn"
              onClick={() => {
                onClose();
                onOpenPresentationMode(currentIndex + 1); // +1 offset for slide deck intro slide
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors"
              title="Present this law in Full-Screen Slide Mode"
            >
              <Tv className="w-3.5 h-3.5" />
              <span>Present Slide</span>
            </button>

            {/* Prev / Next Stepper */}
            <div className="flex items-center rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden">
              <button
                id="modal-prev-law-btn"
                onClick={() => onSelectLaw(prevLaw)}
                className="p-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                title={`Previous: ${prevLaw.ra}`}
                aria-label="Previous exhibit"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                id="modal-next-law-btn"
                onClick={() => onSelectLaw(nextLaw)}
                className="p-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors border-l border-neutral-200 dark:border-neutral-800"
                title={`Next: ${nextLaw.ra}`}
                aria-label="Next exhibit"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Close Button */}
            <button
              id="modal-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors focus:outline-none"
              aria-label="Close exhibit modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto px-5 sm:px-8 py-6 space-y-6 sm:space-y-8">
          {/* Title and Identification Header */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-sm font-bold px-3 py-1 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                {law.ra}
              </span>
              <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                Enacted / Status: <strong className="text-neutral-800 dark:text-neutral-200">{law.yearLabel}</strong>
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 font-medium text-neutral-600 dark:text-neutral-300">
                {law.status}
              </span>
            </div>

            <h2 
              id="modal-law-title"
              className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 dark:text-neutral-50 leading-tight"
            >
              {law.title}
            </h2>
            <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
              Known colloquially as: <span className="text-neutral-900 dark:text-neutral-200">{law.short}</span>
            </p>
          </div>

          {/* Key Idea Callout Box */}
          <div 
            className="p-4 sm:p-5 rounded-2xl border-l-4 space-y-2"
            style={{ 
              borderColor: accentColor,
              backgroundColor: `${accentColor}0e`
            }}
          >
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase" style={{ color: accentColor }}>
              <Heart className="w-4 h-4" />
              <span>The Guiding Principle</span>
            </div>
            <p className="text-base sm:text-lg italic font-medium text-neutral-900 dark:text-neutral-100 leading-relaxed">
              "{law.keyIdea}"
            </p>
          </div>

          {/* Core Content Grid */}
          <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
            {/* Why It Matters */}
            <div className="p-4 sm:p-5 rounded-2xl glass-panel space-y-2 border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                <HelpCircle className="w-4 h-4" />
                <span>Why This Law Was Enacted</span>
              </div>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {law.why}
              </p>
            </div>

            {/* Who It Protects */}
            <div className="p-4 sm:p-5 rounded-2xl glass-panel space-y-2 border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wide">
                <ShieldCheck className="w-4 h-4" />
                <span>Protected Citizens & Sectors</span>
              </div>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {law.protects}
              </p>
            </div>

            {/* Social Impact and Enforcement */}
            <div className="p-4 sm:p-5 rounded-2xl glass-panel space-y-2 border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                <TrendingUp className="w-4 h-4" />
                <span>Societal Impact & Institutional Action</span>
              </div>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {law.impact}
              </p>
            </div>

            {/* Support and Remedies */}
            <div className="p-4 sm:p-5 rounded-2xl glass-panel space-y-2 border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wide">
                <FileText className="w-4 h-4" />
                <span>Legal Remedies & Mechanisms</span>
              </div>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {law.support}
              </p>
            </div>
          </div>

          {/* Key Statutory Provisions */}
          {law.keyProvisions && law.keyProvisions.length > 0 && (
            <div className="p-5 rounded-2xl glass-panel border border-neutral-200 dark:border-neutral-800 space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-500" />
                <span>Essential Statutory Mandates</span>
              </h4>
              <ul className="grid sm:grid-cols-2 gap-2.5">
                {law.keyProvisions.map((provision, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{provision}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Philosophical Concepts Tags */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono text-neutral-400 uppercase">Core Values:</span>
              {law.concepts.map((concept) => (
                <span
                  key={concept}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                >
                  #{concept}
                </span>
              ))}
            </div>

            <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline">
              Use ← and → arrow keys to browse exhibits
            </span>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-3.5 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70 text-xs">
          <button
            onClick={() => onSelectLaw(prevLaw)}
            className="flex items-center gap-1.5 font-semibold text-neutral-600 dark:text-neutral-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous:</span> {prevLaw.ra}
          </button>

          <span className="font-mono text-[11px] text-neutral-400">
            {currentIndex + 1} / {allLaws.length}
          </span>

          <button
            onClick={() => onSelectLaw(nextLaw)}
            className="flex items-center gap-1.5 font-semibold text-neutral-600 dark:text-neutral-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            <span className="hidden sm:inline">Next:</span> {nextLaw.ra}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
