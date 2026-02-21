import { createContext, useContext, useEffect, useState } from 'react';

type AppContextType = {
  contextState: {
    theme: string;
  };
  setContextState: React.Dispatch<React.SetStateAction<{ theme: string }>>;
};

const AppContext = createContext<AppContextType | null>(null);
const savedTheme = localStorage.getItem('theme');

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [contextState, setContextState] = useState({
    theme: savedTheme || 'light',
  });

  useEffect(() => {
    localStorage.setItem('theme', contextState.theme);
  }, [contextState.theme]);

  return (
    <AppContext.Provider value={{ contextState, setContextState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
