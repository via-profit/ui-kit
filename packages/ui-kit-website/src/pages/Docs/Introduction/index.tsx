import React from 'react';
import MarkdownRender from '~/components/RenderMarkdown';
import Surface from '@via-profit/ui-kit/src/Surface';
import content from '@via-profit/ui-kit/docs/README.md';
import Swiper, { SwiperSlide } from '@via-profit/ui-kit/src/Swiper';
import Autocomplete2 from '@via-profit/ui-kit/src/Autocomplete2';

type Item = {
  readonly id: string;
  readonly label: string;
};

const Introduction: React.FC = () => {
  const modifiedContent = content.replace(/\.\//g, './docs/');
  const [value, setValue] = React.useState<Item | null>({ id: '1', label: 'one' });
  const items: readonly Item[] = React.useMemo(
    () => [
      { id: '1', label: 'one' },
      { id: '2', label: 'two' },
      { id: '3', label: 'three' },
    ],
    [],
  );

  return (
    <Surface>
      <Swiper>
        <SwiperSlide key={1} style={{ background: '#ff6b6b' }}>
          Слайд 1
        </SwiperSlide>

        <SwiperSlide key={2} style={{ background: '#4ecdc4' }}>
          Слайд 2
        </SwiperSlide>

        <SwiperSlide key={3} style={{ background: '#ffe66d' }}>
          Слайд 3
        </SwiperSlide>
      </Swiper>
      <Surface>{JSON.stringify(value)}</Surface>
      <Autocomplete2 value={value} onChange={setValue} items={items} />

      <MarkdownRender>{modifiedContent}</MarkdownRender>
    </Surface>
  );
};

export default Introduction;
