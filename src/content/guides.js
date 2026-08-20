export const GUIDE_ORDER = [
  { id: 'coming-out', route: 'guide-coming-out', title: 'Coming Out', subtitle: 'On your own terms' },
  { id: 'gender-identity', route: 'guide-gender-identity', title: 'Understanding Gender', subtitle: 'Beyond the binary' },
  { id: 'finding-community', route: 'guide-finding-community', title: 'Finding Community', subtitle: 'You are not alone' },
  { id: 'digital-safety', route: 'guide-digital-safety', title: 'Digital Safety', subtitle: 'Protect your peace' },
  { id: 'healthcare', route: 'guide-healthcare', title: 'Healthcare', subtitle: 'Affirming care in SA' },
  { id: 'legal-rights', route: 'guide-legal-rights', title: 'Legal Rights', subtitle: 'The law vs. reality' },
  { id: 'relationships', route: 'guide-relationships', title: 'Relationships', subtitle: 'Love in the margins' },
  { id: 'spirituality', route: 'guide-spirituality', title: 'Spirituality & Faith', subtitle: 'God, ancestors, you' },
  { id: 'real-world', route: 'guide-additional', title: 'Living in the Real World', subtitle: 'Money, work, exits' },
];

export const guideById = (id) => GUIDE_ORDER.find((g) => g.id === id) || null;