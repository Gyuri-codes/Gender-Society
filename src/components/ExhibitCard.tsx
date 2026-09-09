import { ArrowUpRight, Shield, Award, FileText } from 'lucide-react';
import { Law, Category } from '../types/presentation';

interface ExhibitCardProps {
  key?: string;
  law: Law;
  index: number;
  category?: Category;
  onSelect: (law: Law) => void;
}

export default function ExhibitCard({ law, index, category, onSelect }: ExhibitCardProps) {
  const accentColor = category?.accent || '#D9B36A';
  const isBill = law.kind === 'BILL';

  return (
    <div
      id={`exhibit-card-${law.id}`}
      onClick={() => onSelect(law)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(law);
        }
      }}
      className="group relative flex flex-col justify-between rounded-2xl glass-card p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer border border-neutral-200/90 dark:border-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 overflow-hidden"
      style={{
        borderTop: `3px solid ${accentColor}`
      }}
      aria-label={`View details for ${law.ra}: ${law.short}`}
    >
      {/* Background Accent Glow on Hover */}
      <div
        className="absolute -right-16 -top-16 w-36 h-36 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl pointer-events-none"
        style={{ backgroundColor: accentColor }}
        aria-hidden="true"
      />

      <div>
        {/* Header Ribbon: Exhibit Number & Status Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-mono text-[11px] font-semibold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase">
            Exhibit {String(index + 1).padStart(2, '0')}
          </span>

          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium tracking-wide uppercase ${
              isBill
                ? 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/30'
                : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
            }`}
          >
            {isBill ? <FileText className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
            {isBill ? 'Pending Bill' : 'Republic Act'}
          </span>
        </div>

        {/* Official Number & Title */}
        <div className="space-y-1.5 mb-3">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-display font-bold text-lg sm:text-xl text-neutral-900 dark:text-neutral-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              {law.ra}
            </h3>
            <span className="text-xs font-mono font-semibold text-neutral-500 dark:text-neutral-400">
              {law.yearLabel}
            </span>
          </div>

          <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 line-clamp-1">
            {law.title}
          </h4>
        </div>

        {/* Category Pill */}
        <div className="mb-4">
          <span
            className="inline-block px-2.5 py-1 rounded-md text-xs font-medium"
            style={{
              backgroundColor: `${accentColor}18`,
              color: accentColor,
              border: `1px solid ${accentColor}35`
            }}
          >
            {category?.name || law.label}
          </span>
        </div>

        {/* Key Idea Quote Box */}
        <blockquote className="text-xs italic text-neutral-600 dark:text-neutral-300 bg-neutral-100/80 dark:bg-neutral-900/60 p-3 rounded-xl border-l-2 mb-4 leading-relaxed line-clamp-2"
          style={{ borderColor: accentColor }}
        >
          "{law.keyIdea}"
        </blockquote>

        {/* Summary Snippet */}
        <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed mb-4">
          {law.summary}
        </p>
      </div>

      <div>
        {/* Core Concepts Badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {law.concepts.map((concept) => (
            <span
              key={concept}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700/60"
            >
              #{concept}
            </span>
          ))}
        </div>

        {/* Action Button Strip */}
        <div className="pt-3 border-t border-neutral-200/80 dark:border-neutral-800/80 flex items-center justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
          <span className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" style={{ color: accentColor }} />
            Examine Exhibit
          </span>
          <div className="w-7 h-7 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
