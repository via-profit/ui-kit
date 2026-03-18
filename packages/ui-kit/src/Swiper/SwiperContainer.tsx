import styled from '@emotion/styled';
import React from 'react';

export type SwiperContainerProps = React.HTMLAttributes<HTMLDivElement>;

export const SwiperContainer = styled.div`
  width: 100%;
    max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
`;

export default SwiperContainer;
