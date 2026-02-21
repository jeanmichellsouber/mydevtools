import { render } from '@testing-library/react';
import { Center } from './Center';

describe('Center', () => {
  it('renders children correctly', () => {
    // Render the Center component with some child content
    const { getByText } = render(
      <Center>
        <div>Test Content</div>
      </Center>,
    );

    // Assert that the child content is rendered
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('applies centering styles', () => {
    // Render the Center component
    const { container } = render(
      <Center>
        <div>Test Content</div>
      </Center>,
    );

    // Get the center element
    const centerElement = container.firstChild;

    // Assert that the center element has the correct styles for centering
    expect(centerElement).toHaveStyle('margin: 0 auto');
  });
});
