import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export const postUrl = (post: Post) => `/blog/${post.id}/`;

// Заголовок заметки для людей: H1, карточки, лента, RSS, соседние заметки,
// шаринг. Отдельно от title, который занят метатегом <title>
export const postHeading = (post: Post) => post.data.h1 ?? post.data.title;

// Новые сверху
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog');
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

const dayMonth = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', timeZone: 'UTC' });

// Сокращения как в UI-ките: «13 сен»
const SHORT_MONTHS = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];

export const formatDate = (date: Date) => dayMonth.format(date);
export const formatShortDate = (date: Date) => `${date.getUTCDate()} ${SHORT_MONTHS[date.getUTCMonth()]}`;
export const formatDateWithYear = (date: Date) => `${dayMonth.format(date)} ${date.getUTCFullYear()}`;

export function pluralMinutes(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} минута`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} минуты`;
  return `${n} минут`;
}
