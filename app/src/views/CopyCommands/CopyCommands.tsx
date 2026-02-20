import { BsLink45Deg, BsTerminal } from 'react-icons/bs';
import { BlankWrapper } from '@/components/BlankWrapper';
import { ManagementButton } from '@/components/ManagementButton';
import {
  PiArrowsDownUpLight,
  PiDownloadSimple,
  PiUploadSimple,
} from 'react-icons/pi';
import { RiDeleteBin7Line } from 'react-icons/ri';
import * as Accordion from '@radix-ui/react-accordion';
import { AccordionUnity } from '@/components/AccordionUnity';
import { CopyCommandButton } from '@/components/CopyCommandButton';
import { Dialog } from '@/components/Dialog';
import { useState } from 'react';
import { Button, Flex, Radio, Text, TextField } from '@radix-ui/themes';
import { CustomCheckbox } from '@/components/CustomCheckbox';
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
import { generateSlug } from '@/utils/utils';
import { MdInfoOutline } from 'react-icons/md';
import { LuFileJson2 } from 'react-icons/lu';
import { toast } from 'react-toastify/unstyled';
import { ReactSortable } from 'react-sortablejs';
import { Center } from '@/components/Center';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/src/index.js';

// ZOD schemas

export const commandsSchema = z.object({
  title: z.string().min(1, 'Group title is required'),
  id: z.string().min(1, 'ID is required'),
  list: z
    .array(
      z.object({
        command: z.string().min(1, 'Command / string is required'),
        hint: z.string(), // not required
        link: z.boolean(),
      }),
    )
    .min(1, 'At least one command is required'),
});

// type definitions

type CommandsValues = z.infer<typeof commandsSchema>;

type ImportExportValues = {
  appendOrReplace: 'append' | 'replace';
  file: File | null;
};

