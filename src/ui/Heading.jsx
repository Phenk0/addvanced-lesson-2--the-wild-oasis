import styled, { css } from 'styled-components';

const Heading = styled.h1`
  ${({ as }) =>
    as === 'h1' &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}
  ${({ as }) =>
    as === 'h2' &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
  ${({ as }) =>
    as === 'h3' &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
  ${({ as }) =>
    as === 'h4' &&
    css`
      text-align: center;
      font-size: 3rem;
      font-weight: 600;
    `}
`;
export default Heading;
