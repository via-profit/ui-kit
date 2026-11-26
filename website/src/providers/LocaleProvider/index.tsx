import React from 'react';
import { IntlProvider } from 'react-intl';

import { useUi } from '~/providers/UiProvider';
import { getMessages, intlLocales } from '~/translations';

const LocaleProvider: React.FC<{ readonly children: React.ReactNode }> = ({ children }) => {
  const { locale } = useUi();
  const messages = React.useMemo(() => getMessages(locale), [locale]);

  return (
    <IntlProvider locale={intlLocales[locale]} messages={messages} defaultLocale="ru-RU">
      {children}
    </IntlProvider>
  );
};

export default LocaleProvider;