const CopyCommands = () => {
  // definitions of states and functions related to the management of groups of commands
  const [commands_LS, setCommands_LS] = useState(
    JSON.parse(localStorage.getItem('commands') || 'null'),
  );
  const [add_edit_dialog, setAdd_edit_dialog] = useState<{
    visible: boolean;
    upsert: string | null;
  }>({ visible: false, upsert: null });
  const [removeCommands_Dialog, setRemoveCommands_Dialog] =
    useState<boolean>(false);
  const [removeCommand_Dialog, setRemoveCommand_Dialog] = useState<{
    open: boolean;
    id: string | null;
  }>({
    open: false,
    id: null,
  });
  const [importExport_Dialog, setImportExport_Dialog] =
    useState<boolean>(false);
  const [info_Dialog, setInfo_Dialog] = useState<boolean>(false);
  const [importExportFile, setImportExportFile] = useState<File | null>(null);

  // functions related to the creation of groups of commands

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors, isValid },
  } = useForm<CommandsValues>({
    resolver: zodResolver(commandsSchema),
    mode: 'onChange',
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
  // const listFields = useWatch({ control, name: 'list' });

  const onSubmit: SubmitHandler<CommandsValues> = data => {
    if (add_edit_dialog.upsert === 'edit') {
      const newCommands = commands_LS.map((group: { id: string }) =>
        group.id === data.id ? data : group,
      );
      localStorage.setItem('commands', JSON.stringify(newCommands));
      setCommands_LS(newCommands);
      setAdd_edit_dialog({ visible: false, upsert: null });
      reset({ list: [] });
      toast('Group of commands edited successfully!', { type: 'success' });
    } else {
      const newCommands = [...(commands_LS || []), data];
      localStorage.setItem('commands', JSON.stringify(newCommands));
      setCommands_LS(newCommands);
      setAdd_edit_dialog({ visible: false, upsert: null });
      reset({ list: [] });
      toast(
        'Group of commands added successfully to the end of the current list.',
        { type: 'success' },
      );
    }
  };

  // functions related to the listing of groups of commands

  const deleteSpecificFn = (id: string) => {
    setRemoveCommand_Dialog({ open: true, id });
  };

  const deleteAllFn = () => {
    localStorage.removeItem('commands');
    setCommands_LS(null);
    setRemoveCommands_Dialog(false);
    toast('All groups of commands deleted successfully!', { type: 'success' });
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
      toast('Group of commands duplicated successfully!', { type: 'success' });
    }
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
    setImportExport_Dialog(false);
    toast('Data exported successfully!', { type: 'success' });
  };

  const importData = (file: File, appendOrReplace: 'append' | 'replace') => {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const importedCommands = JSON.parse(e.target?.result as string);
        if (
          Array.isArray(importedCommands) &&
          importedCommands.every(
            (cmd): cmd is CommandsValues =>
              typeof cmd.title === 'string' &&
              typeof cmd.id === 'string' &&
              Array.isArray(cmd.list),
          )
        ) {
          const importedCommandsWithNewIds = importedCommands.map(
            (group: CommandsValues) => ({
              ...group,
              id: `${generateSlug(group.title, '-')}-${Date.now()}`,
            }),
          );
          const newCommands =
            appendOrReplace === 'append'
              ? [...(commands_LS || []), ...importedCommandsWithNewIds]
              : importedCommandsWithNewIds;
          localStorage.setItem('commands', JSON.stringify(newCommands));
          setCommands_LS(newCommands);
          toast.success(
            `Data ${appendOrReplace === 'append' ? 'appended' : 'replaced'} successfully!`,
          );
        } else {
          toast.error(
            `Error importing data (${importExportFile?.name}): Invalid file structure.`,
          ); // Show toast error
        }
      } catch (error) {
        console.log('Error reading file:', error);
        toast.error(
          'Error reading file. Please make sure it is a valid JSON file.',
        ); // Show toast error
      }
    };
    reader.readAsText(file);

    setImportExport_Dialog(false);
    setImportExportFile(null);
    resetImportExport();
  };

  // functions related to the management of the Import Export Dialog

  const {
    control: controlImportExport,
    handleSubmit: handleSubmitImportExport,
    reset: resetImportExport,
  } = useForm<ImportExportValues>({
    defaultValues: {
      appendOrReplace: 'append',
      file: null,
    },
  });

  const onSubmitImportExport: SubmitHandler<ImportExportValues> = data => {
    importData(data.file as File, data.appendOrReplace);
  };

  // functions related to the editing of groups of commands

  const editSpecificFn = (id: string) => {
    const groupToEdit = commands_LS.find(
      (group: { id: string }) => group.id === id,
    );
    if (groupToEdit) {
      reset(groupToEdit);
      setAdd_edit_dialog({ visible: true, upsert: 'edit' });
    }
  };

  // useeffects

  return (
    <>
      <Center>
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
                setAdd_edit_dialog({ visible: true, upsert: 'add' });
              }}
              title="Click to add a new group of commands at the end of the current list of groups."
            />
            <ManagementButton
              label={`Delete all groups (${commands_LS ? commands_LS?.length : 0})`}
              icon={<RiDeleteBin7Line />}
              color="#DA3F3F"
              onClick={() => {
                setRemoveCommands_Dialog(true);
              }}
              disabled={!commands_LS || commands_LS.length === 0}
              title="Click to delete all groups of commands at once."
            />
            <ManagementButton
              label="Import / Export"
              icon={<PiArrowsDownUpLight />}
              color="#195F72"
              onClick={() => {
                setImportExport_Dialog(true);
              }}
              title="Click to import or export groups of commands. Data is in JSON format."
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
                  <small>Right click over the header for actions.</small>
                </div>

                <Accordion.Root type="single" collapsible>
                  <ReactSortable
                    list={commands_LS}
                    setList={newList => {
                      setCommands_LS(newList);
                      localStorage.setItem('commands', JSON.stringify(newList));
                    }}
                    onSort={() => {
                      toast('New sorting of groups saved.', {
                        type: 'success',
                      });
                    }}
                    handle=".draggable-handle"
                  >
                    {commands_LS.map((group: CommandsValues) => (
                      <AccordionUnity
                        id={group.id}
                        key={group?.id}
                        headerTitle={group.title}
                        value={`group-${group.id}`}
                        deleteSpecificFn={deleteSpecificFn}
                        duplicateFn={duplicateFn}
                        editSpecificFn={editSpecificFn}
                      >
                        {group?.list?.map(
                          (item: CommandsValues['list'][number]) => (
                            <CopyCommandButton
                              key={item.command + Date.now() + Math.random()}
                              label={item.command}
                              type={item.link ? 'link' : 'command'}
                              hint={item.hint}
                            />
                          ),
                        )}
                      </AccordionUnity>
                    ))}
                  </ReactSortable>
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
            {/* add or edit new groups of commands */}
            <Dialog open={add_edit_dialog.visible} size="large">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h3 className="gradientFont1">
                  {add_edit_dialog.upsert === 'add' ? 'Add' : 'Edit'} a group of
                  commands / strings
                </h3>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <>
                      <TextField.Root
                        {...field}
                        autoFocus
                        size="3"
                        placeholder="Group title"
                        onBlur={e => {
                          field.onChange(e.target.value);
                          if (add_edit_dialog.upsert === 'add') {
                            setValue(
                              'id',
                              `${generateSlug(title || 'group', '-')}-${Date.now()}`,
                            );
                          }
                        }}
                        data-error={errors.title ? 'true' : 'false'}
                      />
                      {errors.title && (
                        <p className="colorRed1">
                          <small>{errors.title.message}</small>
                        </p>
                      )}
                    </>
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
                  {fields.map((field, index) => {
                    const linkValue = getValues(`list.${index}.link`);
                    return (
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
                            size="2"
                            color="red"
                            style={{ borderRadius: '100px', padding: '9px' }}
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
                                size="3"
                                placeholder={
                                  linkValue ? 'https://' : 'Command / String'
                                }
                                style={{
                                  flexGrow: 3,
                                  color: linkValue
                                    ? 'rgb(56, 163, 165)'
                                    : 'inherit',
                                  textDecoration: linkValue
                                    ? 'underline'
                                    : 'none',
                                }}
                                data-error={
                                  errors.list?.[index]?.command
                                    ? 'true'
                                    : 'false'
                                }
                              />
                            )}
                          />
                          <Controller
                            name={`list.${index}.hint`}
                            control={control}
                            render={({ field }) => (
                              <TextField.Root
                                {...field}
                                size="3"
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
                                checked={field.value}
                              />
                            )}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="3"
                  style={{
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                  color="cyan"
                  onClick={() => append({ command: '', hint: '', link: false })}
                >
                  <LiaPlusSolid /> Add new row{' '}
                  <small>(new string / command)</small>
                </Button>

                <hr />
                <Button
                  size="3"
                  variant="solid"
                  color="cyan"
                  className="gradient1"
                  style={{
                    width: '100%',
                    minHeight: '45px',
                  }}
                  disabled={
                    // !fields.length || !listFields?.[0]?.command || !title
                    !isValid
                  }
                >
                  <span>Save group of strings / commands</span>
                </Button>
                <p style={{ textAlign: 'center' }}>
                  <small>
                    <a
                      onClick={e => {
                        setAdd_edit_dialog({ visible: false, upsert: null });
                        reset({ list: [] });
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
                  (group: { id: string }) =>
                    group.id === removeCommand_Dialog.id,
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
                    localStorage.setItem(
                      'commands',
                      JSON.stringify(newCommands),
                    );
                    setCommands_LS(newCommands);
                    setRemoveCommand_Dialog({ open: false, id: null });
                    toast(
                      `Group of commands ${
                        commands_LS?.find(
                          (group: { id: string }) =>
                            group.id === removeCommand_Dialog.id,
                        )?.title || ''
                      } deleted successfully!`,
                      {
                        type: 'success',
                      },
                    );
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
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                    }}
                  >
                    <p>
                      Export a file <span className="colorGreen1">(.json)</span>{' '}
                      containing the list of commands, to import in another
                      browser.
                    </p>

                    {/* <p>
                      <small>
                        {commands_LS
                          ? commands_LS
                              .map((group: { title: string }) => group.title)
                              .join(', ')
                          : 0}{' '}
                        group(s) available
                      </small>
                    </p> */}

                    <Button
                      className="gradient1"
                      style={{
                        display: 'flex',
                        width: '100%',
                      }}
                      disabled={!commands_LS || commands_LS.length === 0}
                      onClick={() => {
                        exportData();
                      }}
                    >
                      Export all data{' '}
                      <small>
                        {commands_LS ? commands_LS.length : 0} group(s)
                      </small>{' '}
                      <PiDownloadSimple />
                    </Button>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <form
                    onSubmit={handleSubmitImportExport(onSubmitImportExport)}
                  >
                    <p>
                      Import a file <span className="colorGreen1">(.json)</span>{' '}
                      containing a list of strings / commands.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                      <Flex asChild gap="2" style={{ width: '50%' }}>
                        <Text as="label" size="3">
                          <Controller
                            control={controlImportExport}
                            name="appendOrReplace"
                            render={({ field }) => (
                              <Radio
                                {...field}
                                size="2"
                                name="importExportOption"
                                value="append"
                                defaultChecked
                              />
                            )}
                          />
                          Append data
                        </Text>
                      </Flex>
                      <Flex asChild gap="2" style={{ width: '50%' }}>
                        <Text as="label" size="3">
                          <Controller
                            control={controlImportExport}
                            name="appendOrReplace"
                            render={({ field }) => (
                              <Radio
                                {...field}
                                size="2"
                                name="importExportOption"
                                value="replace"
                              />
                            )}
                          />
                          Replace data
                        </Text>
                      </Flex>
                    </div>
                    <Controller
                      name="file"
                      control={controlImportExport}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <label style={{ display: 'block' }}>
                          <input
                            type="file"
                            accept=".json"
                            required
                            style={{
                              width: '0.1px',
                              height: '0.1px',
                              opacity: 0,
                              overflow: 'hidden',
                              position: 'absolute',
                              zIndex: -1,
                            }}
                            onClick={(
                              e: React.MouseEvent<HTMLInputElement>,
                            ) => {
                              e.currentTarget.value = '';
                            }}
                            onChange={e => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setImportExportFile(file);
                                field.onChange(file);
                              }
                            }}
                          />

                          <p className="dashed-style">
                            {importExportFile
                              ? importExportFile.name
                              : 'Select a .json file'}{' '}
                            <LuFileJson2 className="colorGreen1" />
                          </p>
                        </label>
                      )}
                    />
                    <Button
                      size="2"
                      // variant="outline"
                      disabled={!importExportFile}
                      style={{
                        marginTop: '10px',
                        display: 'flex',
                        width: '100%',
                      }}
                    >
                      Import data <PiUploadSimple />
                    </Button>
                  </form>
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
              <h3 className="gradientFont1">About Copy Commands</h3>
              <p>
                This tool allows you to create and manage lists of strings or
                commands that you can easily copy to your clipboard by
                left-clicking on them. You can organize these strings into
                groups, making it easier to find and use them when needed.
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
      </Center>
    </>
  );
};

export default CopyCommands;
