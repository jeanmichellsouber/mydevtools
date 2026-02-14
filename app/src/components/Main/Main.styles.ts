import styled from 'styled-components';
import { headerHeight } from '@/utils/utils';

export const StyledMain = styled.main`
  display: flex;
  height: calc(100vh - ${headerHeight}px);

  aside {
    width: 275px;
    background-color: #ffffff;
    border-right: 1px solid #c0c0c0;
    padding: 45px 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .mainContent {
    background-color: #f4f4f4;
    width: calc(100% - 275px);
    overflow: auto;

    .contentWrapper {
      min-height: calc(100vh - ${headerHeight - 1}px);
      padding: 45px 50px;
    }
  }
`;
