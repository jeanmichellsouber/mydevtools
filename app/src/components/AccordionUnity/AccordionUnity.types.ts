export interface AccordionUnityProps {
  children: React.ReactNode;
  headerTitle: string;
  value: string;
  id: string;
  deleteFn: (id: string) => void;
}
