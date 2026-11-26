import React from 'react';
import styled from '@emotion/styled';

import { useT } from '~/translations';
import Notice from './Notice';

const ErrorNotice = styled(Notice)`
  color: ${({ theme }) => theme.color.error.toString()};
  border-color: ${({ theme }) => theme.color.error.alpha(0.5).toString()};
`;

const DocLoadError = () => {
  const t = useT();

  return <ErrorNotice role="alert">{t('doc.loadError')}</ErrorNotice>;
};

export default DocLoadError;
