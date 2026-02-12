import type { CenterProps } from './Center.types';
import { StyledCenter } from './Center.styles';

export const Center = ({ children }: CenterProps) => {
  return <StyledCenter>{children}</StyledCenter>;
};
