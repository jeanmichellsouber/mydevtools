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
  // margin-bottom: -1px;
  .accordion-header {
    margin: 0;
    .accordion-trigger {
      transition: background-color 0.2s ease-in-out;
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
      &[data-state='open'] {
        background-color: #c5ffb9;
      }
    }
  }
  .accordion-content {
    transition: background-color 0.2s ease-in-out;
    background-color: #fafafa;
    overflow: hidden;

    &[data-state='open'] {
      animation: ${slideDown} 250ms ease-out;
    }

    &[data-state='closed'] {
      animation: ${slideUp} 250ms ease-out;
    }

    & > div {
      padding: 15px 20px;
    }
  }
`;
