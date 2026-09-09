import { useState } from 'react';
import { Calendar, ArrowRight, History } from 'lucide-react';
import { TIMELINE_DATA } from '../data/lawsData';
import { Law } from '../types/presentation';

interface TimelineSectionProps {
  onSelectLaw: (law: Law) => void;
}

export default function TimelineSection({ onSelectLaw }: TimelineSectionProps) {
  const [selectedDecade, setSelectedDecade] = useState<string>('All');

  const decades = ['All', '1980s', '1990s', '2000s', '2010s', 'Present'];

  const filteredTimeline = selectedDecade === 'All'
    ? TIMELINE_DATA
    : TIMELINE_DATA.filter((item) => item.decade === selectedDecade);

  return (
    <section 
      id="timeline" 
      className="relative py-24 sm:py-32 scroll-mt-16 pattern-grid border-t border-neutral-200/80 dark:border-neutral-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-mono tracking-widest text-amber-600 dark:text-amber-400 uppercase">
            <History className="w-3.5 h-3.5" />
            <span>Section 02 · Chronology</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl text-neutral-900 dark:text-neutral-50 tracking-tight leading-tight">
            A Timeline of <span className="text-amber-600 dark:text-amber-400">Protection</span>
          </h2>

          <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
            From 1989 to a present still being written — follow the chronological journey of how Philippine gender-related legislation developed, one protection at a time.
          </p>

          {/* Decade Filter Tabs */}
          <div className="pt-4 flex flex-wrap gap-2" role="tablist" aria-label="Filter timeline by decade">
            {decades.map((dec) => (
              <button
                key={dec}
                id={`timeline-decade-${dec}`}
                onClick={() => setSelectedDecade(dec)}
                role="tab"
                aria-selected={selectedDecade === dec}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 ${
                  selectedDecade === dec
                    ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/20'
                    : 'glass-panel text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white border border-neutral-200 dark:border-neutral-800'
                }`}
              >
                {dec === 'Present' ? 'Pending / Future' : dec}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Visual Track */}
        <div className="relative">
          {/* Vertical central spine line on md+ */}
          <div 
            className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-amber-500 via-teal-400 to-purple-500/50" 
            aria-hidden="true" 
          />
          {/* Mobile left line */}
          <div 
            className="md:hidden absolute left-5 top-4 bottom-4 w-0.5 bg-gradient-to-b from-amber-500 via-teal-400 to-purple-500/50" 
            aria-hidden="true" 
          />

          {/* Timeline Nodes */}
          <div className="space-y-8 sm:space-y-12">
            {filteredTimeline.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const isBill = item.law.kind === 'BILL';

              return (
                <div
                  key={`${item.law.id}-${idx}`}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Center Node Pin */}
                  <div className="absolute left-5 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full glass-card border-2 border-amber-500 dark:border-amber-400 flex items-center justify-center text-amber-500 z-10 shadow-lg">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>

                  {/* Empty Spacer on opposite side */}
                  <div className="hidden md:block w-1/2" />

                  {/* Card Content */}
                  <div
                    className={`pl-14 md:pl-0 w-full md:w-1/2 ${
                      isEven ? 'md:pr-12' : 'md:pl-12'
                    }`}
                  >
                    <div
                      id={`timeline-item-${item.law.id}`}
                      onClick={() => onSelectLaw(item.law)}
                      className="group p-5 sm:p-6 rounded-2xl glass-card border border-neutral-200/90 dark:border-neutral-800 hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl cursor-pointer"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-sm font-bold text-amber-600 dark:text-amber-400">
                          {isBill ? 'Current Horizon' : item.year}
                        </span>
                        <span
                          className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                            isBill
                              ? 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/30'
                              : 'bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30'
                          }`}
                        >
                          {item.law.ra}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-base sm:text-lg text-neutral-900 dark:text-neutral-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {item.law.title}
                      </h3>

                      <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mt-1 mb-2.5">
                        "{item.law.short}"
                      </p>

                      <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mb-3">
                        {item.historicalSignificance}
                      </p>

                      <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 group-hover:underline">
                        <span>Examine statute details</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
