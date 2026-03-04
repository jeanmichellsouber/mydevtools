import { StyledManagementButton } from './ManagementButton.styles';
import type { ManagementButtonProps } from './ManagementButton.types';
import { useThemeStore } from '@/stores/theme.store';

export const ManagementButton = ({
  label,
  icon,
  color,
  ...rest
}: ManagementButtonProps) => {
  const theme = useThemeStore(state => state.theme);
  return (
    <StyledManagementButton theme={theme} {...rest}>
      <div className="icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <span>{label}</span>
    </StyledManagementButton>
  );
};
