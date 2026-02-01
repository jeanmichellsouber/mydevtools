import { StyledBlankWrapper } from './BlankWrapper.styles';
import type { BlankWrapperProps } from './BlankWrapper.types';

export const BlankWrapper = ({ children, ...rest }: BlankWrapperProps) => {
  return <StyledBlankWrapper {...rest}>{children}</StyledBlankWrapper>;
};
