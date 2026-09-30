import React from 'react';
import { H1, H2, H3, H4, H5, H6 } from '@via-profit/ui-kit/src/Typography';
import { FormattedMessage } from 'react-intl';

const ExampleTypographyHeadings: React.FC = () => (
  <>
    <H1>
      <FormattedMessage defaultMessage="H1. Заголовок страницы" />
    </H1>
    <H2>
      <FormattedMessage defaultMessage="H2. Раздел" />
    </H2>
    <H3>
      <FormattedMessage defaultMessage="H3. Подраздел" />
    </H3>
    <H4>
      <FormattedMessage defaultMessage="H4. Группа" />
    </H4>
    <H5>
      <FormattedMessage defaultMessage="H5. Подгруппа" />
    </H5>
    <H6>
      <FormattedMessage defaultMessage="H6. Мелкий заголовок" />
    </H6>
  </>
);

export default ExampleTypographyHeadings;
