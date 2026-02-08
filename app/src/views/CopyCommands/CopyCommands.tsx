import { BsLink45Deg, BsTerminal } from 'react-icons/bs';
import { BlankWrapper } from '../../components/BlankWrapper';
import { ManagementButton } from '../../components/ManagementButton';
import { PiArrowsDownUpLight } from 'react-icons/pi';
import { RiDeleteBin7Line } from 'react-icons/ri';
import * as Accordion from '@radix-ui/react-accordion';
import { AccordionUnity } from '../../components/AccordionUnity';
import { CopyCommandButton } from '../../components/CopyCommandButton';
import { Dialog } from '../../components/Dialog';
import { useState, type Key } from 'react';
import { Button, TextField } from '@radix-ui/themes';
import { CustomCheckbox } from '../../components/CustomCheckbox';
import {
  Controller,
  useForm,
  useFieldArray,
  useWatch,
  type SubmitHandler,
} from 'react-hook-form';
import { VscEmptyWindow } from 'react-icons/vsc';
import { IoMdRemove } from 'react-icons/io';
import { LiaPlusSolid } from 'react-icons/lia';
import { generateSlug } from '../../utils/utils';

const CopyCommands = () => {
  const [commands_LS, setCommands_LS] = useState(
    JSON.parse(localStorage.getItem('commands') || 'null'),
  );

  const [add_Dialog, setAdd_Dialog] = useState<boolean>(false);

  const [removeCommands_Dialog, setRemoveCommands_Dialog] =
    useState<boolean>(false);

  type FormValues = {
    title: string;
    id: string;
    list: {
      command: string;
      hint: string;
      link: boolean;
    }[];
  };

  const { control, handleSubmit, setValue, reset } = useForm<FormValues>({
    defaultValues: {
      title: '',
      id: '',
      list: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'list',
  });

  const title = useWatch({ control, name: 'title' });
  const listFields = useWatch({ control, name: 'list' });

  const onSubmit: SubmitHandler<FormValues> = data => {
    const newCommands = [...(commands_LS || []), data];
    localStorage.setItem('commands', JSON.stringify(newCommands));
    setCommands_LS(newCommands);
    setAdd_Dialog(false);
    reset();
  };

  const deleteFn = (id: string) => {
    const confirmed = confirm('Are you sure you want to continue?');
    if (confirmed) {
      const newCommands = commands_LS.filter(
        (group: { id: string }) => group.id !== id,
      );
      localStorage.setItem('commands', JSON.stringify(newCommands));
      setCommands_LS(newCommands);
    }
  };

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
            label="Append a new  group of commands"
            icon={<BsTerminal />}
            color="#38A3A5"
            onClick={() => {
              setAdd_Dialog(true);
            }}
          />
          <ManagementButton
            label={`Delete all groups (${commands_LS ? commands_LS?.length : 0})`}
            icon={<RiDeleteBin7Line />}
            color="#DA3F3F"
            onClick={() => {
              setRemoveCommands_Dialog(true);
            }}
            disabled={!commands_LS || commands_LS.length === 0}
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
        <div>
          {commands_LS ? (
            <>
              <h3 className="smallerHeading">Listing</h3>
              <Accordion.Root type="single" collapsible>
                {commands_LS.map(
                  (group: {
                    id: Key | null | undefined;
                    title: string;
                    list: {
                      command: string;
                      link: boolean;
                      hint: string | undefined;
                    }[];
                  }) => (
                    <AccordionUnity
                      id={group.id}
                      key={group?.id}
                      headerTitle={group.title}
                      value={`group-${group.id}`}
                      deleteFn={deleteFn}
                    >
                      {group.list.map(
                        (item: {
                          command: string;
                          link: boolean;
                          hint: string | undefined;
                        }) => (
                          <CopyCommandButton
                            label={item.command}
                            type={item.link ? 'link' : 'command'}
                            hint={item.hint}
                          />
                        ),
                      )}
                    </AccordionUnity>
                  ),
                )}
              </Accordion.Root>
            </>
          ) : (
            <>
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <VscEmptyWindow size={40} className="colorGreen1" />
                <h5>No groups of commands found.</h5>
                <p>
                  <small>Add a new group to get started.</small>
                </p>
              </div>
            </>
          )}
        </div>
        <div>
          {/* add new groups of commands */}
          <Dialog open={add_Dialog} size="large">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h3 className="gradientFont1">
                Add a group of commands / strings
              </h3>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField.Root
                    {...field}
                    autoFocus
                    size="3"
                    placeholder="Group title"
                    onBlur={e => {
                      field.onChange(e.target.value);
                      setValue(
                        'id',
                        `${generateSlug(title || 'group', '-')}-${Date.now()}`,
                      );
                    }}
                  />
                )}
              />
              <Controller
                name="id"
                control={control}
                render={({ field }) => (
                  <TextField.Root
                    {...field}
                    autoFocus={false}
                    size="3"
                    placeholder="Group ID"
                    readOnly
                    style={{ display: 'none' }}
                  />
                )}
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
              <div
                style={{
                  maxHeight: '230px',
                  overflowY: 'auto',
                  paddingRight: '10px',
                  paddingTop: '1px',
                  borderBottom: 'solid 1px rgba(0,0,0,0.1)',
                  marginBottom: '15px',
                }}
              >
                {fields.map((field, index) => (
                  <div key={field.id}>
                    <div
                      style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                        marginBottom: '10px',
                      }}
                    >
                      <Button
                        type="button"
                        onClick={() => remove(index)}
                        variant="outline"
                        size="1"
                        color="red"
                        style={{ borderRadius: '100px', padding: '6px' }}
                        title="Click to remove this row of values"
                      >
                        <IoMdRemove />
                      </Button>
                      <Controller
                        name={`list.${index}.command`}
                        control={control}
                        render={({ field }) => (
                          <TextField.Root
                            {...field}
                            size="2"
                            placeholder="String / command"
                            style={{ flexGrow: 3 }}
                            required
                          />
                        )}
                      />
                      <Controller
                        name={`list.${index}.hint`}
                        control={control}
                        render={({ field }) => (
                          <TextField.Root
                            {...field}
                            size="2"
                            placeholder="Hint"
                            style={{ flexGrow: 1 }}
                          />
                        )}
                      />
                      <Controller
                        name={`list.${index}.link`}
                        control={control}
                        render={({ field }) => (
                          <CustomCheckbox
                            {...field}
                            label="Click to turn this string into a hyperlink (_blank)"
                            icon={<BsLink45Deg />}
                            color="#9CEBED"
                          />
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Button
                type="button"
                variant="outline"
                size="2"
                style={{
                  margin: '0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
                color="gray"
                onClick={() => append({ command: '', hint: '', link: false })}
              >
                Add new row <LiaPlusSolid />
              </Button>

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
                disabled={!fields.length || !listFields?.[0]?.command || !title}
              >
                <span>Add a group of strings / commands</span>
              </Button>
              <p style={{ textAlign: 'center' }}>
                <small>
                  <a
                    onClick={e => {
                      setAdd_Dialog(false);
                      reset();
                      e.preventDefault();
                    }}
                    className="red-link"
                    href="#closeModal"
                  >
                    Cancel and close the modal
                  </a>
                </small>
              </p>
            </form>
          </Dialog>

          {/* Delete all commands */}
          <Dialog open={removeCommands_Dialog}>
            <h3 className="gradientFont1">Delete all groups of commands</h3>
            <p>
              Are you sure you want to delete all groups of commands? This
              action cannot be undone.
            </p>
            <hr />
            <div className="d-flex1" style={{ justifyContent: 'flex-end' }}>
              <Button
                size="2"
                variant="solid"
                color="red"
                onClick={() => {
                  localStorage.removeItem('commands');
                  setCommands_LS(null);
                  setRemoveCommands_Dialog(false);
                }}
              >
                Yes, delete all
              </Button>
              <Button
                size="2"
                variant="outline"
                onClick={() => {
                  setRemoveCommands_Dialog(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </Dialog>
        </div>
      </BlankWrapper>
    </>
  );
};

export default CopyCommands;
