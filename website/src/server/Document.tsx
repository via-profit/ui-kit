import React from 'react';

import type { ThemeName } from '~/providers/UiProvider';
import type { Locale } from '~/utils/locale';

const descriptions: Record<Locale, string> = {
  en: 'React components for interfaces: inputs, buttons, calendar, menu, modal windows and more',
  ru: 'Набор React-компонентов для интерфейсов: поля ввода, кнопки, календарь, меню, модальные окна и другие',
};

interface Props {
  readonly children: React.ReactNode;
  readonly locale: Locale;
  readonly theme: ThemeName;
  readonly title: string;
  readonly scripts: readonly string[];
}

const Document: React.FC<Props> = ({ children, locale, theme, title, scripts }) => (
  <html lang={locale}>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="color-scheme" content="dark light" />
      <meta name="description" content={descriptions[locale]} />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <title>{title}</title>
    </head>
    <body>
      <div id="app" data-theme={theme}>
        {children}
      </div>
      {scripts.map(src => (
        <script key={src} src={src} defer />
      ))}
    </body>
  </html>
);

export default Document;
