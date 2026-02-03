import styled from 'styled-components';

export const StyledCopyCommandButton = styled.button`
  background: #f5f5f5;
  height: 38px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
  border: solid 1px #d5d5d5;
  cursor: pointer;
  text-align: left;
  overflow: hidden;
  color: #000;
  padding: 3px 5px;
  & > div {
    display: flex;
    align-items: center;
  }
  svg {
    color: #38a3a5;
  }
  &:hover {
    background: #e0e0e0;
  }
  &:active {
    background: #d4d4d4;
  }
  .icon {
  }
  span {
    color: #000;
    font-weight: 600;
  }
`;

export const StyledCopyCommandLink = styled.a``;
