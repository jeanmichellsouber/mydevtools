import type { CustomSelectboxProps } from './CustomSelectbox.types';
import { StyledCustomSelectbox } from './CustomSelectbox.styles';

export const CustomSelectbox = ({ options, ...rest }: CustomSelectboxProps) => {
  return (
    <StyledCustomSelectbox {...rest}>
      {options.map(option => (
        <option
          key={option.value}
          value={option.value}
          selected={option.selected}
        >
          {option.label}
        </option>
      ))}
    </StyledCustomSelectbox>
  );
};
