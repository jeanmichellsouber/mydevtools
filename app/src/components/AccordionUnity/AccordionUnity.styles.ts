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
      transition: background-color 0.1s ease;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
      border: none;
      border-bottom: solid 1px #e9e9e9;
      height: 57px;
      width: 100%;
      padding: 0 20px;
      font-size: 16px;
      font-weight: 600;
      color: #000000;
      text-align: left;
      > svg {
        transition: transform 250ms ease-out;
        transform: rotate(0deg);
      }
      &:hover {
        background-color: #f1f1f1;
      }
      &[data-state='open'] {
        background-color: #c5ffb9;
        svg {
          transform: rotate(180deg);
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
      background-color: #006996;
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
    transition: background-color 0.2s ease-in-out;
    background-color: #fff;
    overflow: hidden;

    &[data-state='open'] {
      animation: ${slideDown} 250ms ease-out;
    }

    &[data-state='closed'] {
      animation: ${slideUp} 250ms ease-out;
    }

    & > div {
      padding: 15px 20px;
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
    }
  }
`;
