import type { MainProps } from './Main.types';
import { StyledMain } from './Main.styles';
import { useApp } from '@/providers/AppProvider/AppProvider';

export const Main = ({ children }: MainProps) => {
  const { contextState } = useApp();
  return <StyledMain theme={contextState.theme}>{children}</StyledMain>;
};
