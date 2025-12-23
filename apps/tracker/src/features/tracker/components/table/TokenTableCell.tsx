import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { dotsTextOverflowStyles, CryptoIcon, stablecoinIconsMap } from '@yup/ui';

import { YieldPoolWithId } from '@shared/types/tracker';

interface TokenTableCellProps {
  data: YieldPoolWithId;
  isExpandableRow?: boolean;
}

const TokenTableCell = ({ isExpandableRow = false, data }: TokenTableCellProps) => {
  const Icon = stablecoinIconsMap?.[data.tokenSymbol.toUpperCase()] ?? CryptoIcon;

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Icon style={{ fontSize: isExpandableRow ? 18 : 24 }} />
      <Typography
        variant={isExpandableRow ? 'textSSB' : 'textMSB'}
        sx={{ ...dotsTextOverflowStyles }}
        title={data.tokenSymbol}
      >
        {data.tokenSymbol}
      </Typography>
    </Stack>
  );
};

export default TokenTableCell;
