export type Theme = {
  mode: 'light' | 'dark';
  colors: {
    background: string;
    surface: string;
    surfaceAlt: string;
    title: string;
    subtitle: string;
    sectionTitle: string;
    text: string;
    textMuted: string;

    bookPillBg: string;
    bookPillBgActive: string;
    bookName: string;
    bookNameActive: string;
    bookMeta: string;
    bookMetaActive: string;

    chipBg: string;
    chipBorder: string;
    chipBgActive: string;
    chipText: string;
    chipTextActive: string;

    verseCardBg: string;
    verseCardBorder: string;
    verseNumber: string;
    verseText: string;

    loadingText: string;

    errorBg: string;
    errorText: string;
    dismissText: string;

    accent: string;
    accentAlt: string;
  };
};

export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    background: '#f9fafb',
    surface: '#ffffff',
    surfaceAlt: '#f3f4f6',
    title: '#0f172a',
    subtitle: '#4b5563',
    sectionTitle: '#111827',
    text: '#111827',
    textMuted: '#6b7280',

    bookPillBg: 'rgba(148, 163, 184, 0.15)',
    bookPillBgActive: '#facc15',
    bookName: '#111827',
    bookNameActive: '#111827',
    bookMeta: '#6b7280',
    bookMetaActive: '#1f2937',

    chipBg: '#ffffff',
    chipBorder: 'rgba(148, 163, 184, 0.5)',
    chipBgActive: '#2563eb',
    chipText: '#374151',
    chipTextActive: '#f9fafb',

    verseCardBg: '#ffffff',
    verseCardBorder: 'rgba(148, 163, 184, 0.4)',
    verseNumber: '#2563eb',
    verseText: '#111827',

    loadingText: '#6b7280',

    errorBg: 'rgba(239, 68, 68, 0.08)',
    errorText: '#b91c1c',
    dismissText: '#ef4444',

    accent: '#facc15',
    accentAlt: '#22d3ee',
  },
};

export const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    background: '#050b18',
    surface: '#020617',
    surfaceAlt: '#0f172a',
    title: '#f8fafc',
    subtitle: '#cbd5f5',
    sectionTitle: '#f1f5f9',
    text: '#e2e8f0',
    textMuted: '#94a3b8',

    bookPillBg: 'rgba(148, 163, 184, 0.2)',
    bookPillBgActive: '#facc15',
    bookName: '#e2e8f0',
    bookNameActive: '#111827',
    bookMeta: '#cbd5f5',
    bookMetaActive: '#1f2937',

    chipBg: 'transparent',
    chipBorder: 'rgba(148, 163, 184, 0.5)',
    chipBgActive: '#22d3ee',
    chipText: '#cbd5f5',
    chipTextActive: '#0f172a',

    verseCardBg: '#0f172a',
    verseCardBorder: 'rgba(148, 163, 184, 0.2)',
    verseNumber: '#38bdf8',
    verseText: '#e2e8f0',

    loadingText: '#cbd5f5',

    errorBg: 'rgba(239, 68, 68, 0.15)',
    errorText: '#fecaca',
    dismissText: '#f87171',

    accent: '#facc15',
    accentAlt: '#22d3ee',
  },
};
