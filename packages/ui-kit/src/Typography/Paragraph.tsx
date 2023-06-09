import styled from '@emotion/styled';

const Paragraph = styled.p`
  font-size: 1rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textPrimary.toString()};
`;

export default Paragraph;
