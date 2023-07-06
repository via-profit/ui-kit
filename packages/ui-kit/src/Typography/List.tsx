import styled from '@emotion/styled';

export const Ul = styled.ul`
  color: currentColor;
  font-size: 1em;
  margin: 0.8em 0;
  padding-left: 1.2em;
`;

export const Ol = styled.ol`
  color: currentColor;
  font-size: 1em;
  margin: 0.8em 0;
  padding-left: 1.2em;
`;

export const Li = styled.li`
  color: currentColor;
  font-size: 1em;
  margin: 0.2em 0;
  &::marker {
    font-size: 0.9em;
    font-weight: 600;
    color: ${({ theme }) =>
      theme.isDark
        ? theme.colors.accentPrimary.lighten(20).toString()
        : theme.colors.accentPrimary.darken(20).toString()};
  }
`;

export default Ul;
