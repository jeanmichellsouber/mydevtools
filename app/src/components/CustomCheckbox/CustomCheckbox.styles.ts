import styled from 'styled-components';

export const StyledCustomCheckbox = styled.input.attrs({ type: 'checkbox' })`
  width: 0;
  height: 0;
  position: absolute;
  + .customCheckbox-icon {
    width: 40px;
    height: 40px;
    border-radius: 100px;
    filter: grayscale(100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }
  &:checked + .customCheckbox-icon {
    filter: none;
  }
`;
