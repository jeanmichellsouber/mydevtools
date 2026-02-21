import styled from 'styled-components';

export const StyledCustomSelectbox = styled.select`
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  background: transparent;
  border: solid 1px #fff;
  color: #fff;
  option {
    background-color: #fff;
    color: #333;
    &:hover,
    &:focus {
      background-color: red;
    }
  }
`;
