import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { latinHeadingIds } from './src/plugins/latin-heading-ids.mjs';
import { externalLinks } from './src/plugins/external-links.mjs';

export default defineConfig({
  site: 'https://aanisin.ru',
  output: 'static',
  integrations: [mdx(), sitemap()],
  markdown: {
    syntaxHighlight: false,
    processor: satteri({
      hastPlugins: [latinHeadingIds(), externalLinks()],
      features: {
        gfm: {
          footnotes: {
            label: 'Сноски',
            backLabel: 'Вернуться к тексту',
          },
        },
      },
    }),
  },
});
