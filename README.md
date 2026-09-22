# aanisin.ru

Персональный сайт Алексея Анисина: главная и заметки. Astro, статическая сборка, без внешних зависимостей во время работы сайта — шрифты лежат локально, аналитики нет.

## Команды

```sh
npm install
npm run dev      # локальный сервер на http://localhost:4321
npm run build    # сборка в dist/
npm run preview  # посмотреть собранное
```

## Структура

```
src/
├─ pages/           маршруты: / , /blog/ , /blog/<slug>/ , 404, rss.xml
├─ layouts/         BaseLayout — <head>, шапка и подвал
├─ components/      общие блоки; home/ — секции главной, blog/ — страницы заметок, mdx/ — блоки внутри текста
├─ content/blog/    сами заметки (MDX)
├─ data/            тексты главной и общие данные сайта
├─ styles/          токены и базовые стили
├─ utils/           работа с заметками и датами
└─ plugins/         латинские якоря для русских заголовков
public/             photo.jpg, favicon, CNAME, robots.txt
```

## Как добавить заметку

Создать файл `src/content/blog/<slug>.mdx`. Адрес заметки берётся из имени файла: `mult-region.mdx` → `/blog/mult-region/`.

Шапка файла:

```yaml
---
title: 'Заголовок'
description: 'Короткое описание: карточки и meta description'
lead: 'Лид под заголовком статьи'
crumb: 'Коротко для хлебных крошек'
category: 'Разбор'
date: 2026-09-13
updated: 2026-09-14   # необязательно
readingTime: 7
tags: ['Магазины', 'Индексация']
coverCaption: 'Подпись к обложке'   # необязательно
cta:                                # необязательно, иначе общий текст
  title: 'Заголовок призыва в конце'
  text: 'Текст призыва'
---
```

Дальше обычный Markdown. Заголовки `##` попадают в оглавление, якоря к ним делаются латиницей автоматически. Для нестандартных блоков есть компоненты из `src/components/mdx/`: `Callout`, `PullQuote`, `CodeBlock`, `Figure`, `Note`, `Faq` и `FaqItem` — их нужно импортировать в начале файла.

## Деплой

Пуш в `main` запускает `.github/workflows/deploy.yml`: сборка и публикация на GitHub Pages. В настройках репозитория Settings → Pages источником должен быть выбран GitHub Actions. Workflow можно запустить и вручную кнопкой Run workflow.

Запасной путь, если экшены недоступны: `npm run build && npx gh-pages -d dist`, а в Settings → Pages выбрать ветку `gh-pages`.
