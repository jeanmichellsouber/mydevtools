import styled from 'styled-components';

export const StyledManagementButton = styled.button`
  background: #f0f0f0;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 0 20px 0 0;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  &:hover {
    background: #e0e0e0;
  }
  &:active {
    background: #d4d4d4;
  }
  .icon {
    width: 53px;
    height: 100%;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }
  span {
    color: #000;
    font-weight: 600;
  }
`;
