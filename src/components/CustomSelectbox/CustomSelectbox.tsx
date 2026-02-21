import type { CustomSelectboxProps } from './CustomSelectbox.types';
import { StyledCustomSelectbox } from './CustomSelectbox.styles';

export const CustomSelectbox = ({ options, ...rest }: CustomSelectboxProps) => {
  return (
    <StyledCustomSelectbox
      defaultValue={options.find(option => option.selected)?.value}
      {...rest}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledCustomSelectbox>
  );
};
