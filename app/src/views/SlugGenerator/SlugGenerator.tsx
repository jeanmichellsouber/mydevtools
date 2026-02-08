import { Button, Flex, Radio, Text, TextField } from '@radix-ui/themes';
import { BlankWrapper } from '../../components/BlankWrapper';
import { copyToClipboard, generateSlug } from '../../utils/utils';
import { BsCopy } from 'react-icons/bs';
import { useState } from 'react';
import CustomTooltip from '../../components/CustomTooltip/CustomTooltip';
import { toast } from 'react-toastify/unstyled';

const SlugGenerator = () => {
  const [inputText, setInputText] = useState<string>('');
  const [separator, setSeparator] = useState<string>('-');

  const invalidInput =
    !inputText || (inputText.trim().length === 0 && inputText.length > 0);

  const arrayOfPossibilities = ['-', '_', '/', '—', '.', '+'];

  return (
    <>
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
                  name="example"
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
            }}
            disabled={invalidInput}
            onClick={() => {
              copyToClipboard(generateSlug(inputText, separator));
              toast('Copied to clipboard!', { type: 'success' });
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
    </>
  );
};

export default SlugGenerator;
