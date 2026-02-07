import CustomTooltip from '../CustomTooltip/CustomTooltip';
import { StyledCustomCheckbox } from './CustomCheckbox.styles';
import type { CustomCheckboxProps } from './CustomCheckbox.types';

export const CustomCheckbox = ({
  label,
  color,
  icon,
  ...rest
}: CustomCheckboxProps) => {
  return (
    <CustomTooltip content={label} maxWidth="200px">
      <label style={{ position: 'relative', padding: '0' }}>
        <StyledCustomCheckbox {...rest} />
        <div className="customCheckbox-icon" style={{ backgroundColor: color }}>
          {icon}
        </div>
      </label>
    </CustomTooltip>
  );
};
