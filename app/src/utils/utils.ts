export const currentClass = (className: string): string => {
  return window.location.pathname.replace('/', '') === className
    ? 'active'
    : '';
};
