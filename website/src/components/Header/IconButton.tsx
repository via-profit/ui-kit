import styled from '@emotion/styled';

/**
 * Square ghost button of the header
 */
const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  min-width: 2.25rem;
  height: 2.25rem;
  padding: 0 0.5rem;
  font: inherit;
  font-size: 1.15rem;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.color.border.toString()};
  border-radius: 0.5rem;
  cursor: pointer;
  text-decoration: none;
  transition:
    color 120ms ease-out,
    border-color 120ms ease-out,
    background-color 120ms ease-out;

  &:hover {
    color: ${({ theme }) => theme.color.accentPrimary.toString()};
    border-color: ${({ theme }) => theme.color.accentPrimary.alpha(0.5).toString()};
    background-color: ${({ theme }) => theme.color.accentPrimary.alpha(0.08).toString()};
  }
`;

export default IconButton;

/**
 * The same button as a link
 */
export const IconLink = IconButton.withComponent('a');
