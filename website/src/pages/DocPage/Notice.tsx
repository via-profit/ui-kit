import styled from '@emotion/styled';

const Notice = styled.div`
  margin-bottom: 1.25rem;
  padding: 0.6rem 0.9rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
  border: 1px dashed ${({ theme }) => theme.color.border.toString()};
  border-radius: 0.5rem;
`;

export default Notice;
