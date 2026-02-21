import styled from 'styled-components';

export const StyledManagementButton = styled.button`
  background: ${props => (props.theme === 'dark' ? '#333' : '#f0f0f0')};
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
    background: ${props => (props.theme === 'dark' ? '#444' : '#e0e0e0')};
  }
  &:active {
    background: ${props => (props.theme === 'dark' ? '#555' : '#d4d4d4')};
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
    color: ${props => (props.theme === 'dark' ? '#fff' : '#000')};
    font-weight: 600;
  }
`;
