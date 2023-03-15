import React from 'react';
import './index.scss';
import App from './components/app/App';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <StyledEngineProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
