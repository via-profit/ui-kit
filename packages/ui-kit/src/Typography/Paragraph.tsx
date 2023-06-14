import styled from '@emotion/styled';

const Paragraph = styled.p`
  font-size: 1rem;
  font-weight: 300;
  margin: 0 0 0.8em 0;
  color: ${({ theme }) => theme.colors.textPrimary.toString()};
`;

export default Paragraph;
