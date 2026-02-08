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
import { MdInfoOutline } from 'react-icons/md';
import { GrDownload } from 'react-icons/gr';

const CopyCommands = () => {
  const [commands_LS, setCommands_LS] = useState(
    JSON.parse(localStorage.getItem('commands') || 'null'),
  );

  const [add_Dialog, setAdd_Dialog] = useState<boolean>(false);

  const [removeCommands_Dialog, setRemoveCommands_Dialog] =
    useState<boolean>(false);

  const [removeCommand_Dialog, setRemoveCommand_Dialog] = useState<{
    open: boolean;
    id: string | null;
  }>({
    open: false,
    id: null,
  });

  const [editCommand_Dialog, setEditCommand_Dialog] = useState<{
    open: boolean;
    id: string | null;
  }>({
    open: false,
    id: null,
  });

  const [importExport_Dialog, setImportExport_Dialog] =
    useState<boolean>(false);

  const [info_Dialog, setInfo_Dialog] = useState<boolean>(false);

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

  const deleteSpecificFn = (id: string) => {
    setRemoveCommand_Dialog({ open: true, id });
  };

  const deleteAllFn = () => {
    localStorage.removeItem('commands');
    setCommands_LS(null);
    setRemoveCommands_Dialog(false);
  };

  const duplicateFn = (id: string) => {
    const groupToDuplicate = commands_LS.find(
      (group: { id: string }) => group.id === id,
    );
    if (groupToDuplicate) {
      const newGroup = {
        ...groupToDuplicate,
        id: `${generateSlug(groupToDuplicate.title, '-')}-${Date.now()}`,
        title: `${groupToDuplicate.title} (copy)`,
      };
      const newCommands = [...(commands_LS || []), newGroup];
      localStorage.setItem('commands', JSON.stringify(newCommands));
      setCommands_LS(newCommands);
    }
  };

  const editSpecificFn = (id: string) => {
    alert(`Edit group with id: ${id}`);
  };

  const exportData = () => {
    if (!commands_LS || commands_LS.length === 0) return;

    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(commands_LS));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'copycommands.json');
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <>
      <h1
        className="gradientFont1"
        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        Copy Commands{' '}
        <MdInfoOutline
          size="24"
          role="button"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setInfo_Dialog(true);
          }}
        />
      </h1>
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
              setImportExport_Dialog(true);
            }}
          />
        </div>
        <hr />
        <div>
          {commands_LS ? (
            <>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}
              >
                <h3 className="smallerHeading">Listing</h3>
                <small
                  style={{
                    // margin: '-7px 0 10px 0',
                    display: 'block',
                    fontSize: '13px',
                    color: 'rgba(0,0,0,0.5)',
                  }}
                >
                  Right click over the header for actions.
                </small>
              </div>
              <Accordion.Root type="single" collapsible>
                {commands_LS.map((group: FormValues) => (
                  <AccordionUnity
                    id={group.id}
                    key={group?.id}
                    headerTitle={group.title}
                    value={`group-${group.id}`}
                    deleteSpecificFn={deleteSpecificFn}
                    duplicateFn={duplicateFn}
                    editSpecificFn={editSpecificFn}
                  >
                    {group.list.map((item: FormValues['list'][number]) => (
                      <CopyCommandButton
                        label={item.command}
                        type={item.link ? 'link' : 'command'}
                        hint={item.hint}
                      />
                    ))}
                  </AccordionUnity>
                ))}
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
                <LiaPlusSolid /> Add new row{' '}
                <small>(new string / command)</small>
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
                <span>Save group of strings / commands</span>
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
                  deleteAllFn();
                }}
              >
                <RiDeleteBin7Line /> Yes, delete all
              </Button>
              <Button
                size="2"
                variant="outline"
                color="gray"
                onClick={() => {
                  setRemoveCommands_Dialog(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </Dialog>

          {/* Delete specific group of commands */}
          <Dialog open={removeCommand_Dialog.open}>
            <h3 className="gradientFont1">
              Delete "
              {commands_LS?.find(
                (group: { id: string }) => group.id === removeCommand_Dialog.id,
              )?.title || 'group of commands'}
              "
            </h3>
            <p>
              Are you sure you want to delete this group of commands? This
              action cannot be undone.
            </p>
            <hr />
            <div className="d-flex1" style={{ justifyContent: 'flex-end' }}>
              <Button
                size="2"
                variant="solid"
                color="red"
                onClick={() => {
                  const newCommands = commands_LS.filter(
                    (group: { id: string }) =>
                      group.id !== removeCommand_Dialog.id,
                  );
                  localStorage.setItem('commands', JSON.stringify(newCommands));
                  setCommands_LS(newCommands);

                  setRemoveCommand_Dialog({ open: false, id: null });
                }}
              >
                <RiDeleteBin7Line /> Yes, delete it
              </Button>
              <Button
                size="2"
                variant="outline"
                color="gray"
                onClick={() => {
                  setRemoveCommand_Dialog({ open: false, id: null });
                }}
              >
                Cancel
              </Button>
            </div>
          </Dialog>

          {/* Import Export Dialog */}
          <Dialog size="large" open={importExport_Dialog}>
            <h3 className="gradientFont1">Import / Export</h3>
            <div style={{ display: 'flex', gap: '40px' }}>
              <div style={{ flex: 1 }}>
                <p>
                  Export a file <span className="colorGreen1">(.json)</span>{' '}
                  containing the list of commands, to import in another browser.
                </p>

                <Button
                  color="blue"
                  variant="outline"
                  style={{ display: 'block', width: '100%', margin: '10px 0' }}
                  disabled={!commands_LS || commands_LS.length === 0}
                  onClick={() => {
                    exportData();
                  }}
                >
                  Export all data{' '}
                  <small style={{ margin: '0 5px' }}>
                    {commands_LS ? commands_LS.length : 0} group(s)
                  </small>{' '}
                  <GrDownload />
                </Button>
              </div>
              <div style={{ flex: 1 }}>
                <p>
                  Import a file <span className="colorGreen1">(.json)</span>{' '}
                  containing a list of commands to add to your current commands.
                </p>
              </div>
            </div>
            <hr />
            <div className="d-flex1" style={{ justifyContent: 'flex-end' }}>
              <Button
                size="2"
                variant="outline"
                color="gray"
                onClick={() => {
                  setImportExport_Dialog(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </Dialog>

          {/* Info Dialog */}
          <Dialog open={info_Dialog}>
            <h3 className="gradientFont1">Information</h3>
            <p>
              This tool allows you to create and manage lists of strings or
              commands that you can easily copy to your clipboard by
              left-clicking on them. You can organize these strings into groups,
              making it easier to find and use them when needed.
            </p>
            <hr />
            <div className="d-flex1" style={{ justifyContent: 'flex-end' }}>
              <Button
                size="2"
                variant="outline"
                color="gray"
                onClick={() => {
                  setInfo_Dialog(false);
                }}
              >
                Close
              </Button>
            </div>
          </Dialog>
        </div>
      </BlankWrapper>
    </>
  );
};

export default CopyCommands;
