import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Theme } from '@radix-ui/themes/dist/cjs/components/index.js';
import '@radix-ui/themes/styles.css';
import './sass/index.scss';
import './sass/customTheme.scss';
import { HashRouter } from 'react-router-dom';
import { AppProvider } from './providers/AppProvider/AppProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <Theme accentColor="blue">
        <HashRouter>
          <App />
        </HashRouter>
      </Theme>
    </AppProvider>
  </StrictMode>,
);
