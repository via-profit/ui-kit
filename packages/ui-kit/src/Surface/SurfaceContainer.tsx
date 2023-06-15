import styled from '@emotion/styled';

const SurfaceContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface.toString()};
  color: ${({ theme }) => theme.colors.textPrimary.toString()};
  box-shadow: ${({ theme }) =>
    `0 0.5em 2em -0.8em ${theme.colors.surface.darken(100).alpha(0.4).toString()}`};
  border-radius: ${({ theme }) => theme.shape.radiusFactor}em;
  margin-bottom: 1em;
  font-size: 1em;
`;

export default SurfaceContainer;
