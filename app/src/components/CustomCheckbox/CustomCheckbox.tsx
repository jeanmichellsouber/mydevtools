import { useApp } from '@/providers/AppProvider/AppProvider';
import CustomTooltip from '../CustomTooltip/CustomTooltip';
import { StyledCustomCheckbox } from './CustomCheckbox.styles';
import type { CustomCheckboxProps } from './CustomCheckbox.types';

export const CustomCheckbox = ({
  label,
  color,
  icon,
  ...rest
}: CustomCheckboxProps) => {
  const { contextState } = useApp();
  return (
    <CustomTooltip content={label} maxWidth="200px">
      <label style={{ position: 'relative', padding: '0' }}>
        <StyledCustomCheckbox
          color={color}
          theme={contextState.theme}
          {...rest}
        />
        <div className="customCheckbox-icon">{icon}</div>
      </label>
    </CustomTooltip>
  );
};
