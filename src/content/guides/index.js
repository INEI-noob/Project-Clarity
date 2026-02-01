export const guides = [
  {
    id: 'coming-out',
    title: 'Coming Out',
    subtitle: 'On your own terms, in your own time',
    color: 'indigo',
    icon: '🌱',
    readTime: '12 min',
    difficulty: 'Gentle',
    featured: true,
    description: 'There is no "right" way to come out. This guide helps you navigate the when, who, and how—while prioritizing your safety and wellbeing.'
  },
  {
    id: 'gender-identity',
    title: 'Understanding Gender',
    subtitle: 'Beyond the binary',
    color: 'purple',
    icon: '🦋',
    readTime: '15 min',
    difficulty: 'Gentle',
    featured: true,
    description: 'Gender is a spectrum, not a switch. Explore the beautiful complexity of identity with compassion and without pressure.'
  },
  {
    id: 'finding-community',
    title: 'Finding Your People',
    subtitle: 'Building chosen family',
    color: 'rose',
    icon: '🤝',
    readTime: '10 min',
    difficulty: 'Moderate',
    featured: false,
    description: 'Connection saves lives. Learn how to find safe queer spaces, online and offline, and build relationships that affirm you.'
  },
  {
    id: 'mental-health',
    title: 'Mental Health',
    subtitle: 'You deserve support',
    color: 'teal',
    icon: '🧠',
    readTime: '8 min',
    difficulty: 'Gentle',
    featured: false,
    description: 'Navigating mental health as a queer person comes with unique challenges. Here are resources, coping strategies, and ways to find affirming care.'
  },
  {
    id: 'digital-safety',
    title: 'Digital Safety',
    subtitle: 'Protecting yourself online',
    color: 'cyan',
    icon: '🔒',
    readTime: '10 min',
    difficulty: 'Essential',
    featured: false,
    description: 'How to protect your privacy, manage digital footprints, and stay safe while finding community online.'
  }
  ,{
    id: 'digital-safety',
    title: 'Digital Safety',
    subtitle: 'Protecting yourself online',
    color: 'cyan',
    icon: '🔒',
    readTime: '10 min',
    difficulty: 'Essential',
    featured: false,
    description: 'How to protect your privacy, manage digital footprints, and stay safe while finding community online.'
  },
  {
    id: 'relationships-dating',
    title: 'Relationships',
    subtitle: 'Love, dating, and boundaries',
    color: 'rose',
    icon: '💕',
    readTime: '14 min',
    difficulty: 'Moderate',
    featured: false,
    description: 'Navigating queer dating, first dates safely, healthy relationships, and dealing with heartbreak.'
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    subtitle: 'Affirming medical care',
    color: 'teal',
    icon: '🏥',
    readTime: '12 min',
    difficulty: 'Essential',
    featured: false,
    description: 'Finding LGBTQ+ friendly doctors, navigating HRT, sexual health, and surviving bad healthcare experiences.'
  },
  {
    id: 'religion-spirituality',
    title: 'Faith & Spirituality',
    subtitle: 'Queer and spiritual',
    color: 'amber',
    icon: '✨',
    readTime: '11 min',
    difficulty: 'Gentle',
    featured: false,
    description: 'Reconciling faith and queerness, finding affirming congregations, and healing religious trauma.'
  },
  {
    id: 'legal-rights',
    title: 'Legal Rights',
    subtitle: 'Know your protections',
    color: 'indigo',
    icon: '⚖️',
    readTime: '13 min',
    difficulty: 'Essential',
    featured: false,
    description: 'Your constitutional rights in South Africa, marriage laws, discrimination protection, and legal resources.'
  }
];


// Import raw markdown content
const guideModules = import.meta.glob('./*.md', { as: 'raw', eager: true });

export const getGuideContent = (id) => {
  const path = `./${id}.md`;
  return guideModules[path] || null;
};