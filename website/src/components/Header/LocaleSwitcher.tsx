import React from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';

import { useUi } from '~/providers/UiProvider';
import { useT } from '~/translations';
import { enabledLocales } from '~/utils/locale';
import IconButton, { IconLink } from './IconButton';

const Label = styled.span`
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.04em;
`;

/**
 * The same button without the reaction to the hover
 */
const DisabledButton = styled(IconButton)`
  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;

    &:hover {
      color: ${({ theme }) => theme.color.textSecondary.toString()};
      border-color: ${({ theme }) => theme.color.border.toString()};
      background-color: transparent;
    }
  }
`;

const LocaleSwitcher: React.FC = () => {
  const { locale } = useUi();
  const { pathname, search, hash } = useLocation();
  const [isMounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const target = locale === 'ru' ? 'en' : 'ru';
  const t = useT();

  // The other locale is not translated yet: its addresses are served in the current locale
  if (!enabledLocales.includes(target)) {
    const label = t('header.languageUnavailable');

    return (
      <DisabledButton type="button" disabled title={label} aria-label={label}>
        <Label>{target.toUpperCase()}</Label>
      </DisabledButton>
    );
  }

  const title = t('header.language');

  return (
    <IconLink
      href={`/${target}${pathname}${search}${isMounted ? hash : ''}`}
      hrefLang={target}
      title={title}
      aria-label={title}
    >
      <Label>{target.toUpperCase()}</Label>
    </IconLink>
  );
};

export default LocaleSwitcher;
