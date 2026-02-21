import { useApp } from '@/providers/AppProvider/AppProvider';
import { StyledManagementButton } from './ManagementButton.styles';
import type { ManagementButtonProps } from './ManagementButton.types';

export const ManagementButton = ({
  label,
  icon,
  color,
  ...rest
}: ManagementButtonProps) => {
  const { contextState } = useApp();
  return (
    <StyledManagementButton theme={contextState.theme} {...rest}>
      <div className="icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <span>{label}</span>
    </StyledManagementButton>
  );
};
