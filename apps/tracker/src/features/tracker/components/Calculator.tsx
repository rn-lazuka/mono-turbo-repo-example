import { type ChangeEvent, useEffect, useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {
  arrayToOptions,
  InputLabelBox,
  MultiSelectPopover,
  RoundChainIcon,
  CoinsIcon,
  CryptoIcon,
  PercentIcon,
  chainsIconsMap,
  stablecoinIconsMap,
  type MultiSelectPopoverOption,
} from '@yup/ui';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';

import { defaultCalculatorValue } from '@shared/constants/tracker';
import { logEvent } from '@shared/lib/analytics/googleAnalitics';
import { YieldPoolRowTableData, YieldPoolWithId } from '@shared/types/tracker';
import { useGetYieldFiltersQuery, useGetYieldPoolsQuery } from '@store/api/trackerApi';

const Calculator = () => {
  const { t } = useTranslation('tracker');
  const [amount, setAmount] = useState(defaultCalculatorValue);
  const { data } = useGetYieldFiltersQuery();
  const { data: poolsData } = useGetYieldPoolsQuery();
  const stablecoinOptions = arrayToOptions(data?.tokenSymbols, stablecoinIconsMap, CryptoIcon);
  const chainOptions = arrayToOptions(data?.chainNames, chainsIconsMap, RoundChainIcon);
  const [selectedCoin, setSelectedCoin] = useState<MultiSelectPopoverOption | undefined>();
  const [selectedChain, setSelectedChain] = useState<MultiSelectPopoverOption | undefined>();

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value.replace(/[$,.]/g, ''));
    logEvent('Calculator', 'calculator_amount_change', event.target.value);
  };

  const handleEmptyBlur = () => {
    if (amount === '') setAmount(defaultCalculatorValue);
  };

  const getAllPoolsFlattened = (pools: YieldPoolRowTableData[]): YieldPoolWithId[] => {
    return pools.flatMap((pool) => {
      return [pool, ...(pool.breakdown ?? [])];
    });
  };

  const handleSelectStablecoin = (coins: string[]) => {
    const selected = stablecoinOptions.find(
      (stablecoinOption) => stablecoinOption.name === coins[0]
    );
    if (!selected) return;

    setSelectedCoin(selected);
    logEvent('Calculator', 'calculator_token_select', selected.name);

    setSelectedChain(undefined);

    if (poolsData?.pools?.length) {
      const allPools = getAllPoolsFlattened(poolsData.pools);
      const poolsForToken = allPools.filter((pool) => pool.tokenSymbol === selected.name);

      if (poolsForToken.length === 0) return;

      const bestForToken = poolsForToken.reduce(
        (best, curr) => (curr.apy > best.apy ? curr : best),
        poolsForToken[0]
      );

      const bestChain = chainOptions.find((opt) => opt.name === bestForToken.chainName);
      if (bestChain) {
        setSelectedChain(bestChain);
      }
    }
  };

  const handleSelectChain = (chains: string[]) => {
    const selected = chainOptions.find((chainOption) => chainOption.name === chains[0]);
    setSelectedChain(selected);
    logEvent('Calculator', 'calculator_chain_select', selected!.name);
  };

  const availableChainsForToken = useMemo(() => {
    if (!selectedCoin || !poolsData?.pools?.length) return [];

    const allPools = getAllPoolsFlattened(poolsData.pools);
    const chains = allPools
      .filter((pool) => pool.tokenSymbol === selectedCoin.name)
      .map((pool) => pool.chainName);

    const uniqueChains = Array.from(new Set(chains));
    return uniqueChains
      .map((name) => chainOptions.find((opt) => opt.name === name))
      .filter((opt): opt is MultiSelectPopoverOption => Boolean(opt));
  }, [selectedCoin, poolsData, chainOptions]);

  const matchingPools = useMemo(() => {
    if (!poolsData || !selectedCoin) return [];
    const allPools = getAllPoolsFlattened(poolsData.pools);

    return allPools.filter(
      (pool) =>
        pool.tokenSymbol === selectedCoin.name &&
        (!selectedChain || pool.chainName === selectedChain.name)
    );
  }, [poolsData, selectedCoin, selectedChain]);

  const bestPool = useMemo(() => {
    if (!poolsData?.pools?.length) return null;
    return (selectedCoin ? matchingPools : poolsData.pools).reduce((best, current) => {
      return current.apy > best.apy ? current : best;
    });
  }, [poolsData, selectedCoin, matchingPools]);

  const bestApy = bestPool?.apy ?? 0;

  const estimatedEarnings = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(amount) * (Number(bestApy.toFixed(1)) / 100));

  useEffect(() => {
    if (!selectedCoin && stablecoinOptions.length && bestPool) {
      const coin = stablecoinOptions.find((opt) => opt.name === bestPool.tokenSymbol);
      if (coin) {
        setSelectedCoin(coin);
      }
    }
  }, [selectedCoin, stablecoinOptions, bestPool]);

  useEffect(() => {
    if (selectedCoin && !selectedChain && bestPool) {
      const chain = chainOptions.find((opt) => opt.name === bestPool.chainName);
      if (chain) {
        setSelectedChain(chain);
      }
    }
  }, [selectedCoin, selectedChain, bestPool, chainOptions]);

  return (
    <Paper sx={{ p: { xs: 2, md: 3 }, mt: { xs: 2, sm: 3 } }}>
      <Typography variant={'textXXLSB'} textAlign="center">
        {t('yieldCalculator')}
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={3}>
        <Box
          sx={{
            width: { xs: 1, sm: 'calc(50% - 8px)' },
            display: 'flex',
            alignItems: 'flex-start',
          }}
        >
          <InputLabelBox sx={{ minWidth: 74 }}>{t('token')}</InputLabelBox>
          {!selectedCoin ? (
            <Skeleton variant="rectangular" height={40} width="100%" />
          ) : (
            <MultiSelectPopover
              multiselect={false}
              sx={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                height: 40,
                background: (theme) => theme.palette.background.paper,
              }}
              title={
                <Stack direction="row" spacing={1}>
                  {(() => {
                    const Icon = selectedCoin.icon!;
                    return <Icon fontSize="small" />;
                  })()}
                  <Typography variant="textMSB">{selectedCoin.name}</Typography>
                </Stack>
              }
              selected={[selectedCoin?.name]}
              options={stablecoinOptions}
              fullWidth
              onChange={handleSelectStablecoin}
            />
          )}
        </Box>
        <Box
          sx={{
            width: { xs: 1, sm: 'calc(50% - 8px)' },
            display: 'flex',
            alignItems: 'flex-start',
          }}
        >
          <InputLabelBox sx={{ minWidth: 74 }}>{t('network')}</InputLabelBox>
          {!selectedChain ? (
            <Skeleton variant="rectangular" height={40} width="100%" />
          ) : (
            <MultiSelectPopover
              multiselect={false}
              sx={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                height: 40,
                background: (theme) => theme.palette.background.paper,
              }}
              title={
                <Stack direction="row" spacing={1}>
                  {(() => {
                    const Icon = selectedChain.icon!;
                    return <Icon fontSize="small" />;
                  })()}
                  <Typography variant="textMSB">{selectedChain.name}</Typography>
                </Stack>
              }
              selected={[selectedChain?.name]}
              options={availableChainsForToken}
              fullWidth
              onChange={handleSelectChain}
            />
          )}
        </Box>
        <Box
          sx={{
            width: { xs: 1, sm: 'calc(50% - 8px)', display: 'flex', alignItems: 'flex-start' },
          }}
        >
          <InputLabelBox sx={{ minWidth: 74 }}>{t('amount')}</InputLabelBox>
          <NumericFormat
            value={amount}
            onChange={handleAmountChange}
            size="small"
            customInput={TextField}
            thousandSeparator
            onBlur={handleEmptyBlur}
            valueIsNumericString
            decimalScale={0}
            prefix="$"
            variant="outlined"
            fullWidth
            sx={({ palette }) => ({
              background: palette.background.paper,
              height: 40,
              '& .MuiOutlinedInput-notchedOutline': {
                border: `solid 1px ${palette.border.default}`,
              },
            })}
            slotProps={{
              input: {
                sx: {
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                },
              },
            }}
          />
        </Box>
      </Stack>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        mt={3}
        sx={{
          backgroundColor: 'background.default',
          borderRadius: '8px',
          px: { xs: 2, md: 3 },
          py: 2,
        }}
      >
        <Stack
          direction="column"
          spacing={{ xs: 1, md: 1.5 }}
          width={{ xs: 1, sm: 'calc(50% - 8px)' }}
        >
          <Typography variant="textM" color="text.black">
            {t('bestAvailableRate')}
          </Typography>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 1, md: 1.5 }}
            alignItems={{ xs: 'flex-start', md: 'center' }}
          >
            <Typography
              variant="textXXL"
              color="text.green"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <PercentIcon sx={{ fontSize: 20, mr: 0.5 }} />
              {t('apy', { apy: bestApy.toFixed(1) })}
            </Typography>
            <Typography variant="textMSB" color="text.secondary">
              {bestPool?.protocolName &&
                t('on', { chain: bestPool?.chainName, protocol: bestPool?.protocolName })}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction="column"
          spacing={{ xs: 1, md: 1.5 }}
          width={{ xs: 1, sm: 'calc(50% - 8px)' }}
        >
          <Typography variant="textM" color="text.black">
            {t('estimatedEarnings')}
          </Typography>
          <Typography
            variant="textXXL"
            color="text.black"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <CoinsIcon sx={{ fontSize: 20, mr: 0.5 }} />$ {estimatedEarnings}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Calculator;
