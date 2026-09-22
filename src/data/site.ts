export const site = {
  name: 'Анисин Алексей',
  email: 'hi@aanisin.ru',
};

export type SectionKey = 'notes';

export const sections: { key: SectionKey; href: string; label: string }[] = [
  { key: 'notes', href: '/blog/', label: 'Заметки' },
];
