import { Law, Category, Concept } from '../types/presentation';

export const CATEGORIES: Category[] = [
  {
    key: 'women',
    name: "Women's Rights",
    short: "Women's Rights",
    accent: '#D9B36A',
    blurb: 'Comprehensive protection, equality and empowerment for women across the nation.'
  },
  {
    key: 'workplace',
    name: 'Workplace',
    short: 'Workplace',
    accent: '#2FD6B0',
    blurb: 'Fair employment, safe workplaces and the economic independence of working women.'
  },
  {
    key: 'health',
    name: 'Health',
    short: 'Maternal & Infant',
    accent: '#E39AAE',
    blurb: 'Maternal care, infant health and the bond between mother and child.'
  },
  {
    key: 'protection',
    name: 'Protection',
    short: 'Protection',
    accent: '#6FA8DC',
    blurb: 'Shields for women and children from violence — inside the home and out.'
  },
  {
    key: 'sexualviolence',
    name: 'Sexual Violence',
    short: 'Sexual Violence',
    accent: '#9B8CDE',
    blurb: 'A survivor-centered legal response to rape and sexual assault.'
  },
  {
    key: 'entrepreneurship',
    name: 'Entrepreneurship',
    short: 'Entrepreneurship',
    accent: '#E0A458',
    blurb: 'Skills, capital and enterprise development for women-owned businesses.'
  },
  {
    key: 'socialsecurity',
    name: 'Social Security',
    short: 'Social Security',
    accent: '#5FC7D9',
    blurb: "Women's voice in the institutions that govern social welfare."
  },
  {
    key: 'reproductive',
    name: 'Reproductive Health',
    short: 'Reproductive Health',
    accent: '#C678C9',
    blurb: 'Responsible parenthood, reproductive care and informed family decisions.'
  },
  {
    key: 'sogie',
    name: 'SOGIE Equality',
    short: 'SOGIE Equality',
    accent: '#B98BD9',
    blurb: 'Proposed protection against discrimination based on sexual orientation, gender identity and expression.'
  }
];

export const CONCEPTS: Concept[] = [
  {
    name: 'Equality',
    desc: 'The same rights, opportunities, and dignity — written into law for women and diverse sexualities.',
    accent: '#D9B36A',
    lawIds: ['ra9710', 'ra6725', 'sogie']
  },
  {
    name: 'Protection',
    desc: 'A legal wall between a vulnerable person and those who would harm or abuse them.',
    accent: '#6FA8DC',
    lawIds: ['ra9262', 'ra8353', 'ra7877']
  },
  {
    name: 'Opportunity',
    desc: 'Careers, enterprises, leadership, and public offices open equally to all persons.',
    accent: '#2FD6B0',
    lawIds: ['ra6725', 'ra7192', 'ra7882']
  },
  {
    name: 'Health',
    desc: 'Accessible care for mothers, newborns, reproductive rights, and bodily autonomy.',
    accent: '#E39AAE',
    lawIds: ['ra7600', 'ra7322', 'ra10354']
  },
  {
    name: 'Safety',
    desc: 'Workplaces, homes, schools, and institutions where no one lives in fear or intimidation.',
    accent: '#5FC7D9',
    lawIds: ['ra9262', 'ra7877']
  },
  {
    name: 'Dignity',
    desc: 'The recognition that every person’s body, choices, and personhood are inviolable.',
    accent: '#C678C9',
    lawIds: ['ra8353', 'ra7877', 'ra10354']
  },
  {
    name: 'Empowerment',
    desc: 'Access to capital, self-reliance, and a permanent seat at the decision-making table.',
    accent: '#E0A458',
    lawIds: ['ra9710', 'ra7882', 'ra7688']
  },
  {
    name: 'Inclusion',
    desc: 'A society and legal order that makes room for every gender identity, orientation, and family form.',
    accent: '#B98BD9',
    lawIds: ['sogie', 'ra10354', 'ra9710']
  }
];

