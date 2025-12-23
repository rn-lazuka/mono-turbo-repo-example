import '@rainbow-me/rainbowkit/styles.css';
import type { ReactNode } from 'react';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, sepolia } from 'wagmi/chains';

// Get projectId from WalletConnect Cloud
// TODO: move to enum
const projectId = '0873faf1ea41138f15fe8a62d8e08d99';

const chains = [mainnet, sepolia, polygon, optimism, arbitrum, base] as const;

const config = getDefaultConfig({
  appName: 'YieldUp',
  projectId,
  chains,
  ssr: false,
});
const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  console.log('render');
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
