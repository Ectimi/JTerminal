import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { MantineProvider, Loader } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import ErrorBoundary from './components/ErrorBoundary';
import App from './App';
import './index.css';

export const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ErrorBoundary>
        <React.Suspense
          fallback={
            <Loader
              sx={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
              }}
            />
          }
        >
          <HashRouter>
            <MantineProvider
              withNormalizeCSS
              theme={{
                globalStyles: (theme) => ({
                  div: {
                    backgroundRepeat: 'no-repeat',
                  },
                  p: { padding: 0 },
                  'table,thead,tr,td,th': {
                    color: '#fff',
                  },
                  input: {
                    caretColor: '#000',
                  },
                }),
              }}
            >
              <NotificationsProvider>
                <ModalsProvider labels={{ confirm: '确认', cancel: '取消' }}>
                  <App />
                </ModalsProvider>
              </NotificationsProvider>
            </MantineProvider>
          </HashRouter>
        </React.Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  </React.StrictMode>
);
