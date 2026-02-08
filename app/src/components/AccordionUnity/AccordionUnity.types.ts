export interface AccordionUnityProps {
  children: React.ReactNode;
  headerTitle: string;
  value: string;
  id: string;
  deleteSpecificFn: (id: string) => void;
  duplicateFn: (id: string) => void;
  editSpecificFn: (id: string) => void;
}
