import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, postUrl, postHeading } from '../utils/blog';

export async function GET(context: APIContext) {
  const posts = await getPosts();

  return rss({
    title: 'Заметки — Анисин Алексей',
    description: 'Разборы с проектов: индексация, структура каталогов, мультирегион и чек-листы.',
    site: context.site!,
    trailingSlash: true,
    items: posts.map((post) => ({
      title: postHeading(post),
      description: post.data.description,
      pubDate: post.data.date,
      link: postUrl(post),
      categories: post.data.tags,
    })),
    customData: '<language>ru</language>',
  });
}
