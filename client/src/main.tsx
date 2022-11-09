import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { MantineProvider } from '@mantine/core';
import ErrorBoundary from './components/ErrorBoundary';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <ErrorBoundary>
        <React.Suspense fallback={<div>loading</div>}>
          <HashRouter>
            <MantineProvider
              withNormalizeCSS
              theme={{
                globalStyles: (theme) => ({
                  'table,thead,tr,td,th': {
                    color: '#fff',
                  },
                  input: {
                    caretColor: '#000',
                  },
                }),
              }}
            >
              <App />
            </MantineProvider>
          </HashRouter>
        </React.Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  </React.StrictMode>
);
