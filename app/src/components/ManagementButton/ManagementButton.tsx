import { StyledManagementButton } from './ManagementButton.styles';
import type { ManagementButtonProps } from './ManagementButton.types';

export const ManagementButton = ({
  label,
  icon,
  color,
  ...rest
}: ManagementButtonProps) => {
  return (
    <StyledManagementButton {...rest}>
      <div className="icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <span>{label}</span>
    </StyledManagementButton>
  );
};
