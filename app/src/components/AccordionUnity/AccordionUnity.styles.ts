import { Accordion } from 'radix-ui';
import styled, { keyframes } from 'styled-components';

const slideDown = keyframes`
  from {
    height: 0;
  }
  to {
    height: var(--radix-accordion-content-height);
  }
`;

const slideUp = keyframes`
  from {
    height: var(--radix-accordion-content-height);
  }
  to {
    height: 0;
  }
`;

export const StyledAccordionUnity = styled(Accordion.Item)`
  .accordion-header {
    margin: 0;
    position: sticky;
    top: 0;
    .accordion-trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: ${props => (props.theme === 'dark' ? '#333' : '#fff')};
      border: none;
      border-bottom: solid 1px
        ${props => (props.theme === 'dark' ? '#000' : '#d5d5d5')};
      height: 50px;
      width: 100%;
      padding: 0 20px 0 10px;
      font-size: 16px;
      font-weight: 600;
      color: ${props => (props.theme === 'dark' ? '#fff' : '#111')};
      text-align: left;
      > svg {
        transition: transform 250ms ease-out;
        transform: rotate(0deg);
      }
      &:hover {
        background-color: ${props =>
          props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#f1f1f1'};
      }
      &[data-state='open'] {
        background-color: ${props =>
          props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#c5ffb9'};
        > svg {
          transform: rotate(180deg);
        }
      }
      .wrapper-header-content {
        display: flex;
        align-items: center;
        gap: 10px;
        span {
          display: block;
          svg {
            display: block;
          }
          &.draggable-handle {
            cursor: grab;
            color: ${props =>
              props.theme === 'dark' ? '#aaa' : 'rgba(0, 0, 0, 0.5)'};
            padding: 10px;
          }
        }
      }
    }
  }
  .context-menu {
    font-size: 14px;
    background-color: #fff;
    border-radius: 6px;
    padding: 10px;
    min-width: 200px;
    // border: solid 1px rgba(0, 0, 0, 0.1);
    z-index: 1;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
  .context-menu-item {
    padding: 8px 14px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    color: #444;
    svg {
      font-size: 16px;
      color: inherit;
    }
    &:hover {
      background-color: rgb(25, 95, 114);
      color: #fff;
    }
    &.delete {
      color: #da3f3f;
      &:hover {
        background-color: #da3f3f;
        color: #fff;
      }
    }
  }
  .context-menu-separator {
    height: 1px;
    background-color: rgba(0, 0, 0, 0.1);
    margin: 10px auto;
    width: 90%;
  }
  .accordion-content {
    transition: background-color 0.05s ease;
    background-color: ${props => (props.theme === 'dark' ? '#252525' : '#fff')};
    overflow: hidden;

    &[data-state='open'] {
      animation: ${slideDown} 200ms ease;
    }

    &[data-state='closed'] {
      animation: ${slideUp} 200ms ease;
    }

    & > div {
      padding: 15px 20px;
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
    }
  }
`;
