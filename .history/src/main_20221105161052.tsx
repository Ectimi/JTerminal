import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { MantineProvider } from '@mantine/core';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <HashRouter>
        <MantineProvider withNormalizeCSS theme={{
          globalStyles:(theme)=>({
            'table,thead,tr,td,th':{
              color:'#fff'
            }
          })
        }}>
          <App />
        </MantineProvider>
      </HashRouter>
    </RecoilRoot>
  </React.StrictMode>
);
