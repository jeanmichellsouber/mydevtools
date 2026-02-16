export interface CustomSelectboxProps {
  options: { label: string; value: string; selected: boolean }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
