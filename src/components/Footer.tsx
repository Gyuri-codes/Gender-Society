import { ArrowUp, Scale, Heart, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
}

export default function Footer({ onScrollToTop }: FooterProps) {
  return (
    <footer 
      id="presentation-footer"
      className="relative border-t border-neutral-200/80 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-950/90 pt-16 pb-12 pattern-grid"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Exhibition Identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display font-bold text-base text-neutral-900 dark:text-neutral-100">
                  Gender & Society
                </span>
                <span className="block text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                  Philippine Legal Archives & Educational Presentation
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
              A curated digital presentation documenting twelve pivotal statutes, protective mechanisms, and pending equality measures that define sexuality and gender rights in the Republic of the Philippines.
            </p>

            <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>Grounded in Article II, Section 14 of the 1987 Philippine Constitution</span>
            </div>
          </div>

          {/* Column 2: Legal Reference Portals */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-200">
              Statutory Resources
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              <li>
                <span className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer">
                  Official Gazette of the Philippines
                </span>
              </li>
              <li>
                <span className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer">
                  Philippine Commission on Women (PCW)
                </span>
              </li>
              <li>
                <span className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer">
                  Commission on Human Rights (CHR)
                </span>
              </li>
              <li>
                <span className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer">
                  Supreme Court E-Library Jurisprudence
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Presentation Tools */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-200">
              Accessibility & Navigation
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              <li>Full Keyboard Navigation (← / → / Esc)</li>
              <li>Light & Dark High-Contrast Themes</li>
              <li>Reduced Motion Support</li>
              <li>Responsive on Mobile, Tablet & Desktop</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-200/80 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-1.5">
            <span>Curated with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
            <span>for Legal Education & Civic Awareness</span>
          </div>

          <button
            onClick={onScrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-panel hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors text-neutral-700 dark:text-neutral-300 font-semibold"
            aria-label="Return to top of page"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
