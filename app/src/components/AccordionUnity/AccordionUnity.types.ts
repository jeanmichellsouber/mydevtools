export interface AccordionUnityProps {
  children: React.ReactNode;
  headerTitle: string;
  value: string;
  actions?: Array<{ label: string; action: () => void; color: string }>;
}
