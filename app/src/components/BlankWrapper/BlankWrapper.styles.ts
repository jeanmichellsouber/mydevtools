import styled from 'styled-components';

export const StyledBlankWrapper = styled.div`
  background: ${props =>
    props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#fff'};
  border-radius: 10px;
  border: solid 1px
    ${props => (props.theme === 'dark' ? 'transparent' : '#c9c9c9')};
  padding: 40px 35px;
  min-height: 300px;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.05);
  margin: 30px 0;
`;
