import React from 'react';
import type { Locale } from '~/utils/locale';

export type { Locale } from '~/utils/locale';
export type ThemeName = 'dark' | 'light';

interface UiContextValue {
  readonly theme: ThemeName;
  readonly locale: Locale;
  readonly setTheme: (theme: ThemeName) => void;
}

export const themeCookie = 'ui-kit-theme';

const UiContext = React.createContext<UiContextValue | null>(null);

interface Props {
  readonly children: React.ReactNode;
  readonly locale: Locale;
  readonly initialTheme: ThemeName;
}

export const UiProvider: React.FC<Props> = ({ children, locale, initialTheme }) => {
  const [theme, setTheme] = React.useState(initialTheme);

  React.useEffect(() => {
    document.cookie = `${themeCookie}=${theme}; Path=/; Max-Age=31536000; SameSite=Lax`;
  }, [theme]);

  const value = React.useMemo(() => ({ theme, locale, setTheme }), [theme, locale]);

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
};

export const useUi = (): UiContextValue => {
  const value = React.useContext(UiContext);
  if (!value) {
    throw new Error('useUi must be used inside UiProvider');
  }

  return value;
};

export default UiProvider;
