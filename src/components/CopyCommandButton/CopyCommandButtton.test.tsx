import { render } from '@testing-library/react';
import { CopyCommandButton } from './CopyCommandButton';

describe('CopyCommandButton', () => {
  it('renders command button correctly', () => {
    // Render the component with type 'command'
    const { getByText } = render(
      <CopyCommandButton
        label="npm install"
        type="command"
        hint="Copy the command to install"
      />,
    );
    // Assert that the button is rendered with the correct label and hint
    expect(getByText('npm install')).toBeInTheDocument();
    expect(getByText('Copy the command to install')).toBeInTheDocument();
  });

  it('renders link button correctly', () => {
    // Render the component with type 'link'
    const { getByText } = render(
      <CopyCommandButton
        label="https://example.com"
        type="link"
        hint="Visit the example website"
      />,
    );

    // Assert that the link is rendered with the correct label and hint
    expect(getByText('https://example.com')).toBeInTheDocument();
    expect(getByText('Visit the example website')).toBeInTheDocument();
  });
});
