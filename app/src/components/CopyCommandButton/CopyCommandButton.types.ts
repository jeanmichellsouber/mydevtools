export interface CopyCommandButtonProps {
  label: string;
  hint?: string;
  hidden?: boolean;
  type: 'command' | 'link';
  onClick?: () => void;
}
