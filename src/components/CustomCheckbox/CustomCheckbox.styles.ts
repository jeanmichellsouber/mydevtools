import styled from 'styled-components';

export const StyledCustomCheckbox = styled.input.attrs({ type: 'checkbox' })`
  width: 0;
  height: 0;
  position: absolute;
  + .customCheckbox-icon {
    width: 40px;
    height: 40px;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: ${props => (props.theme === 'dark' ? '#fff' : '#333')};
    border: solid 1px ${props => (props.theme === 'dark' ? '#777' : '#aaa')};
  }
  &:checked + .customCheckbox-icon {
    background-color: ${props => props.color};
    color: #111;
    border-color: transparent;
  }
`;
