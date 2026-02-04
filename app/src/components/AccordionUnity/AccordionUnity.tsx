import { Accordion } from 'radix-ui';
import { StyledAccordionUnity } from './AccordionUnity.styles';
import type { AccordionUnityProps } from './AccordionUnity.types';
import { IoIosArrowDown } from 'react-icons/io';

export const AccordionUnity = ({
  children,
  headerTitle,
  value,
}: AccordionUnityProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <StyledAccordionUnity value={value}>
      <Accordion.Header className="accordion-header">
        <Accordion.Trigger
          className="accordion-trigger"
          onClick={() => {
            scrollToTop();
          }}
        >
          {headerTitle} <IoIosArrowDown />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="accordion-content">
        <div>{children}</div>
      </Accordion.Content>
    </StyledAccordionUnity>
  );
};
