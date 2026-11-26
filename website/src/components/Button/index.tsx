import styled from '@emotion/styled';
import UiKitButton from '@via-profit/ui-kit/Button';

/**
 * Button of the site. It is based on the ui-kit button, so the style is changed in one place
 */
const Button = styled(UiKitButton)`
  font-family: inherit;
  font-weight: 500;
  white-space: nowrap;
`;

export default Button;
