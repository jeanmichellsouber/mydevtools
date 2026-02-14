import styled from 'styled-components';
import { headerHeight } from '@/utils/utils';

export const StyledMain = styled.main`
  display: flex;
  height: calc(100vh - ${headerHeight}px);

  aside {
    width: 275px;
    background-color: ${props => (props.theme === 'dark' ? '#333' : '#fff')};
    border-right: 1px solid
      ${props => (props.theme === 'dark' ? '#000' : '#c0c0c0')};
    padding: 45px 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  nav {
    font-size: 18px;
    font-weight: bold;
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      li {
        a {
          color: ${props => (props.theme === 'dark' ? '#fff' : '#195f72')};
          display: inline-block;
          padding: 5px 10px;
          transition: all 0.3s ease;
          &:before {
            content: '//';
            color: ${props =>
              props.theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : '#195f72'};
            opacity: 0.5;
            margin: 0 10px 0 0;
          }
          &:hover {
            background: ${props =>
              props.theme === 'dark'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'linear-gradient(90deg, #eee, #f5f5f5)'};
          }
          &.active {
            background: linear-gradient(90deg, #9cebed, #c7ffbc);
            color: #13320c;
            &:before {
              color: #195f72;
            }
          }
        }
      }
    }
  }

  .mainContent {
    background-color: ${props => (props.theme === 'dark' ? '#222' : '#f4f4f4')};
    width: calc(100% - 275px);
    overflow: auto;

    .contentWrapper {
      min-height: calc(100vh - ${headerHeight - 1}px);
      padding: 45px 50px;
    }
  }
`;
