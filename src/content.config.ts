import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Заметки: URL — /blog/<id>/, в интерфейсе раздел называется «Заметки»
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) => z.object({
    // Метатег <title>. Пишется целиком, включая бренд, если он нужен
    title: z.string(),
    // Заголовок на странице и во всех ссылках на заметку: H1, карточки, лента,
    // RSS, соседние заметки, кнопки «поделиться». Без него везде берётся title
    h1: z.string().optional(),
    // Короткое описание: карточки и meta description
    description: z.string(),
    // Лид под заголовком статьи
    lead: z.string(),
    // Короткое название для хлебных крошек
    crumb: z.string(),
    category: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    readingTime: z.number(),
    tags: z.array(z.string()).default([]),
    // Обложка: файл из src/assets, путь относительно файла заметки. Без неё — штриховка
    cover: image().optional(),
    // Вертикальный вариант обложки для узких экранов. Без него везде показывается cover
    coverMobile: image().optional(),
    coverCaption: z.string().optional(),
    cta: z.object({ title: z.string(), text: z.string() }).optional(),
  }),
});

export const collections = { blog };
