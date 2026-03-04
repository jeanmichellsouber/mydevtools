import { StyledDialog } from './Dialog.styles';
import type { DialogProps } from './Dialog.types';
import { useThemeStore } from '@/stores/theme.store';

export const Dialog = ({ children, open = false, size }: DialogProps) => {
  const theme = useThemeStore(state => state.theme);
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { width: '300px', maxWidth: '90%' };
      case 'medium':
        return { width: '500px', maxWidth: '90%' };
      case 'large':
        return { width: '800px', maxWidth: '90%' };
      default:
        return { width: '400px', maxWidth: '90%' };
    }
  };

  return (
    <StyledDialog style={{ display: open ? 'flex' : 'none' }} theme={theme}>
      <div className="content" style={getSizeStyles()}>
        <div className="inner-content">{children}</div>
      </div>
    </StyledDialog>
  );
};
