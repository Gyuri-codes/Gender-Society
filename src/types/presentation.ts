export type LawKind = 'RA' | 'BILL';

export interface Law {
  id: string;
  ra: string;
  raNum: number;
  kind: LawKind;
  status: string;
  title: string;
  short: string;
  category: string;
  label: string;
  year: number | null;
  yearLabel: string;
  summary: string;
  keyIdea: string;
  protects: string;
  why: string;
  impact: string;
  purpose: string;
  beneficiaries: string;
  support: string;
  image?: string;
  vector?: string;
  concepts: string[];
  historicalContext?: string;
  keyProvisions?: string[];
}

export interface Category {
  key: string;
  name: string;
  short: string;
  accent: string;
  blurb: string;
  iconName?: string;
}

export interface Concept {
  name: string;
  desc: string;
  accent: string;
  lawIds: string[];
}

export interface TimelineMilestone {
  year: number;
  label: string;
  laws: Law[];
  decade: string;
  historicalSignificance: string;
}
