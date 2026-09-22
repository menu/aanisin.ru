// Внешние ссылки открываются в новой вкладке: в лонгридах их десятки,
// и уводить читателя со статьи на каждую сноску не хочется.
//
// rehype-external-links сюда не подходит — satteri принимает не unified-плагины,
// а собственный формат визиторов (тот же, что у latin-heading-ids).

const SITE_HOST = 'aanisin.ru';

// Смена вкладки без предупреждения — претензия WCAG 3.2.5: пользователь
// скринридера не узнает, что ушел со страницы, и «Назад» перестает работать.
// Поэтому к каждой внешней ссылке добавляется скрытая подпись.
const HINT = ' (откроется в новой вкладке)';

function isExternal(href) {
  if (typeof href !== 'string') return false;

  // Относительные адреса, якоря, mailto: и tel: остаются в текущей вкладке
  if (!/^https?:\/\//i.test(href)) return false;

  try {
    const { hostname } = new URL(href);
    return hostname !== SITE_HOST && !hostname.endsWith(`.${SITE_HOST}`);
  } catch {
    return false;
  }
}

export function externalLinks() {
  return () => ({
    name: 'external-links',
    element: {
      filter: ['a'],
      visit(node, ctx) {
        if (!isExternal(node.properties?.href)) return;

        ctx.setProperty(node, 'target', '_blank');
        // noopener закрывает доступ к window.opener, noreferrer — заодно
        // прячет реферер; для ссылок на документацию это приемлемо
        ctx.setProperty(node, 'rel', 'noopener noreferrer');

        ctx.appendChild(node, {
          type: 'element',
          tagName: 'span',
          properties: { className: ['sr-only'] },
          children: [{ type: 'text', value: HINT }],
        });
      },
    },
  });
}
