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
      &:hover {
        background-color: #f1f1f1;
      }
      &[data-state='open'] {
        background-color: #c5ffb9;
      }
    }
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
