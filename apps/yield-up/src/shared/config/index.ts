import commonConfig from './common.json';
import dev from './dev.json';
import { EnvConfig } from '@shared/types/config';

const isProduction = import.meta.env.PROD;

// Accepting React env vars and aggregating them into `config` object.
const envVarNames = ['VITE_BASE_URL', 'VITE_API_URL'];

const envVars = envVarNames.reduce((mem: any, n) => {
  // Remove the `VITE_` prefix
  if (import.meta.env[n] !== undefined) mem[n.slice(5)] = import.meta.env[n];
  return mem;
}, {});

const config: EnvConfig = {
  ...commonConfig,
  ...(isProduction ? {} : dev),
  isProduction,
  ...envVars,
};

export default config;
