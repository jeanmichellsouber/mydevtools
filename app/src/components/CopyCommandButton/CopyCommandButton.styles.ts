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
    // margin-right: 10px;
    width: 30px;
    height: 100%;
  }
  .secondary-icon {
    display: none;
  }
  svg {
    color: #38a3a5;
    display: block;
  }
  &:hover {
    background: #f1f1f1;
    // .icon {
    //   background-color: #38a3a5;
    //   svg {
    //     color: #fff;}
    // }
    .secondary-icon {
      display: flex;
    }
  }
  &:active {
    background: #e8e8e8;
  }

  .hint {
    font-size: 8px;
    letter-spacing: 1px;
    text-transform: uppercase;
    display: block;
    color: #777;
    margin-bottom: -1px;
    // font-family: 'Courier New', serif !important;
  }

  span {
    color: #111;
    font-weight: 500;
    font-family: 'Courier New', serif !important;
    font-size: 14px;
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
