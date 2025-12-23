import { EthereumIcon, DAIIcon, FRAXIcon, USDCIcon, USDTIcon } from '@yup/ui';

import { Networks, Strategies } from '@shared/enums/common';

export const tokenBalanceRows = [
  {
    token: 'USDC',
    icon: USDCIcon,
  },
  {
    token: 'USDT',
    icon: USDTIcon,
  },
  {
    token: 'DAI',
    icon: DAIIcon,
  },
  {
    token: 'FRAX',
    icon: FRAXIcon,
  },
] as const;

export const portfolioRows = [
  {
    token: 'USDC',
    icon: USDCIcon,
    value: '500.00',
    earning: '10.42',
    apy: '6.02',
    networkIcon: EthereumIcon,
  },
  {
    token: 'USDT',
    icon: USDTIcon,
    value: '700.00',
    earning: '15.21',
    apy: '9.82',
    networkIcon: EthereumIcon,
  },
] as const;

export const balanceChartData = [
  { id: 0, value: 20, label: 'Aave' },
  { id: 1, value: 40, label: 'Compound' },
  { id: 2, value: 40, label: 'Minterest' },
];

export const allocationChartData = [
  { id: 0, value: 60, label: Strategies.Aggressive },
  { id: 1, value: 27, label: Strategies.Conservative },
  { id: 2, value: 13, label: Strategies.Balanced },
];

export const earningsChartData = [
  { month: 'Start', value: 91 },
  { month: 'Jun', value: 150 },
  { month: 'Jul', value: 230 },
  { month: 'Aug', value: 320 },
  { month: 'Sep', value: 420 },
  { month: 'Oct', value: 540 },
  { month: 'Nov', value: 670 },
  { month: 'Dec', value: 810 },
  { month: 'Jan', value: 970 },
  { month: 'Feb', value: 1150 },
  { month: 'Mar', value: 1340 },
  { month: 'Apr', value: 1550 },
  { month: 'May', value: 1780 },
];

export const performanceChartData = [
  { data: '2025-05-02', value: 2023 },
  { data: '2025-05-03', value: 2032 },
  { data: '2025-05-04', value: 2040 },
  { data: '2025-05-05', value: 2049 },
  { data: '2025-05-06', value: 2057 },
  { data: '2025-05-07', value: 2067 },
  { data: '2025-05-08', value: 2076 },
  { data: '2025-05-09', value: 2088 },
];

export const transactionAmountPercents = [
  { name: '25%', value: 25 },
  { name: '50%', value: 50 },
  { name: '75%', value: 75 },
  { name: '100%', value: 100 },
];

export const mainAssetData = {
  apy: 13.01,
  value: 1068.22,
  earned: 156.12,
};

export const strategyAllocationData = [
  {
    id: 1,
    strategy: Strategies.Conservative,
    apy: 15.99,
    deposit: 1250.0,
    value: 1291.0,
    earned: 41.0,
    allocation: [
      { label: 'Aave', value: 20 },
      { label: 'Compound', value: 30 },
      { label: 'Minterest', value: 50 },
    ],
  },
  {
    id: 2,
    strategy: Strategies.Aggressive,
    apy: 6.04,
    deposit: 312.0,
    value: 314.21,
    earned: 2.21,
    allocation: [
      { label: 'Aave', value: 35 },
      { label: 'Compound', value: 35 },
      { label: 'Minterest', value: 20 },
    ],
  },
  {
    id: 3,
    strategy: Strategies.Balanced,
    apy: 10.02,
    deposit: 468.75,
    value: 470.81,
    earned: 2.06,
    allocation: [
      { label: 'Aave', value: 30 },
      { label: 'Compound', value: 30 },
      { label: 'Minterest', value: 40 },
    ],
  },
];

export const activityData = [
  {
    value: 62.64,
    token: 'USDT',
    strategy: Strategies.Conservative,
    type: 'withdraw',
    network: Networks.Ethereum,
    date: 'May 13, 2025 4:05 PM',
    gasFees: '$2',
  },
  {
    value: 125.0,
    token: 'USDT',
    strategy: Strategies.Balanced,
    type: 'deposit',
    network: Networks.Base,
    date: 'May 13, 2025 4:05 PM',
    gasFees: '$2',
  },
  {
    value: 1250.0,
    token: 'USDC',
    strategy: Strategies.Aggressive,
    type: 'deposit',
    network: Networks.Ethereum,
    date: 'May 13, 2025 4:05 PM',
    gasFees: '$2',
  },
  {
    value: 400.0,
    token: 'FRAX',
    strategy: Strategies.Conservative,
    type: 'deposit',
    network: Networks.Ethereum,
    date: 'May 13, 2025 4:05 PM',
    gasFees: '$2',
  },
  {
    value: 250,
    token: 'USDT',
    strategy: Strategies.Aggressive,
    type: 'deposit',
    network: Networks.Base,
    date: 'May 13, 2025 4:05 PM',
    gasFees: '$2',
  },
] as const;
