import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';
import store from './app/store';
import './styles.scss';
import { theme } from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme} defaultColorScheme="auto">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MantineProvider>
    </Provider>
  </StrictMode>,
);
