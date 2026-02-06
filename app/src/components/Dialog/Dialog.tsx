import { StyledDialog } from './Dialog.styles';
import type { DialogProps } from './Dialog.types';

export const Dialog = ({ children, open = false }: DialogProps) => {
  return (
    <StyledDialog style={{ display: open ? 'flex' : 'none' }}>
      <div className="content">
        <div className="inner-content">{children}</div>
      </div>
    </StyledDialog>
  );
};
