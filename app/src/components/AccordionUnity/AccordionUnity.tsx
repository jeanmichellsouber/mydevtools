import { Accordion, ContextMenu } from 'radix-ui';
import { StyledAccordionUnity } from './AccordionUnity.styles';
import type { AccordionUnityProps } from './AccordionUnity.types';
import { IoIosArrowDown } from 'react-icons/io';
import { IoDuplicateOutline } from 'react-icons/io5';
import { FiEdit3 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';

export const AccordionUnity = ({
  children,
  headerTitle,
  value,
  id,
  deleteFn,
}: AccordionUnityProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <StyledAccordionUnity value={value}>
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <Accordion.Header
            className="accordion-header"
            title="Right click for actions"
          >
            <Accordion.Trigger
              className="accordion-trigger"
              onClick={() => {
                scrollToTop();
              }}
            >
              {headerTitle} <IoIosArrowDown />
            </Accordion.Trigger>
          </Accordion.Header>
        </ContextMenu.Trigger>

        <ContextMenu.Content className="context-menu">
          <ContextMenu.Item
            className="context-menu-item"
            onSelect={() => alert('Action 1')}
          >
            <span>Edit group</span>
            <FiEdit3 />
          </ContextMenu.Item>
          <ContextMenu.Item
            className="context-menu-item"
            onSelect={() => alert('Action 2')}
          >
            <span>Duplicate group</span>
            <IoDuplicateOutline />
          </ContextMenu.Item>
          <ContextMenu.Separator className="context-menu-separator" />
          <ContextMenu.Item
            className="context-menu-item delete"
            onSelect={() => {
              deleteFn(id);
            }}
          >
            <span>Delete group</span>
            <AiOutlineDelete />
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>

      <Accordion.Content className="accordion-content">
        <div>{children}</div>
      </Accordion.Content>
    </StyledAccordionUnity>
  );
};
