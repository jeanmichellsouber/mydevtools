export const generateSlug = (text: string, separator: string) => {
  return text
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, separator)
    .replace(/^[-]+|[-]+$/g, '');
};

export const copyToClipboard = (text: string): void => {
  navigator.clipboard.writeText(text).catch(err => {
    console.error('Could not copy text: ', err);
  });
};

export const headerHeight = 60; // Example header height in pixels
