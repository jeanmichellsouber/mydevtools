import { Button, Flex, Radio, Text, TextField } from '@radix-ui/themes';
import { BlankWrapper } from '../../components/BlankWrapper';
import { copyToClipboard, generateSlug } from '../../utils/utils';
import { BsCopy } from 'react-icons/bs';
import { useState } from 'react';

const SlugGenerator = () => {
  const [inputText, setInputText] = useState<string>('');
  const [separator, setSeparator] = useState<string>('-');

  const invalidInput =
    !inputText || (inputText.trim().length === 0 && inputText.length > 0);

  const arrayOfPossibilities = ['-', '_', '/', '—', '.', '+'];

  return (
    <>
      <h1 className="gradientFont1">Slug Generator</h1>
      <p>Create slugs based on your text. Perfect for URLs, branches, etc.</p>

      <BlankWrapper>
        <h3 className="smallerHeading">Generator</h3>

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

        <Flex align="start" direction="column" gap="2" my="6">
          {arrayOfPossibilities.map((separator, index) => (
            <Flex asChild gap="2" key={separator + index}>
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
                Use <span className="colorGreen1">( {separator} )</span> as
                separator
              </Text>
            </Flex>
          ))}
        </Flex>

        <Button
          size="3"
          variant="solid"
          color="blue"
          className="gradient1"
          style={{ width: '100%' }}
          disabled={invalidInput}
          onClick={() => {
            copyToClipboard(generateSlug(inputText, separator));
          }}
        >
          <span>
            {inputText && separator
              ? generateSlug(inputText, separator)
              : 'Generate a slug'}
          </span>
          <BsCopy />
        </Button>
      </BlankWrapper>
    </>
  );
};

export default SlugGenerator;
