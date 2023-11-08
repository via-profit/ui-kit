import React from 'react';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import ruRU from '~/translations/ru-RU.json';

export interface LocaleProviderProps {
  readonly children: React.ReactNode | readonly React.ReactNode[];
}

const selector = createStructuredSelector({
  localeName: (store: ReduxStore) => store.ui.locale,
});

const LocaleProvider: React.FC<LocaleProviderProps> = props => {
  const { children } = props;
  const { localeName } = useSelector(selector);

  const { locale, messages } = React.useMemo(() => {
    switch (localeName) {
      case 'ru-RU':
      default:
        return {
          locale: localeName,
          messages: ruRU,
        };
    }
  }, [localeName]);

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
};

export default LocaleProvider;
