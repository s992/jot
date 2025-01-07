import { TransportProvider } from '@connectrpc/connect-query';
import { createConnectTransport } from '@connectrpc/connect-web';
import createCache from '@emotion/cache';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TssCacheProvider } from 'tss-react';

import { Home } from './pages/Home';

const finalTransport = createConnectTransport({
  baseUrl:
    import.meta.env.VITE_JOT_PRODUCTION !== 'true'
      ? 'http://localhost:3000'
      : '/',
});
const queryClient = new QueryClient();
const cache = createCache({ key: 'tss' });
const theme = createTheme({});

export function App() {
  return (
    <TransportProvider transport={finalTransport}>
      <QueryClientProvider client={queryClient}>
        <TssCacheProvider value={cache}>
          <MantineProvider theme={theme}>
            <Home />
            <Notifications />
          </MantineProvider>
        </TssCacheProvider>
      </QueryClientProvider>
    </TransportProvider>
  );
}
