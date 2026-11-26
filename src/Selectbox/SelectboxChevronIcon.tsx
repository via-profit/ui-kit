import React from 'react';
import styled from '@emotion/styled';

export type SelectboxChevronIconProps = React.SVGProps<SVGSVGElement> & {
  readonly isOpen: boolean;
};

type StyledSVGProps = {
  readonly $isOpen: boolean;
};

const StyledSVG = styled.svg<StyledSVGProps>`
  transform: rotateZ(${({ $isOpen }) => ($isOpen ? 90 : 0)}deg);
  transition: transform 100ms ease-out;
`;

const SelectboxChevronIcon: React.ForwardRefRenderFunction<
  SVGSVGElement,
  SelectboxChevronIconProps
> = (props, ref) => {
  const { isOpen, ...restProps } = props;

  return (
    <StyledSVG
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...restProps}
      $isOpen={isOpen}
      ref={ref}
    >
      <path
        d="m105.79 160.82a24 24 0 0 0-10.76 6.2109 24 24 0 0 0 0 33.941l144 144a24.002 24.002 0 0 0 33.941 0l144-144a24 24 0 0 0 0-33.941 24 24 0 0 0-33.941 0l-127.03 127.03-127.03-127.03a24 24 0 0 0-23.182-6.2109z"
        fill="currentColor"
      />
    </StyledSVG>
  );
};

export default React.forwardRef(SelectboxChevronIcon);
