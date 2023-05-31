import styled from '@emotion/styled';

const CalendarPaper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary.toString()};
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 1}em;
  padding: 0.4em;
  max-width: 17.6em;
  max-height: 20.4em;
  box-shadow: 0 4px 24px
    ${({ theme }) => theme.colors.backgroundPrimary.darken(0.5).alpha(0.6).toString()};
`;

export default CalendarPaper;
