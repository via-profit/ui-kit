import React from 'react';
import styled from '@emotion/styled';

const CalendarWeekDayLabel = styled.div`
  text-align: center;
  font-weight: 200;
  font-size: 0.8em;
  user-select: none;
  width: 3em;
  height: 3em;
  color: ${({ theme }) => theme.colors.textSecondary.toString()};
`;

export default React.memo(CalendarWeekDayLabel);
