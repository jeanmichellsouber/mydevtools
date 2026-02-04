import styled from 'styled-components';

const styles = `
  background: #fff;
  height: 35px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
  border: solid 1px transparent;
  cursor: pointer;
  text-align: left;
  overflow: hidden;
  padding: 0 18px 0 0;
  & > div {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    width: 30px;
    height: 100%;
  }
  svg {
    color: #38a3a5;
    display: block;
  }
  &:hover {
    background: #f1f1f1;
    .icon {
      background-color: #e8e8e8;
    }
  }
  &:active {
    background: #e8e8e8;
  }

  span {
    color: #393939;
    // font-weight: 600;
    font-family: 'Courier New', serif !important;
    font-size: 16px;
    max-width: calc(100% - 45px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;    
  }
`;

export const StyledCopyCommandButton = styled.button`
  ${styles}
`;

export const StyledCopyCommandLink = styled.a`
  ${styles}
`;
