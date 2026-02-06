import { BsLink45Deg, BsTerminal } from 'react-icons/bs';
import { BlankWrapper } from '../../components/BlankWrapper';
import { ManagementButton } from '../../components/ManagementButton';
import { PiArrowsDownUpLight } from 'react-icons/pi';
import { RiDeleteBin7Line } from 'react-icons/ri';
import * as Accordion from '@radix-ui/react-accordion';
import { AccordionUnity } from '../../components/AccordionUnity';
import { CopyCommandButton } from '../../components/CopyCommandButton';
import { Dialog } from '../../components/Dialog';
import { useState } from 'react';
import { Button, TextField } from '@radix-ui/themes';
import { CustomCheckbox } from '../../components/CustomCheckbox';

const CopyCommands = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

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
              setDialogOpen(true);
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
                  hint="This is a long command example to test the ellipsis effect on the button"
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
        <div>
          {/* add new groups of commands */}
          <Dialog open={dialogOpen}>
            <h3 className="gradientFont1">Add a group of commands / strings</h3>
            <TextField.Root
              autoFocus
              size="3"
              placeholder="Group title"
              onChange={() => {}}
            />
            <p>
              <small>
                This is the title that will be on the accordion's header.
              </small>
            </p>
            <hr />
            <p className="colorGreen1">
              <strong>List of commands / strings</strong>
            </p>
            <div className="d-flex1">
              <TextField.Root
                size="3"
                placeholder="String / command"
                onChange={() => {}}
                style={{ flexGrow: 3 }}
              />
              <TextField.Root
                size="3"
                placeholder="Hint"
                onChange={() => {}}
                style={{ flexGrow: 1 }}
              />
              <CustomCheckbox
                label="Click to turn this string into a hyperlink (_blank)"
                icon={<BsLink45Deg />}
                onChange={() => {}}
                color="#9CEBED"
              />
            </div>
            <hr />
            <Button
              size="3"
              variant="solid"
              color="blue"
              className="gradient1"
              style={{
                width: '100%',
              }}
              onClick={() => {}}
            >
              <span>Add a group of strings / commands</span>
            </Button>
            <a
              onClick={() => {
                return false;
              }}
              href="#closeModal"
            >
              Cancel and close the modal
            </a>
          </Dialog>
        </div>
      </BlankWrapper>
    </>
  );
};

export default CopyCommands;
