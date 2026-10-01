import React from 'react';
import styled from '@emotion/styled';
import Slider from '@via-profit/ui-kit/src/Slider';
import SliderRail from '@via-profit/ui-kit/src/Slider/SliderRail';
import SliderThumb from '@via-profit/ui-kit/src/Slider/SliderThumb';
import { useIntl } from 'react-intl';

// Defined once at module level, not during the render
const Rail = styled(SliderRail)`
  height: 0.75em;
  margin-top: -0.375em;
  opacity: 1;
  background: linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00);
`;

// The hue scale needs no filled part
const Track = () => null;

const Thumb = styled(SliderThumb)`
  width: 1.3em;
  height: 1.3em;
  border: 0.2em solid #fff;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);
`;

const overrides = { Rail, Track, Thumb };

const ExampleSliderOverrides: React.FC = () => {
  const intl = useIntl();
  const [hue, setHue] = React.useState(210);

  return (
    <Slider
      value={hue}
      onChange={setHue}
      max={360}
      color={`hsl(${hue}, 100%, 50%)`}
      overrides={overrides}
      aria-label={intl.formatMessage({ defaultMessage: 'Оттенок' })}
      getAriaValueText={value => `${value}°`}
    />
  );
};

export default ExampleSliderOverrides;
