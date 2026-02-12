import type { MainProps } from './Main.types';
import { StyledMain } from './Main.styles';

export const Main = ({ children }: MainProps) => {
  return <StyledMain>{children}</StyledMain>;
};
