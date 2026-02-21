import { useApp } from '@/providers/AppProvider/AppProvider';
import { StyledBlankWrapper } from './BlankWrapper.styles';
import type { BlankWrapperProps } from './BlankWrapper.types';

export const BlankWrapper = ({ children, ...rest }: BlankWrapperProps) => {
  const { contextState } = useApp();
  return (
    <StyledBlankWrapper theme={contextState.theme} {...rest}>
      {children}
    </StyledBlankWrapper>
  );
};