export const LAWS: Law[] = [
  {
    id: 'ra9710',
    ra: 'RA 9710',
    raNum: 9710,
    kind: 'RA',
    status: 'Republic Act',
    title: 'Magna Carta of Women',
    short: 'Magna Carta of Women',
    category: 'women',
    label: "Women's Rights",
    year: 2009,
    yearLabel: '2009',
    summary: "The country's most comprehensive women's rights law. It guarantees women full protection and equality, abolishes discriminatory laws and practices, and establishes state mechanisms for the empowerment of women — with priority for those who are poor, marginalized, and affected by violence.",
    keyIdea: "One complete law that makes women's equality and protection a duty of the State — not just a promise.",
    protects: 'All Filipino women — with special priority for the poor, the marginalized, indigenous women, and victims of violence.',
    why: 'Before RA 9710, protections for women were scattered across many separate laws. It consolidated and strengthened them into a single, enforceable framework.',
    impact: "It powers gender-responsive government programs, anti-violence assistance, and pushes for greater women's participation in leadership across society.",
    purpose: 'Guarantee full protection and equality for women nationwide',
    beneficiaries: 'All Filipino women',
    support: 'Comprehensive anti-discrimination framework + state mechanisms',
    image: '/laws/ra9710.jpg',
    concepts: ['Equality', 'Dignity', 'Empowerment'],
    keyProvisions: [
      'Substantive equality of men and women before the law',
      'Protection from all forms of violence, including armed conflict situations',
      'Equal access to education, scholarships, and training programs',
      'Mandatory Gender and Development (GAD) budget allocation in government agencies'
    ]
  },
  {
    id: 'ra6725',
    ra: 'RA 6725',
    raNum: 6725,
    kind: 'RA',
    status: 'Republic Act',
    title: 'Prohibition of Discrimination Against Women in Employment',
    short: 'No Sex Discrimination in Work',
    category: 'workplace',
    label: 'Employment',
    year: 1989,
    yearLabel: '1989',
    summary: "Prohibits discrimination against women in employment — in hiring, promotion, training, compensation, and all terms and conditions of work — so that a woman's sex is never the deciding factor in her career.",
    keyIdea: 'Equal opportunity at work: jobs and careers judged by competence, not by sex.',
    protects: 'Women job-seekers, employees, and aspiring professionals at every level.',
    why: "Discrimination in employment is one of the fastest ways a society limits a woman's economic independence.",
    impact: 'Supports fair hiring and promotion practices, and gives women workers a legal basis to challenge discrimination.',
    purpose: 'Prohibit discrimination against women in employment',
    beneficiaries: 'Women job-seekers & workers',
    support: 'Equal hiring, promotion, training & pay terms',
    image: '/laws/ra6725.jpg',
    concepts: ['Opportunity', 'Equality', 'Dignity'],
    keyProvisions: [
      'Equal pay for equal work between female and male employees',
      'Illegal to stipulate marital status as a disqualification for employment',
      'Penalties for employers practicing discriminatory promotional barriers'
    ]
  },
  {
    id: 'ra7192',
    ra: 'RA 7192',
    raNum: 7192,
    kind: 'RA',
    status: 'Republic Act',
    title: 'Women in Development and Nation Building Act',
    short: 'Women in Nation Building',
    category: 'women',
    label: 'Gender Equality',
    year: 1991,
    yearLabel: '1991',
    summary: 'Recognizes women as equal partners in national development and nation building, and promotes their participation in planning, leadership, and decision-making in every sector of the country.',
    keyIdea: 'Nation building fails if it leaves half of the nation on the sidelines.',
    protects: 'Women in every sector — public and private, agricultural and urban, formal and community-based.',
    why: "Development is strongest when women's voices shape the decisions that affect the lives of everyone.",
    impact: "Drives women's representation in government posts and leadership roles, and women's development programs nationwide.",
    purpose: "Promote women's participation in national development",
    beneficiaries: 'Women in all sectors of society',
    support: 'Equal access to leadership & decision-making',
    image: '/laws/ra7192.jpg',
    concepts: ['Empowerment', 'Opportunity', 'Inclusion'],
    keyProvisions: [
      'Right of women to enter into contracts and execute agreements without husband consent',
      'Equal opportunities in membership in all clubs and civil associations',
      'Equal access to military and defense academies for officer training'
    ]
  },
  {
    id: 'ra7877',
    ra: 'RA 7877',
    raNum: 7877,
    kind: 'RA',
    status: 'Republic Act',
    title: 'Anti-Sexual Harassment Act of 1995',
    short: 'Anti-Sexual Harassment Act',
    category: 'workplace',
    label: 'Sexual Harassment',
    year: 1995,
    yearLabel: '1995',
    summary: 'Defines sexual harassment as a crime in the workplace, academe, and government — including requests for sexual favors in exchange for a job, promotion, or academic decision — and creates formal complaint mechanisms and penalties.',
    keyIdea: 'Dignity at work and in school: no one should trade safety for a job, a promotion, or a grade.',
    protects: 'Women in the workplace and in educational institutions — and those who report it for them.',
    why: 'Harassment silences, demeans, and drives capable people out of careers and classrooms.',
    impact: 'Created workplace and campus complaint procedures, internal and external complaint committees, and clear penalties for offenders.',
    purpose: 'Define & penalize sexual harassment in work & academe',
    beneficiaries: 'Women in the workplace & school',
    support: 'Complaint mechanisms & penalties for harassers',
    image: '/laws/ra7877.jpg',
    concepts: ['Safety', 'Dignity', 'Protection'],
    keyProvisions: [
      'Establishment of the Committee on Decorum and Investigation (CODI)',
      'Mandatory employer and academic institution duty to prevent and penalize harassment',
      'Legal liability for administrators who refuse or fail to act on filed complaints'
    ]
  },
  {
    id: 'ra7600',
    ra: 'RA 7600',
    raNum: 7600,
    kind: 'RA',
    status: 'Republic Act',
    title: 'Rooming-In and Breastfeeding Act of 1992',
    short: 'Rooming-In & Breastfeeding Act',
    category: 'health',
    label: 'Maternal & Infant Health',
    year: 1992,
    yearLabel: '1992',
    summary: 'Encourages rooming-in — letting newborns stay with their mothers in hospitals and birthing centers — and promotes breastfeeding, with workplaces and health institutions required to provide proper facilities and support.',
    keyIdea: 'The first hours of life matter: bonding, rooming-in, and breastfeeding protect both mother and baby.',
    protects: 'Nursing mothers and their newborns — in hospitals, workplaces, and public spaces.',
    why: 'Breast milk is the best source of nutrition and immunity for a newborn; a supported mother is a supported child.',
    impact: 'Brought rooming-in units to hospitals, nursing rooms to workplaces, and active national promotion of breastfeeding.',
    purpose: 'Promote rooming-in & breastfeeding for mothers and newborns',
    beneficiaries: 'Nursing mothers & newborns',
    support: 'Maternity facilities, nursing rooms & rooming-in units',
    image: '/laws/ra7600.jpg',
    concepts: ['Health', 'Protection', 'Safety'],
    keyProvisions: [
      'Immediate rooming-in of healthy newborns with their mothers after delivery',
      'Integration of breastfeeding education into prenatal care curricula',
      'Requirement for lactation stations and nursing intervals in public and private institutions'
    ]
  },
  {
    id: 'ra7322',
    ra: 'RA 7322',
    raNum: 7322,
    kind: 'RA',
    status: 'Republic Act',
    title: 'Increased Maternity Benefits for Women Workers',
    short: 'Increased Maternity Benefits',
    category: 'workplace',
    label: 'Maternity Benefits',
    year: 1992,
    yearLabel: '1992',
    summary: 'Raises the maternity benefits of covered women workers, giving them longer paid maternity leave at full salary to protect the health of the mother and the newborn without putting her livelihood at risk.',
    keyIdea: 'Motherhood should not cost a woman her health, her income, or her job.',
    protects: 'Working women who are giving birth and recovering.',
    why: 'Adequate paid leave helps newborns survive and thrive — and keeps mothers attached to the workforce.',
    impact: 'Longer paid maternity leave at full salary for women workers, linking the health of the family with the security of employment.',
    purpose: 'Increase maternity benefits for women workers',
    beneficiaries: 'Women workers giving birth',
    support: 'Longer paid maternity leave at full salary',
    image: '/laws/ra7322.jpg',
    vector: 'bridge',
    concepts: ['Health', 'Protection', 'Opportunity'],
    keyProvisions: [
      'Expanded leave duration covering prenatal and postnatal recovery',
      'Wage replacement guarantees through the Social Security System',
      'Direct employer advance of salary benefits during maternity leave period'
    ]
  },
  {
    id: 'ra9262',
    ra: 'RA 9262',
    raNum: 9262,
    kind: 'RA',
    status: 'Republic Act',
    title: 'Anti-Violence Against Women and Their Children Act',
    short: 'Anti-VAWC Act',
    category: 'protection',
    label: 'Protection',
    year: 2004,
    yearLabel: '2004',
    summary: 'Defines and penalizes the many forms of violence against women and their children — physical, sexual, emotional, and economic — and creates protection orders together with a system of support services for victims.',
    keyIdea: 'Violence is violence — even inside the home, it is a crime, not a private matter.',
    protects: 'Women and children, including those in relationships — married or not — and those estranged from their partners.',
    why: 'Much of the most serious violence is hidden behind closed doors, and victims often have nowhere to turn.',
    impact: 'Brought protection orders, barangay and police response, dedicated VAWC courts, and a national system of support services for survivors.',
    purpose: 'Protect women & children from all forms of violence',
    beneficiaries: 'Women, children & their dependents',
    support: 'Protection orders, specialized courts & support services',
    image: '/laws/ra9262.jpg',
    concepts: ['Protection', 'Safety', 'Dignity'],
    keyProvisions: [
      'Barangay Protection Orders (BPO), Temporary (TPO), and Permanent Protection Orders (PPO)',
      'Penalization of economic abuse (depriving financial support, controlling wages)',
      'Mandatory VAWC Help Desks in every Philippine barangay nationwide'
    ]
  },
  {
    id: 'ra8353',
    ra: 'RA 8353',
    raNum: 8353,
    kind: 'RA',
    status: 'Republic Act',
    title: 'Anti-Rape Law of 1997',
    short: 'Amended Anti-Rape Law',
    category: 'sexualviolence',
    label: 'Sexual Violence',
    year: 1997,
    yearLabel: '1997',
    summary: "Amended the country's rape law by redefining rape as a crime against the personal integrity of the victim, distinguishing qualified sexual assault from rape, and significantly raising the penalties for offenders.",
    keyIdea: "Rape is a crime against the person — not against 'honor' — and the law must protect the survivor.",
    protects: 'All survivors of rape and qualified sexual assault, including women and men.',
    why: 'An outdated definition left gaps in protection and blamed victims; the amendment closed those gaps.',
    impact: 'A stronger, clearer legal framework with higher penalties — and a more survivor-centered approach to rape cases.',
    purpose: "Strengthen the country's anti-rape law",
    beneficiaries: 'Survivors of rape & sexual assault',
    support: 'Redefinition of rape, higher penalties, survivor-centered process',
    image: '/laws/ra8353.jpg',
    concepts: ['Protection', 'Safety', 'Dignity'],
    keyProvisions: [
      'Reclassification of rape from a crime against chastity to a Crime Against Persons',
      'Recognition of marital rape as a punishable criminal offense',
      'Introduction of sexual assault by insertion of instruments or foreign objects'
    ]
  },
  {
    id: 'ra7882',
    ra: 'RA 7882',
    raNum: 7882,
    kind: 'RA',
    status: 'Republic Act',
    title: 'Assistance to Women Engaging in Micro and Cottage Business Enterprises',
    short: "Women's Micro & Cottage Business",
    category: 'entrepreneurship',
    label: 'Entrepreneurship',
    year: 1995,
    yearLabel: '1995',
    summary: 'Provides training, credit, and enterprise-development assistance to women engaged in micro and cottage — small, home-based — business enterprises, so that small livelihoods can grow into sustainable enterprises.',
    keyIdea: 'Small business, big change: skills and access to capital can lift women and their families out of poverty.',
    protects: 'Women in micro and cottage businesses, and aspiring female entrepreneurs.',
    why: 'Women-owned small enterprises often start with very little capital; access to training and credit is what separates a stall from a business.',
    impact: 'Government and partner programs that give women business training, financing, and enterprise-development support.',
    purpose: 'Assist women in micro & cottage businesses',
    beneficiaries: 'Women micro-entrepreneurs',
    support: 'Training, financing & enterprise development',
    image: '/laws/ra7882.jpg',
    concepts: ['Opportunity', 'Empowerment'],
    keyProvisions: [
      'Government credit windows and concessionary loan terms without predatory collateral',
      'Technical skills training by DTI and TESDA specifically targeted at women-led micro-enterprises',
      'Market link programs connecting home producers to formal distribution channels'
    ]
  },
  {
    id: 'ra7688',
    ra: 'RA 7688',
    raNum: 7688,
    kind: 'RA',
    status: 'Republic Act',
    title: 'Representation of Women in the Social Security Commission',
    short: 'Women in Social Security',
    category: 'socialsecurity',
    label: 'Social Security',
    year: 1993,
    yearLabel: '1993',
    summary: "Provides for the representation of women in the composition of the Social Security Commission, ensuring that women have a seat at the table that shapes the country's social security system.",
    keyIdea: 'Those who depend on social security should have a voice in the decisions that govern it.',
    protects: 'Women — as workers, beneficiaries, and stakeholders in the social security system.',
    why: "Decisions on pensions, benefits, and welfare shape family life; those decisions need women's perspective.",
    impact: "Women's seats in the social security governing body, and a more inclusive approach to social welfare programs.",
    purpose: "Ensure women's representation in social security governance",
    beneficiaries: 'Women in the social security system',
    support: "Women's seats in the SSS governing commission",
    image: '/laws/ra7688.jpg',
    vector: 'commission',
    concepts: ['Equality', 'Empowerment', 'Inclusion'],
    keyProvisions: [
      'Mandatory appointment of qualified women commissioners to the Social Security Commission',
      'Representation of female labor and domestic informal worker sectors',
      'Oversight on maternity, sickness, and survivors pension policies'
    ]
  },
  {
    id: 'ra10354',
    ra: 'RA 10354',
    raNum: 10354,
    kind: 'RA',
    status: 'Republic Act',
    title: 'Responsible Parenthood and Reproductive Health Act of 2012',
    short: 'Reproductive Health Act',
    category: 'reproductive',
    label: 'Reproductive Health',
    year: 2012,
    yearLabel: '2012',
    summary: 'Guarantees access to reproductive health care, information, and family-planning services, and promotes responsible parenthood — so that every Filipino can make informed decisions about health and family life.',
    keyIdea: 'Informed choices: access to reproductive health is a right, and responsible parenthood is a national strength.',
    protects: 'All Filipinos — especially women, couples, and youth who make health and family decisions.',
    why: 'Reproductive health is the foundation of physical health, human dignity, and national development.',
    impact: 'Nationwide reproductive health information and services, maternal and child health programs, and family-planning access.',
    purpose: 'Ensure access to reproductive health care & information',
    beneficiaries: 'All Filipinos; couples, youth & women especially',
    support: 'RH services, family planning & responsible parenthood programs',
    image: '/laws/ra10354.jpg',
    concepts: ['Health', 'Dignity', 'Inclusion'],
    keyProvisions: [
      'Universal access to medically safe, legal, and non-abortifacient family planning supplies',
      'Age-appropriate and scientifically accurate comprehensive sexuality education in schools',
      'Emergency obstetric care in public district and provincial hospitals'
    ]
  },
  {
    id: 'sogie',
    ra: 'SOGIE Equality Bill',
    raNum: 12,
    kind: 'BILL',
    status: 'Pending Bill — Not Yet Enacted',
    title: 'SOGIE Equality Bill (Proposed)',
    short: 'SOGIE Equality Bill',
    category: 'sogie',
    label: 'SOGIE / Anti-Discrimination',
    year: null,
    yearLabel: 'Pending',
    summary: 'A proposed law that would prohibit discrimination on the basis of sexual orientation, gender identity, and expression (SOGIE) in employment, education, health, and public life. As of this presentation it remains a bill pending in Congress — it is not yet a Republic Act.',
    keyIdea: 'Equality before the law for every person — regardless of sexual orientation, gender identity, or expression.',
    protects: 'Lesbian, gay, bisexual, transgender, and intersex Filipinos — and the families who love them.',
    why: 'Without a dedicated law, SOGIE-based discrimination in jobs, schools, and services remains largely unaddressed.',
    impact: 'If enacted, it would become the first Philippine law to expressly protect people from SOGIE-based discrimination. Until then, it remains a living, pending proposal.',
    purpose: 'Prohibit SOGIE-based discrimination (proposed)',
    beneficiaries: 'LGBT persons & their families',
    support: 'Anti-discrimination protection if enacted — currently pending',
    image: '/laws/sogie.jpg',
    concepts: ['Inclusion', 'Dignity', 'Equality'],
    keyProvisions: [
      'Prohibition of discriminatory denial of employment or promotion on basis of SOGIE',
      'Protection against expulsion or sanction in schools due to gender expression',
      'Penalizing denial of access to medical care, emergency services, and public accommodations',
      'Banning forced psychological or medical conversions attempting to alter sexual orientation'
    ]
  }
];

