import { useState } from 'react';
import { 
  HeartHandshake, 
  Sparkles, 
  ShieldCheck, 
  Scale, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { CONCEPTS, LAWS, CONSTITUTIONAL_BASIS } from '../data/lawsData';
import { Concept, Law } from '../types/presentation';

interface ConceptsSynthesisSectionProps {
  onSelectLaw: (law: Law) => void;
}

export default function ConceptsSynthesisSection({ onSelectLaw }: ConceptsSynthesisSectionProps) {
  const [selectedConcept, setSelectedConcept] = useState<Concept>(CONCEPTS[0]);

  const relatedLaws = LAWS.filter((l) => selectedConcept.lawIds.includes(l.id));

  return (
    <section 
      id="about" 
      className="relative py-24 sm:py-32 scroll-mt-16 pattern-grid border-t border-neutral-200/80 dark:border-neutral-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-mono tracking-widest text-teal-600 dark:text-teal-400 uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Section 05 · About This Exhibition</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl text-neutral-900 dark:text-neutral-50 tracking-tight leading-tight">
            Why These Laws <span className="text-teal-600 dark:text-teal-400">Matter</span>
          </h2>

          <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
            Eight foundational concepts thread through all twelve exhibits. Each connects abstract legislation to living human beings — because the law is only as meaningful as the lives and dignities it safeguards.
          </p>
        </div>

        {/* 2-Column Concept Explorer */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left: 8 Core Concept Chips */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {CONCEPTS.map((concept) => {
              const isSelected = selectedConcept.name === concept.name;

              return (
                <button
                  key={concept.name}
                  id={`concept-chip-${concept.name.toLowerCase()}`}
                  onClick={() => setSelectedConcept(concept)}
                  className={`p-4 rounded-2xl text-left transition-all duration-200 border flex flex-col justify-between h-28 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                    isSelected
                      ? 'glass-card shadow-lg'
                      : 'glass-panel hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 border-neutral-200/70 dark:border-neutral-800'
                  }`}
                  style={{
                    borderColor: isSelected ? concept.accent : undefined,
                    backgroundColor: isSelected ? `${concept.accent}12` : undefined
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span 
                      className="font-display font-bold text-base text-neutral-900 dark:text-neutral-100"
                      style={{ color: isSelected ? concept.accent : undefined }}
                    >
                      {concept.name}
                    </span>
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: concept.accent }}
                    />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                    {concept.lawIds.length} Linked Statutes
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Selected Concept Deep Dive & Connected Laws */}
          <div className="lg:col-span-7">
            <div
              className="p-6 sm:p-8 rounded-3xl glass-card border shadow-xl space-y-6"
              style={{
                borderColor: `${selectedConcept.accent}40`,
                borderTop: `4px solid ${selectedConcept.accent}`
              }}
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <HeartHandshake className="w-4 h-4" style={{ color: selectedConcept.accent }} />
                  <span 
                    className="font-mono text-xs uppercase font-bold tracking-wider"
                    style={{ color: selectedConcept.accent }}
                  >
                    Guiding Democratic Value
                  </span>
                </div>
                <h3 className="font-display font-bold text-3xl text-neutral-900 dark:text-neutral-100">
                  {selectedConcept.name}
                </h3>
              </div>

              <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-200 leading-relaxed italic border-l-2 pl-4 py-1"
                style={{ borderColor: selectedConcept.accent }}
              >
                "{selectedConcept.desc}"
              </p>

              {/* Linked Statutes */}
              <div className="space-y-3 pt-4 border-t border-neutral-200/80 dark:border-neutral-800">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Statutory Manifestations in Philippine Law:
                </h4>

                <div className="grid gap-3">
                  {relatedLaws.map((law) => (
                    <div
                      key={law.id}
                      id={`concept-law-link-${law.id}`}
                      onClick={() => onSelectLaw(law)}
                      className="p-4 rounded-xl glass-panel border border-neutral-200/80 dark:border-neutral-800 hover:border-amber-500/40 transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                            {law.ra}
                          </span>
                          <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                            {law.short}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-500">
                            {law.yearLabel}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-1">
                          {law.keyIdea}
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

        {/* Curatorial Reflection & Constitutional Foundations */}
        <div className="p-8 sm:p-10 rounded-3xl glass-card border border-neutral-200/90 dark:border-neutral-800 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 text-xs font-mono uppercase tracking-widest">
              <Scale className="w-3.5 h-3.5" />
              <span>Constitutional Synthesis</span>
            </div>

            <h3 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 dark:text-neutral-100 leading-tight">
              The Evolution of Gender Justice in Philippine Jurisprudence
            </h3>

            <div className="space-y-4 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
              <p>
                Prior to the ratification of the 1987 Constitution, Philippine civil and penal statutes bore the heavy imprint of archaic colonial codes — treating women as subordinate dependents under the Civil Code and viewing sexual violations as crimes against private family honor rather than direct assaults on human bodily integrity.
              </p>
              <p>
                The transformative turn began with <strong>Article II, Section 14</strong>, declaring that the State shall ensure the fundamental equality before the law of women and men. Over the next three decades, courageous civil society coalitions, feminist lawmakers, and human rights advocates enacted landmark measures:
              </p>
              <ul className="grid sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Workplace Equality:</strong> RA 6725 and RA 7877 dismantled hiring discrimination and penalized sexual extortion in workplaces and schools.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Survivor-Centered Justice:</strong> RA 8353 and RA 9262 reclassified sexual violence as crimes against persons and created emergency Protection Orders.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Bodily Autonomy & Health:</strong> RA 10354 codified reproductive healthcare and maternal safety as non-negotiable human rights.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span><strong>The Unfinished Horizon:</strong> The ongoing push for the SOGIE Equality Bill seeks to guarantee that discrimination has no sanctuary in Philippine law.</span>
                </li>
              </ul>
            </div>

            {/* Constitutional Citation Card */}
            <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/30 text-xs sm:text-sm space-y-1.5 text-neutral-800 dark:text-neutral-200">
              <div className="font-mono font-bold text-amber-800 dark:text-amber-300 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {CONSTITUTIONAL_BASIS.article}
              </div>
              <p className="italic">
                "{CONSTITUTIONAL_BASIS.text}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
