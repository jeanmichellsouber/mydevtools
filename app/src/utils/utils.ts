export const currentClass = (className: string): string => {
  return window.location.pathname.replace('/', '') === className
    ? 'active'
    : '';
};

export const generateSlug = (text: string, separator: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, separator)
    .replace(/^[-]+|[-]+$/g, '');
};

export const copyToClipboard = (text: string): void => {
  navigator.clipboard.writeText(text).catch(err => {
    console.error('Could not copy text: ', err);
  });
};
