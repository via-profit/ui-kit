import React from 'react';
import MarkdownRender from '~/components/RenderMarkdown';
import Surface from '@via-profit/ui-kit/src/Surface';
import content from '@via-profit/ui-kit/docs/README.md';
import Swiper, { SwiperSlide } from '@via-profit/ui-kit/src/Swiper';

const Introduction: React.FC = () => {
  const modifiedContent = content.replace(/\.\//g, './docs/');

  return (
    <Surface>
      <Swiper dragged={false}>
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

      <MarkdownRender>{modifiedContent}</MarkdownRender>
    </Surface>
  );
};

export default Introduction;
