// Латинские якоря для русских заголовков: «Канонические адреса» → #kanonicheskie-adresa.
//
// Плагин ставит id заголовкам до встроенного heading-ids: тот использует уже
// проставленный id как есть, поэтому оглавление (getHeadings) и разметка
// получают одинаковые якоря.

const MAP = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z',
  и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
  с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch',
  ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
};

export function transliterate(text) {
  return text.replace(/[а-яё]/gi, (char) => {
    const lower = char.toLowerCase();
    const latin = MAP[lower] ?? char;
    return char === lower ? latin : latin.charAt(0).toUpperCase() + latin.slice(1);
  });
}

export function slugify(text) {
  return transliterate(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function latinHeadingIds() {
  return () => {
    const used = new Set();
    return {
      name: 'latin-heading-ids',
      element: {
        filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        visit(node, ctx) {
          // Явно заданный id оставляем: он же используется блоком сносок
          if (typeof node.properties?.id === 'string') return;

          const base = slugify(ctx.textContent(node)) || 'razdel';
          let slug = base;
          for (let i = 1; used.has(slug); i += 1) slug = `${base}-${i}`;
          used.add(slug);

          ctx.setProperty(node, 'id', slug);
        },
      },
    };
  };
}
