import React from 'react';
import MarkdownRender from '~/components/RenderMarkdown';
import Surface from '@via-profit/ui-kit/src/Surface';
import content from '@via-profit/ui-kit/docs/README.md';
import Swiper, { Slide } from './Swiper';

const Introduction: React.FC = () => {
  const modifiedContent = content.replace(/\.\//g, './docs/');

  return (
    <Surface>
      <Swiper>
        <Slide key={1} style={{ background: '#ff6b6b' }}>
          Слайд 1
        </Slide>

        <Slide key={2} style={{ background: '#4ecdc4' }}>
          Слайд 2
        </Slide>

        <Slide key={3} style={{ background: '#ffe66d' }}>
          Слайд 3
        </Slide>
      </Swiper>

      <MarkdownRender>{modifiedContent}</MarkdownRender>
    </Surface>
  );
};

export default Introduction;
