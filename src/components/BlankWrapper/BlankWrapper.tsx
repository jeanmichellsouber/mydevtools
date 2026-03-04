import { StyledBlankWrapper } from './BlankWrapper.styles';
import type { BlankWrapperProps } from './BlankWrapper.types';
import { useThemeStore } from '@/stores/theme.store';

export const BlankWrapper = ({ children, ...rest }: BlankWrapperProps) => {
  const theme = useThemeStore(state => state.theme);
  return (
    <StyledBlankWrapper theme={theme} {...rest}>
      {children}
    </StyledBlankWrapper>
  );
};
