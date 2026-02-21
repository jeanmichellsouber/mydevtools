import styled from 'styled-components';

export const StyledDialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props =>
    props.theme === 'light' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.8)'};
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    width: 873px;
    max-width: calc(100% - 40px);
    background: ${props => (props.theme === 'light' ? 'white' : '#1e1e1e')};
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  }
`;
