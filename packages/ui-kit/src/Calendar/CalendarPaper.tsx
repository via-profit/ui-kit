import styled from '@emotion/styled';

const CalendarPaper = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: stretch;
  max-width: 18em;
  background-color: ${({ theme }) => theme.color.surface.toString()};
  border-radius: ${({ theme }) => theme.shape.radiusFactor}em;
  box-shadow: 0 4px 24px ${({ theme }) => theme.color.surface.darken(50).alpha(0.6).toString()};
`;

export default CalendarPaper;
