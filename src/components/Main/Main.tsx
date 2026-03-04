import type { MainProps } from './Main.types';
import { StyledMain } from './Main.styles';
import { useThemeStore } from '@/stores/theme.store';

export const Main = ({ children }: MainProps) => {
  const theme = useThemeStore(state => state.theme);
  return <StyledMain theme={theme}>{children}</StyledMain>;
};
