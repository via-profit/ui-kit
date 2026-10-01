import React from 'react';
import Slider from '@via-profit/ui-kit/src/Slider';
import { useIntl } from 'react-intl';

const ExampleSliderBasic: React.FC = () => {
  const intl = useIntl();

  return (
    <Slider defaultValue={40} aria-label={intl.formatMessage({ defaultMessage: 'Громкость' })} />
  );
};

export default ExampleSliderBasic;
