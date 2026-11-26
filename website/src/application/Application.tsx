import React from 'react';
import type { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

import LocaleProvider from '~/providers/LocaleProvider';
import ThemeProvider from '~/providers/ThemeProvider';
import UiProvider from '~/providers/UiProvider';
import type { ThemeName } from '~/providers/UiProvider';
import type { Locale } from '~/utils/locale';

interface Props {
  readonly children: React.ReactNode;
  readonly cssCache: EmotionCache;
  readonly locale: Locale;
  readonly theme: ThemeName;
}

const Application: React.FC<Props> = ({ children, cssCache, locale, theme }) => (
  <CacheProvider value={cssCache}>
    <UiProvider locale={locale} initialTheme={theme}>
      <ThemeProvider>
        <LocaleProvider>{children}</LocaleProvider>
      </ThemeProvider>
    </UiProvider>
  </CacheProvider>
);

export default Application;
