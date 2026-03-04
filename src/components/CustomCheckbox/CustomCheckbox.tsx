import CustomTooltip from '../CustomTooltip/CustomTooltip';
import { StyledCustomCheckbox } from './CustomCheckbox.styles';
import type { CustomCheckboxProps } from './CustomCheckbox.types';
import { useThemeStore } from '@/stores/theme.store';

export const CustomCheckbox = ({
  label,
  color,
  icon,
  ...rest
}: CustomCheckboxProps) => {
  const theme = useThemeStore(state => state.theme);
  return (
    <CustomTooltip content={label} maxWidth="200px">
      <label style={{ position: 'relative', padding: '0' }}>
        <StyledCustomCheckbox color={color} theme={theme} {...rest} />
        <div className="customCheckbox-icon">{icon}</div>
      </label>
    </CustomTooltip>
  );
};
