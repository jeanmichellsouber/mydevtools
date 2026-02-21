export interface ManagementButtonProps {
  label: string;
  icon?: React.ReactNode;
  color: string;
  disabled?: boolean;
  onClick?: () => void;
  title?: string;
}
