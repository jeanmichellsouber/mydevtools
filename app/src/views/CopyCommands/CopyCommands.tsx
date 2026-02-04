import { BsTerminal } from 'react-icons/bs';
import { BlankWrapper } from '../../components/BlankWrapper';
import { ManagementButton } from '../../components/ManagementButton';

import { PiArrowsDownUpLight } from 'react-icons/pi';
import { RiDeleteBin7Line } from 'react-icons/ri';
import * as Accordion from '@radix-ui/react-accordion';
import { AccordionUnity } from '../../components/AccordionUnity';
import { CopyCommandButton } from '../../components/CopyCommandButton';
import { ContextMenu } from 'radix-ui';

const CopyCommands = () => {
  return (
    <>
      <h1 className="gradientFont1">Copy Commands</h1>
      <p>
        Online tool to create and maintain lists of strings. So it's easy to
        copy them by left-clicking.
      </p>
      <p>
        Storing strings in:{' '}
        <strong className="colorGreen1">Local Storage</strong>.
      </p>
      <BlankWrapper>
        <h3 className="smallerHeading">Management</h3>
        <div className="d-flex1">
          <ManagementButton
            label="Add new  group of commands"
            icon={<BsTerminal />}
            color="#38A3A5"
            onClick={() => {
              alert('Add New Clicked');
            }}
          />
          <ManagementButton
            label="Delete all groups (23)"
            icon={<RiDeleteBin7Line />}
            color="#DA3F3F"
            onClick={() => {
              alert('Delete all groups (23)');
            }}
          />
          <ManagementButton
            label="Import / Export"
            icon={<PiArrowsDownUpLight />}
            color="#195F72"
            onClick={() => {
              alert('Import / Export');
            }}
          />
        </div>
        <hr />
        <h3 className="smallerHeading">Listing</h3>
        <div>
          <Accordion.Root type="single" collapsible>
            {[1, 2, 3, 4, 5].map(item => (
              <AccordionUnity
                key={item}
                headerTitle={`Group of commands ${item}`}
                value={`item-${item}`}
              >
                <CopyCommandButton
                  label="npm install react-router-dom npm install react-router-dom npm install react-router-dom npm install react-router-dom npm install react-router-dom"
                  type="command"
                />
                <CopyCommandButton
                  label="https://reactrouter.com/en/main"
                  type="link"
                />
                <CopyCommandButton
                  label="npm install react-router-dom"
                  type="command"
                />
              </AccordionUnity>
            ))}
          </Accordion.Root>
        </div>
        <hr />
        <h3 className="smallerHeading">testing</h3>
        <div>
          <ContextMenu.Root>
            <ContextMenu.Trigger>
              <div style={{ padding: 20, border: '1px solid #ccc' }}>
                Right-click me!
              </div>
            </ContextMenu.Trigger>

            <ContextMenu.Content className="menu">
              <ContextMenu.Item onSelect={() => alert('Action 1')}>
                Action 1
              </ContextMenu.Item>
              <ContextMenu.Item onSelect={() => alert('Action 2')}>
                Action 2
              </ContextMenu.Item>
              <ContextMenu.Separator />
              <ContextMenu.Item onSelect={() => alert('Another Action')}>
                Another Action
              </ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Root>
        </div>
      </BlankWrapper>
    </>
  );
};

export default CopyCommands;
