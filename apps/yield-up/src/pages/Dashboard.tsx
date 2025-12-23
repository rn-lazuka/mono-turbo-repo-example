import { useState, type MouseEvent } from 'react';

import Box from '@mui/material/Box';
import { BaseIcon, EthereumIcon, ButtonTabsGroup } from '@yup/ui';

import BalanceDashboard from '@features/dashboard/components/BalanceDashboard.tsx';
import PortfolioDashboard from '@features/dashboard/components/PortfolioDashboard.tsx';
import { Networks } from '@shared/enums/common.ts';

const Dashboard = () => {
  const [network, setNetwork] = useState(Networks.Ethereum);

  const handleChangeNetwork = (_: MouseEvent<HTMLElement>, newNetwork: Networks) => {
    setNetwork(newNetwork);
  };
  const networks = [
    { name: Networks.Ethereum, icon: EthereumIcon },
    { name: Networks.Base, icon: BaseIcon },
  ];

  return (
    <Box component="main" sx={{ py: { xs: 2, sm: 3 } }} display="flex" flexDirection="column">
      <BalanceDashboard network={network} />
      <ButtonTabsGroup<Networks>
        handleChange={handleChangeNetwork}
        items={networks}
        value={network}
        sx={{ my: 2 }}
      />
      <PortfolioDashboard />
    </Box>
  );
};

export default Dashboard;
