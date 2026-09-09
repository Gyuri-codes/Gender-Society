import { useState, type ElementType } from 'react';
import { 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  Briefcase, 
  Heart, 
  Lock, 
  Flame, 
  Coins, 
  Building2, 
  Users
} from 'lucide-react';
import { CATEGORIES, LAWS } from '../data/lawsData';
import { Category, Law } from '../types/presentation';

interface CategoryDialSectionProps {
  onSelectLaw: (law: Law) => void;
}

const CATEGORY_ICONS: Record<string, ElementType> = {
  women: ShieldCheck,
  workplace: Briefcase,
  health: Heart,
  protection: Lock,
  sexualviolence: Flame,
  entrepreneurship: Coins,
  socialsecurity: Building2,
  reproductive: Heart,
  sogie: Users
};

export default function CategoryDialSection({ onSelectLaw }: CategoryDialSectionProps) {
  const [selectedKey, setSelectedKey] = useState<string>('women');

  const selectedCategory: Category = 
    CATEGORIES.find((c) => c.key === selectedKey) || CATEGORIES[0];

  const lawsInCategory = LAWS.filter((l) => l.category === selectedCategory.key);

  return (
    <section 
      id="categories" 
      className="relative py-24 sm:py-32 scroll-mt-16 pattern-grid border-t border-neutral-200/80 dark:border-neutral-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-mono tracking-widest text-purple-600 dark:text-purple-400 uppercase">
            <Layers className="w-3.5 h-3.5" />
            <span>Section 03 · Taxonomy</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl text-neutral-900 dark:text-neutral-50 tracking-tight leading-tight">
            The <span className="text-purple-600 dark:text-purple-400">Category</span> Dial
          </h2>

          <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
            Nine constellations of rights. Select any category from the dial to examine its guiding mission and explore every corresponding piece of legislation.
          </p>
        </div>

        {/* 2-Column Taxonomy Explorer */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Category Selector Grid (9 categories) */}
          <div className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
            {CATEGORIES.map((category) => {
              const isSelected = category.key === selectedKey;
              const Icon = CATEGORY_ICONS[category.key] || Layers;
              const count = LAWS.filter((l) => l.category === category.key).length;

              return (
                <button
                  key={category.key}
                  id={`category-dial-btn-${category.key}`}
                  onClick={() => setSelectedKey(category.key)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 border flex items-center justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                    isSelected
                      ? 'glass-card shadow-md shadow-black/5 dark:shadow-black/30'
                      : 'glass-panel hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 border-neutral-200/70 dark:border-neutral-800'
                  }`}
                  style={{
                    borderColor: isSelected ? category.accent : undefined,
                    backgroundColor: isSelected ? `${category.accent}10` : undefined
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: `${category.accent}20`,
                        color: category.accent
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-sm text-neutral-900 dark:text-neutral-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {category.name}
                      </div>
                      <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        {count} {count === 1 ? 'statute' : 'statutes & bills'}
                      </div>
                    </div>
                  </div>

                  <div
                    className="w-2.5 h-2.5 rounded-full transition-transform"
                    style={{
                      backgroundColor: category.accent,
                      transform: isSelected ? 'scale(1.4)' : 'scale(1)'
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Right: Category Spotlight Card & Statutes */}
          <div className="lg:col-span-7 space-y-6">
            <div
              className="p-6 sm:p-8 rounded-3xl glass-card border transition-all duration-300 shadow-xl"
              style={{
                borderColor: `${selectedCategory.accent}40`,
                borderTop: `4px solid ${selectedCategory.accent}`
              }}
            >
              {/* Category Spotlight Title */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <span
                  className="font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: `${selectedCategory.accent}15`,
                    color: selectedCategory.accent,
                    border: `1px solid ${selectedCategory.accent}30`
                  }}
                >
                  Rights Constellation
                </span>
                <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  {lawsInCategory.length} Registered {lawsInCategory.length === 1 ? 'Statute' : 'Statutes'}
                </span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 dark:text-neutral-100 mb-3">
                {selectedCategory.name}
              </h3>

              <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                {selectedCategory.blurb}
              </p>

              {/* Laws List in this Category */}
              <div className="space-y-3 pt-4 border-t border-neutral-200/80 dark:border-neutral-800">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Constituent Legislation:
                </h4>

                <div className="grid gap-3">
                  {lawsInCategory.map((law) => (
                    <div
                      key={law.id}
                      id={`category-law-card-${law.id}`}
                      onClick={() => onSelectLaw(law)}
                      className="group p-4 rounded-xl glass-panel border border-neutral-200/80 dark:border-neutral-800 hover:border-amber-500/40 transition-all duration-200 cursor-pointer flex items-center justify-between"
                    >
                      <div className="space-y-1 pr-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                            {law.ra}
                          </span>
                          <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                            {law.short}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                            {law.yearLabel}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
                          {law.purpose}
                        </p>
                      </div>

                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 group-hover:bg-amber-500 group-hover:text-white transition-all">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
