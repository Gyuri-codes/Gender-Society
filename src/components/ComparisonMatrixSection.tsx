import { useState, useMemo, type MouseEvent } from 'react';
import { 
  GitCompare, 
  Search, 
  ArrowUpDown, 
  CheckSquare, 
  Square, 
  X, 
  ExternalLink
} from 'lucide-react';
import { LAWS, CATEGORIES } from '../data/lawsData';
import { Law } from '../types/presentation';

interface ComparisonMatrixSectionProps {
  onSelectLaw: (law: Law) => void;
}

type SortField = 'year' | 'raNum' | 'category' | 'title';
type SortOrder = 'asc' | 'desc';

export default function ComparisonMatrixSection({ onSelectLaw }: ComparisonMatrixSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'RA' | 'BILL'>('all');
  const [sortField, setSortField] = useState<SortField>('year');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
  const [showSideBySideModal, setShowSideBySideModal] = useState(false);

  // Toggle law selection for side-by-side comparison (max 2)
  const toggleLawComparison = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    if (selectedForComparison.includes(id)) {
      setSelectedForComparison(selectedForComparison.filter((item) => item !== id));
    } else {
      if (selectedForComparison.length >= 2) {
        // Replace oldest
        setSelectedForComparison([selectedForComparison[1], id]);
      } else {
        setSelectedForComparison([...selectedForComparison, id]);
      }
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredAndSortedLaws = useMemo(() => {
    return LAWS.filter((law) => {
      const matchesSearch = 
        law.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        law.short.toLowerCase().includes(searchQuery.toLowerCase()) ||
        law.ra.toLowerCase().includes(searchQuery.toLowerCase()) ||
        law.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
        law.beneficiaries.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === 'all' || law.category === selectedCategory;
      const matchesStatus = statusFilter === 'all' || law.kind === statusFilter;

      return matchesSearch && matchesCat && matchesStatus;
    }).sort((a, b) => {
      let comparison = 0;
      if (sortField === 'year') {
        const yearA = a.year ?? 9999;
        const yearB = b.year ?? 9999;
        comparison = yearA - yearB;
      } else if (sortField === 'raNum') {
        comparison = a.raNum - b.raNum;
      } else if (sortField === 'category') {
        comparison = a.category.localeCompare(b.category);
      } else if (sortField === 'title') {
        comparison = a.title.localeCompare(b.title);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [searchQuery, selectedCategory, statusFilter, sortField, sortOrder]);

  const comparedLaws = selectedForComparison.map((id) => LAWS.find((l) => l.id === id)!);

  return (
    <section 
      id="compare" 
      className="relative py-24 sm:py-32 scroll-mt-16 pattern-grid border-t border-neutral-200/80 dark:border-neutral-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-mono tracking-widest text-sky-600 dark:text-sky-400 uppercase">
            <GitCompare className="w-3.5 h-3.5" />
            <span>Section 04 · Comparative Matrix</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl text-neutral-900 dark:text-neutral-50 tracking-tight leading-tight">
            Compare the <span className="text-sky-600 dark:text-sky-400">Laws</span>
          </h2>

          <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
            Set the twelve legal instruments side by side. Filter by category or legislative status, search by keyword, and select any two laws to launch an instant side-by-side comparative analysis.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="glass-card rounded-2xl p-4 sm:p-5 mb-8 border border-neutral-200/80 dark:border-neutral-800 space-y-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search purpose or rights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl glass-panel border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Category Select */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl glass-panel border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-amber-500"
              >
                <option value="all">All Categories (9)</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.key} value={cat.key}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex rounded-xl glass-panel p-1 border border-neutral-200 dark:border-neutral-700 text-xs">
              {(['all', 'RA', 'BILL'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`flex-1 py-1 px-2 rounded-lg font-medium transition-colors ${
                    statusFilter === status
                      ? 'bg-amber-500 text-white font-semibold'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  {status === 'all' ? 'All' : status === 'RA' ? 'Enacted RAs' : 'Pending Bills'}
                </button>
              ))}
            </div>

            {/* Side-by-Side Comparison Trigger */}
            <div className="flex items-center justify-end">
              <button
                id="matrix-compare-two-btn"
                disabled={selectedForComparison.length < 2}
                onClick={() => setShowSideBySideModal(true)}
                className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  selectedForComparison.length >= 2
                    ? 'bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-600/20 active:scale-95'
                    : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed'
                }`}
              >
                <GitCompare className="w-3.5 h-3.5" />
                <span>Compare Selected ({selectedForComparison.length}/2)</span>
              </button>
            </div>
          </div>

          {/* Quick instructions / Selection status */}
          <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400 pt-2 border-t border-neutral-200/80 dark:border-neutral-800">
            <span>Showing {filteredAndSortedLaws.length} of {LAWS.length} instruments</span>
            <span>Check boxes in the table to select any 2 laws for side-by-side review</span>
          </div>
        </div>

        {/* Desktop / Tablet Table View */}
        <div className="hidden md:block glass-card rounded-2xl overflow-hidden border border-neutral-200/90 dark:border-neutral-800 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs" aria-label="Comparison Table of Philippine Gender Laws">
              <thead className="bg-neutral-100/70 dark:bg-neutral-900/70 border-b border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 font-mono uppercase tracking-wider">
                <tr>
                  <th className="p-4 w-12 text-center">Select</th>
                  <th 
                    className="p-4 cursor-pointer hover:text-amber-500 transition-colors"
                    onClick={() => handleSort('raNum')}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Statute</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th 
                    className="p-4 cursor-pointer hover:text-amber-500 transition-colors"
                    onClick={() => handleSort('year')}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Year</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th 
                    className="p-4 cursor-pointer hover:text-amber-500 transition-colors"
                    onClick={() => handleSort('category')}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Category</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="p-4">Legislative Purpose</th>
                  <th className="p-4">Beneficiaries</th>
                  <th className="p-4">Key Mechanisms</th>
                  <th className="p-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200/70 dark:divide-neutral-800/70">
                {filteredAndSortedLaws.map((law) => {
                  const isSelected = selectedForComparison.includes(law.id);
                  const cat = CATEGORIES.find((c) => c.key === law.category);

                  return (
                    <tr
                      key={law.id}
                      id={`matrix-row-${law.id}`}
                      onClick={() => onSelectLaw(law)}
                      className="hover:bg-amber-500/5 dark:hover:bg-amber-400/5 cursor-pointer transition-colors"
                    >
                      {/* Checkbox for side-by-side compare */}
                      <td className="p-4 text-center" onClick={(e) => toggleLawComparison(law.id, e)}>
                        <button
                          type="button"
                          className="text-neutral-400 hover:text-sky-500 focus:outline-none"
                          aria-label={`Select ${law.ra} for comparison`}
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-sky-500" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>

                      {/* RA and Short Title */}
                      <td className="p-4">
                        <div className="font-mono font-bold text-neutral-900 dark:text-neutral-100">
                          {law.ra}
                        </div>
                        <div className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1">
                          {law.short}
                        </div>
                      </td>

                      {/* Year */}
                      <td className="p-4 font-mono font-semibold text-neutral-700 dark:text-neutral-300">
                        {law.yearLabel}
                      </td>

                      {/* Category Pill */}
                      <td className="p-4">
                        <span
                          className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium"
                          style={{
                            backgroundColor: `${cat?.accent || '#D9B36A'}15`,
                            color: cat?.accent || '#D9B36A'
                          }}
                        >
                          {cat?.name || law.label}
                        </span>
                      </td>

                      {/* Purpose */}
                      <td className="p-4 max-w-xs text-neutral-700 dark:text-neutral-300 leading-snug">
                        {law.purpose}
                      </td>

                      {/* Beneficiaries */}
                      <td className="p-4 text-neutral-600 dark:text-neutral-400">
                        {law.beneficiaries}
                      </td>

                      {/* Key Mechanisms */}
                      <td className="p-4 text-neutral-600 dark:text-neutral-400">
                        {law.support}
                      </td>

                      {/* Action */}
                      <td className="p-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectLaw(law);
                          }}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                          title="View Full Exhibit"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile View: Comparison Cards */}
        <div className="md:hidden space-y-3">
          {filteredAndSortedLaws.map((law) => {
            const isSelected = selectedForComparison.includes(law.id);
            const cat = CATEGORIES.find((c) => c.key === law.category);

            return (
              <div
                key={law.id}
                id={`matrix-card-${law.id}`}
                onClick={() => onSelectLaw(law)}
                className="p-4 rounded-2xl glass-card border border-neutral-200 dark:border-neutral-800 space-y-3 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => toggleLawComparison(law.id, e)}
                      className="p-1 text-neutral-400 hover:text-sky-500"
                    >
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 text-sky-500" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                    <span className="font-mono font-bold text-sm text-amber-600 dark:text-amber-400">
                      {law.ra}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-neutral-500">
                    {law.yearLabel}
                  </span>
                </div>

                <div className="font-display font-bold text-sm text-neutral-900 dark:text-neutral-100">
                  {law.title}
                </div>

                <div className="text-xs text-neutral-600 dark:text-neutral-300">
                  <strong className="text-neutral-800 dark:text-neutral-200">Purpose:</strong> {law.purpose}
                </div>

                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  <strong>Protects:</strong> {law.beneficiaries}
                </div>

                <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <span
                    className="text-[10px] font-medium px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: `${cat?.accent || '#D9B36A'}18`,
                      color: cat?.accent || '#D9B36A'
                    }}
                  >
                    {cat?.name || law.label}
                  </span>
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    Examine <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Side-by-Side Comparison Modal */}
      {showSideBySideModal && comparedLaws.length === 2 && (
        <div 
          id="side-by-side-compare-modal"
          className="fixed inset-0 z-[85] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="w-full max-w-5xl max-h-[90vh] flex flex-col rounded-3xl glass-card overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-2xl animate-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
              <div className="flex items-center gap-2">
                <GitCompare className="w-5 h-5 text-sky-500" />
                <h3 className="font-display font-bold text-lg text-neutral-900 dark:text-neutral-100">
                  Direct Comparative Analysis
                </h3>
              </div>
              <button
                onClick={() => setShowSideBySideModal(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Side-by-Side Comparison Body */}
            <div className="overflow-y-auto p-6 grid md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800">
              {comparedLaws.map((law) => {
                const cat = CATEGORIES.find((c) => c.key === law.category);
                return (
                  <div key={law.id} className="space-y-4 pt-4 md:pt-0 md:px-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-amber-600 dark:text-amber-400">
                        {law.ra}
                      </span>
                      <span className="font-mono text-xs text-neutral-500">
                        {law.yearLabel}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-xl text-neutral-900 dark:text-neutral-100">
                      {law.title}
                    </h4>

                    <p className="text-xs italic text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-900 p-3 rounded-xl border-l-2"
                      style={{ borderColor: cat?.accent || '#D9B36A' }}
                    >
                      "{law.keyIdea}"
                    </p>

                    <div className="space-y-2 text-xs">
                      <div>
                        <strong className="text-neutral-900 dark:text-neutral-100 block mb-0.5">Primary Purpose:</strong>
                        <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">{law.purpose}</p>
                      </div>

                      <div>
                        <strong className="text-neutral-900 dark:text-neutral-100 block mb-0.5">Target Beneficiaries:</strong>
                        <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">{law.protects}</p>
                      </div>

                      <div>
                        <strong className="text-neutral-900 dark:text-neutral-100 block mb-0.5">Statutory Mechanisms:</strong>
                        <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">{law.support}</p>
                      </div>

                      <div>
                        <strong className="text-neutral-900 dark:text-neutral-100 block mb-0.5">Societal Impact:</strong>
                        <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">{law.impact}</p>
                      </div>
                    </div>

                    <div className="pt-3">
                      <button
                        onClick={() => {
                          setShowSideBySideModal(false);
                          onSelectLaw(law);
                        }}
                        className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs transition-colors"
                      >
                        Examine Full Exhibit
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
