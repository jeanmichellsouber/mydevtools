import styled from 'styled-components';

export const StyledCustomCheckbox = styled.input.attrs({ type: 'checkbox' })`
  width: 0;
  height: 0;
  position: absolute;
  + .customCheckbox-icon {
    width: 30px;
    height: 30px;
    border-radius: 100px;
    filter: grayscale(100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }
  &:checked + .customCheckbox-icon {
    filter: none;
  }
`;