export const TIMELINE_DATA = [
  {
    year: 1989,
    decade: '1980s',
    law: LAWS.find(l => l.id === 'ra6725')!,
    historicalSignificance: 'Post-1987 Constitution labor reform codifying equal pay for equal work.'
  },
  {
    year: 1991,
    decade: '1990s',
    law: LAWS.find(l => l.id === 'ra7192')!,
    historicalSignificance: 'Mandated gender mainstreaming and the legal capacity of women to enter contracts independently.'
  },
  {
    year: 1992,
    decade: '1990s',
    law: LAWS.find(l => l.id === 'ra7600')!,
    historicalSignificance: 'Institutionalized rooming-in and breastfeeding rights for maternal-infant health.'
  },
  {
    year: 1992,
    decade: '1990s',
    law: LAWS.find(l => l.id === 'ra7322')!,
    historicalSignificance: 'Extended paid maternity benefits for covered private-sector women employees.'
  },
  {
    year: 1993,
    decade: '1990s',
    law: LAWS.find(l => l.id === 'ra7688')!,
    historicalSignificance: "Secured permanent female representation on the country's social welfare commission."
  },
  {
    year: 1995,
    decade: '1990s',
    law: LAWS.find(l => l.id === 'ra7877')!,
    historicalSignificance: 'Landmark anti-harassment statute creating mandatory CODI committees in work and academe.'
  },
  {
    year: 1995,
    decade: '1990s',
    law: LAWS.find(l => l.id === 'ra7882')!,
    historicalSignificance: 'Credit windows and business training empowering grassroots women entrepreneurs.'
  },
  {
    year: 1997,
    decade: '1990s',
    law: LAWS.find(l => l.id === 'ra8353')!,
    historicalSignificance: "Fundamental criminal law paradigm shift: reclassified rape as a crime against persons."
  },
  {
    year: 2004,
    decade: '2000s',
    law: LAWS.find(l => l.id === 'ra9262')!,
    historicalSignificance: 'Revolutionary domestic abuse protection introducing Barangay Protection Orders (BPO).'
  },
  {
    year: 2009,
    decade: '2000s',
    law: LAWS.find(l => l.id === 'ra9710')!,
    historicalSignificance: 'The Philippine Bill of Rights for Women, consolidating CEDAW principles into national law.'
  },
  {
    year: 2012,
    decade: '2010s',
    law: LAWS.find(l => l.id === 'ra10354')!,
    historicalSignificance: 'Comprehensive access to reproductive healthcare, family planning, and maternal safety.'
  },
  {
    year: 2026,
    decade: 'Present',
    law: LAWS.find(l => l.id === 'sogie')!,
    historicalSignificance: 'Over two decades of advocacy for explicit national statutory protection against SOGIE-based discrimination.'
  }
];

export const CONSTITUTIONAL_BASIS = {
  article: 'Article II, Section 14, 1987 Philippine Constitution',
  text: 'The State recognizes the role of women in nation-building, and shall ensure the fundamental equality before the law of women and men.',
  secondary: 'Article XIII, Section 14: The State shall protect working women by providing safe and healthful working conditions, taking into account their maternal functions, and such facilities and opportunities that will enhance their welfare and enable them to realize their full potential in the service of the nation.'
};
