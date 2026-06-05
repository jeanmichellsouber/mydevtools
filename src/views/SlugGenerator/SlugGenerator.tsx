import { Button, Flex, Radio, Text, TextField } from '@radix-ui/themes';
import { BlankWrapper } from '@/components/BlankWrapper';
import { copyToClipboard, generateSlug } from '@/utils/utils';
import { BsCopy, BsTrash } from 'react-icons/bs';
import { useState } from 'react';
import CustomTooltip from '@/components/CustomTooltip/CustomTooltip';
import { toast } from 'react-toastify/unstyled';
import { Center } from '@/components/Center';
import { Dialog } from '@/components/Dialog/Dialog';
import { RiDeleteBin7Line } from 'react-icons/ri';

const SlugGenerator = () => {
  const [inputText, setInputText] = useState<string>('');
  const [separator, setSeparator] = useState<string>('-');
  const [listOfSlugs, setListOfSlugs] = useState<string[]>(() => {
    const savedSlugs = localStorage.getItem('lastSlugs');
    return savedSlugs ? JSON.parse(savedSlugs) : [];
  });
  const [removeSlugs_Dialog, setRemoveSlugs_Dialog] = useState(false);

  const invalidInput =
    !inputText || (inputText.trim().length === 0 && inputText.length > 0);

  const arrayOfPossibilities = ['-', '_', '/', '—', '.', '+'];

  const saveListOfSlugToLocalStorage = (slugs: string[]) => {
    localStorage.setItem('lastSlugs', JSON.stringify(slugs));
  };

  return (
    <>
      <Center>
        <h1 className="gradientFont1">Slug Generator</h1>
        <p>Create slugs based on your text. Perfect for URLs and branches.</p>

        <BlankWrapper>
          <h3 className="smallerHeading">Generate your slug</h3>

          <Flex direction="column" my="6">
            <TextField.Root
              autoFocus
              size="3"
              placeholder="JIRA-000000 [Bug] A bug was found in the application"
              onChange={input => {
                setInputText(input.target.value);
              }}
            />
            <p>
              <small className="colorGray1">
                Blog posts title, Jira tickets title, etc.
              </small>
            </p>
          </Flex>

          <Flex align="start" my="6" wrap="wrap">
            {arrayOfPossibilities.map((separator, index) => (
              <Flex
                asChild
                gap="2"
                key={separator + index}
                style={{ width: '50%' }}
              >
                <Text as="label" size="3">
                  <Radio
                    disabled={invalidInput}
                    size="3"
                    name="separator"
                    value={separator}
                    defaultChecked={separator === '-'}
                    onChange={input => {
                      setSeparator(input.target.value);
                    }}
                  />
                  Use <span className="highlightedText1">{separator}</span> as
                  separator
                </Text>
              </Flex>
            ))}
          </Flex>

          <CustomTooltip content="Click to copy to your clipboard area">
            <Button
              size="3"
              variant="solid"
              color="blue"
              className="gradient1"
              style={{
                width: '100%',
                minHeight: '45px',
              }}
              disabled={invalidInput}
              onClick={() => {
                const newSlug = generateSlug(inputText, separator);
                copyToClipboard(newSlug);
                toast('Copied to clipboard!', { type: 'success' });
                const filteredSlugs = listOfSlugs.filter(
                  slug => slug !== newSlug,
                );
                const updatedSlugs = [newSlug, ...filteredSlugs];
                setListOfSlugs(updatedSlugs);
                saveListOfSlugToLocalStorage(updatedSlugs);
              }}
            >
              <span>
                {inputText && separator
                  ? generateSlug(inputText, separator)
                  : 'Generate a slug'}
              </span>
              <BsCopy />
            </Button>
          </CustomTooltip>
        </BlankWrapper>
      </Center>

      {listOfSlugs.length > 0 && (
        <Center>
          <h1 className="gradientFont1">Last used slugs</h1>
          <p>
            Your last generated slugs will be stored here for easy access. Click
            to copy to clipboard.
          </p>

          <BlankWrapper style={{ minHeight: 'auto' }}>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {listOfSlugs.map((slug, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>
                  <CustomTooltip content="Click to copy to your clipboard area">
                    <Button
                      size="3"
                      variant="outline"
                      color="gray"
                      style={{
                        width: '100%',
                        minHeight: '45px',
                      }}
                      onClick={() => {
                        copyToClipboard(slug);
                        toast('Copied to clipboard!', { type: 'success' });
                      }}
                    >
                      {slug} <BsCopy />
                    </Button>
                  </CustomTooltip>
                </li>
              ))}
            </ul>
            <Button
              size="3"
              variant="outline"
              color="red"
              style={{
                width: '100%',
                minHeight: '45px',
              }}
              onClick={() => {
                setRemoveSlugs_Dialog(true);
              }}
            >
              Clear history <BsTrash />
            </Button>
          </BlankWrapper>
        </Center>
      )}

      <Dialog open={removeSlugs_Dialog}>
        <h3 className="gradientFont1">Delete all slugs</h3>
        <p>
          Are you sure you want to delete all slugs? This action cannot be
          undone.
        </p>
        <hr />
        <div className="d-flex1" style={{ justifyContent: 'flex-end' }}>
          <Button
            size="2"
            variant="solid"
            color="red"
            onClick={() => {
              setListOfSlugs([]);
              saveListOfSlugToLocalStorage([]);
              setRemoveSlugs_Dialog(false);
            }}
          >
            <RiDeleteBin7Line /> Yes, delete all
          </Button>
          <Button
            size="2"
            variant="outline"
            color="gray"
            onClick={() => {
              setRemoveSlugs_Dialog(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default SlugGenerator;
