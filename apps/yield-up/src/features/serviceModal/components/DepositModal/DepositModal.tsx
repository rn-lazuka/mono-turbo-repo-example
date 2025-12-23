import { type ElementType, type MouseEvent, useState } from 'react';

import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import EventRepeatOutlinedIcon from '@mui/icons-material/EventRepeatOutlined';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import InfoOutlineRoundedIcon from '@mui/icons-material/InfoOutlineRounded';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import PercentRoundedIcon from '@mui/icons-material/PercentRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { TabsGroup, USDTIcon } from '@yup/ui';
import { useTranslation } from 'react-i18next';
import { selectServiceModal } from 'tracker/src/store/selectors/serviceModalSlice.ts';

import StrategyTab from '@features/serviceModal/components/DepositModal/StrategyTab.tsx';
import {
  balanceChartData,
  transactionAmountPercents,
  earningsChartData,
} from '@shared/constants/dashboard';
import { Earnings, Strategies } from '@shared/enums/common.ts';
import { ServiceModalName } from '@shared/enums/modals';
import { ServiceModalProps } from '@shared/types/serviceModal';
import PieCenterLabel from '@shared/ui/PieCenterIcon';
import { addServiceModal, removeServiceModal } from '@store/slices/serviceModalSlice';
import { useAppDispatch } from '@store/store';

export interface DepositModalPayload {
  tokenName: string;
  icon: ElementType;
}

const DepositModal = ({ index }: ServiceModalProps) => {
  const { t } = useTranslation(['dashboard', 'common']);
  const { tokenName, icon: Icon }: DepositModalPayload = selectServiceModal(
    ServiceModalName.Deposit
  );
  const amount = '10,000';
  const pros = [
    { icon: AccessTimeRoundedIcon, title: t('noLockUp'), description: t('withdrawAnytime') },
    {
      icon: AttachMoneyRoundedIcon,
      title: t('noDepositFees'),
      description: t('depositGoesToWork'),
    },
    {
      icon: TrendingUpRoundedIcon,
      title: t('earnYieldInRealTime'),
      description: t('earningsAccrueContinuously'),
    },
  ];
  const dispatch = useAppDispatch();

  const [depositPercent, setDepositPercent] = useState(100);
  const [strategy, setStrategy] = useState(Strategies.Conservative);
  const [earning, setEarning] = useState(Earnings.Yearly);
  const [showDetails, setShowDetails] = useState(false);

  const handleChangeDepositPercent = (_: MouseEvent<HTMLElement>, percent: number) => {
    if (percent) {
      setDepositPercent(percent);
    }
  };
  const handleChangeStrategy = (_: MouseEvent<HTMLElement>, newStrategy: Strategies) => {
    if (newStrategy) {
      setStrategy(newStrategy);
    }
  };
  const handleChangeEarning = (_: MouseEvent<HTMLElement>, newEarning: Earnings) => {
    if (newEarning) {
      setEarning(newEarning);
    }
  };

  const strategies = [
    {
      name: <StrategyTab name={t('conservative')} icon={GppGoodOutlinedIcon} percent={'5-7%'} />,
      value: Strategies.Conservative,
    },
    {
      name: <StrategyTab name={t('balanced')} icon={TrendingUpRoundedIcon} percent={'8-12%'} />,
      value: Strategies.Balanced,
    },
    {
      name: <StrategyTab name={t('aggressive')} icon={PercentRoundedIcon} percent={'12-20%'} />,
      value: Strategies.Aggressive,
    },
  ];

  const earnings = [
    {
      name: (
        <Stack direction="column" gap={0.5} py={1} alignItems="center">
          <CalendarTodayOutlinedIcon sx={{ fontSize: '14px' }} />
          <Typography variant="textS">{t('daily')}</Typography>
        </Stack>
      ),
      value: Earnings.Daily,
    },
    {
      name: (
        <Stack direction="column" gap={0.5} py={1} alignItems="center">
          <CalendarMonthOutlinedIcon sx={{ fontSize: '14px' }} />
          <Typography variant="textS">{t('weekly')}</Typography>
        </Stack>
      ),
      value: Earnings.Weekly,
    },
    {
      name: (
        <Stack direction="column" gap={0.5} py={1} alignItems="center">
          <EventAvailableOutlinedIcon sx={{ fontSize: '14px' }} />
          <Typography variant="textS">{t('monthly')}</Typography>
        </Stack>
      ),
      value: Earnings.Monthly,
    },
    {
      name: (
        <Stack direction="column" gap={0.5} py={1} alignItems="center">
          <EventRepeatOutlinedIcon sx={{ fontSize: '14px' }} />
          <Typography variant="textS">{t('yearly')}</Typography>
        </Stack>
      ),
      value: Earnings.Yearly,
    },
  ];

  const handleClose = () => {
    dispatch(removeServiceModal(ServiceModalName.Deposit));
  };

  const openConfirmDepositModal = () => {
    dispatch(addServiceModal({ name: ServiceModalName.ConfirmDeposit, payload: { amount } }));
  };

  const pieChartSize = {
    width: 176,
    height: 176,
  };

  return (
    <Dialog
      open
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      disableEnforceFocus
      disableScrollLock
      disableAutoFocus={true}
      sx={{ zIndex: index }}
      slotProps={{
        paper: {
          sx: {
            p: 0,
            m: { xs: 0 },
            width: { xs: '100%', sm: 'calc(100% - 16px)' },
            maxWidth: { xs: '100%', sm: '850px' },
            backgroundColor: 'background.default',
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          flexGrow: 1,
          justifyContent: 'flex-end',
          pb: 1,
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
          width={1}
          pr={2}
        >
          <Typography
            variant="textXL"
            fontWeight={700}
            sx={{ '& span': { fontWeight: 400, color: 'primary.main', ml: 0.25 } }}
          >
            {t('common:deposit')}
            <span>{tokenName}</span>
          </Typography>
          <Typography variant="textM" sx={{ '& span': { fontWeight: 600, ml: 0.25 } }}>
            {t('common:available')}:<span>{amount}</span>
          </Typography>
        </Stack>
        <IconButton onClick={handleClose} sx={{ mt: -0.5, mr: -1.25 }}>
          <CloseRoundedIcon sx={{ fontSize: '16px' }} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pb: 6 }}>
        <Stack direction="column" alignItems="center" spacing={2}>
          <Paper
            square={false}
            variant="outlined"
            sx={{
              width: 1,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 0.5,
            }}
          >
            <Stack direction="row" sx={{ alignItems: 'center' }}>
              <Icon sx={{ fontSize: '46px', mr: 1.5 }} />
              <Typography variant="headerL" fontWeight={700}>
                {amount}
              </Typography>
            </Stack>
            <Typography variant="textM" color="text.secondary" ml={7.25}>
              ${amount}
            </Typography>
          </Paper>
          <TabsGroup<number>
            items={transactionAmountPercents}
            value={depositPercent}
            handleChange={handleChangeDepositPercent}
          />
          <Divider sx={{ width: 1 }} />
          <Stack direction="row" width={1} justifyContent="space-between" alignItems="center">
            <Typography variant="textMSB">{t('selectStrategy')}</Typography>
            <Button
              variant="text"
              size="small"
              sx={(theme) => ({
                color: 'text.secondary',
                '&:hover': { background: 'none' },
                p: 0,
                height: 'max-content',
                ...theme.typography.textS,
              })}
              disableTouchRipple
              onClick={() => setShowDetails((prevState) => !prevState)}
              endIcon={showDetails ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
            >
              {t(`common:${showDetails ? 'hideDetails' : 'showDetails'}`)}
            </Button>
          </Stack>
          <TabsGroup<Strategies>
            items={strategies}
            value={strategy}
            handleChange={handleChangeStrategy}
          />
          <Collapse in={showDetails} timeout="auto" unmountOnExit sx={{ width: 1 }}>
            <Stack direction="column" spacing={1.5}>
              <Typography
                variant="textM"
                display="inline-flex"
                alignItems="flex-start"
                sx={{
                  whiteSpace: 'nowrap',
                  '& span': { color: 'text.secondary', ml: 1, whiteSpace: 'wrap' },
                }}
              >
                <MonetizationOnOutlinedIcon sx={{ fontSize: '16px', mt: 0.25, mr: 0.5 }} />
                {t('depositCap')}:<span>10M / 50% filled</span>
              </Typography>
              <Typography
                variant="textM"
                display="inline-flex"
                alignItems="flex-start"
                sx={{
                  whiteSpace: 'nowrap',
                  '& span': { color: 'text.secondary', ml: 1, whiteSpace: 'wrap' },
                }}
              >
                <WarningAmberRoundedIcon sx={{ fontSize: '16px', mt: 0.25, mr: 0.5 }} />
                {t('risk')}:<span>{t('high')}</span>
              </Typography>
              <Typography
                variant="textM"
                display="inline-flex"
                alignItems="flex-start"
                sx={{
                  whiteSpace: 'nowrap',
                  '& span': { color: 'text.secondary', ml: 1, whiteSpace: 'wrap' },
                }}
              >
                <AttachMoneyRoundedIcon sx={{ fontSize: '16px', mt: 0.25, mr: 0.5 }} />
                {t('totalAssets')}:<span>$12.3 {t('million')}</span>
              </Typography>
              <Typography
                variant="textM"
                display="inline-flex"
                alignItems="flex-start"
                sx={{
                  whiteSpace: 'nowrap',
                  '& span': { color: 'text.secondary', ml: 1, whiteSpace: 'wrap' },
                }}
              >
                <InfoOutlineRoundedIcon sx={{ fontSize: '16px', mt: 0.25, mr: 0.5 }} />
                {t('aboutStrategy')}:<span>{t('thisStrategyMaximizes')}</span>
              </Typography>
            </Stack>
            <Stack direction="column" width={1} pt={4}>
              <Stack direction="row" alignItems="center" gap={0.5} width={1}>
                <Typography variant="textS">Protocol allocation</Typography>
                <InfoOutlineRoundedIcon sx={{ fontSize: '12px' }} />
              </Stack>
              <PieChart series={[{ data: balanceChartData, innerRadius: 60 }]} {...pieChartSize}>
                <PieCenterLabel>
                  <USDTIcon sx={{ fontSize: '80px' }} />
                </PieCenterLabel>
              </PieChart>
            </Stack>
          </Collapse>
          <Divider sx={{ width: 1 }} />

          <Paper
            variant="outlined"
            square={false}
            sx={{ p: 2, width: 1, backgroundColor: 'background.default' }}
          >
            <Paper
              variant="outlined"
              square={false}
              sx={{ p: 2, width: 1, background: '#F5FCFF', display: 'flex', flexWrap: 'wrap' }}
            >
              <Box display="flex" justifyContent="space-between" width={1}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <TrendingUpRoundedIcon sx={{ fontSize: '20px' }} />
                  <Typography variant="textL" fontWeight={600}>
                    {t('annualProjection')}:
                  </Typography>
                </Stack>
                <Typography variant="textXXL" fontWeight={700} color="primary.main">
                  $ 42.19
                </Typography>
              </Box>
              <Typography variant="textS" color="text.secondary">
                {t('basedOnAPY', { percentRange: '12-20', depositAmount: 351.56 })}:
              </Typography>
            </Paper>
            <Typography variant="textM" fontWeight={600} mt={2}>
              {t('earningsProjection')}
            </Typography>
            <TabsGroup<Earnings>
              items={earnings}
              value={earning}
              handleChange={handleChangeEarning}
              sx={{ mt: 1 }}
            />
            <LineChart
              xAxis={[
                {
                  data: earningsChartData.map((d) => d.month),
                  scaleType: 'point',
                  tickMinStep: 1,
                },
              ]}
              yAxis={[
                {
                  valueFormatter: (v: string | number) => `$${v}`,
                },
              ]}
              series={[
                {
                  data: earningsChartData.map((d) => d.value),
                  curve: 'monotoneX',
                  color: '#00C26F',
                  showMark: false,
                },
              ]}
              height={300}
              grid={{ horizontal: true }}
              sx={{
                mt: 2,
                '& .MuiChartsGrid-horizontalLine': {
                  strokeDasharray: '4 4',
                  stroke: '#ccc',
                },
              }}
            />
            <Divider sx={{ my: 2 }} />
            <Typography variant="textM" fontWeight={600} mb={2}>
              {t('thingsToKnow')}
            </Typography>
            {pros.map(({ icon: Icon, title, description }) => (
              <Stack key={title} direction="row" alignItems="center" gap={1} mt={1.5}>
                <Icon />
                <Stack direction="column">
                  <Typography variant="textMSB">{title}</Typography>
                  <Typography variant="textS" color="text.secondary">
                    {description}
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </Paper>
          <Button variant="contained" fullWidth onClick={openConfirmDepositModal}>
            {t('common:connectYourWallet')}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default DepositModal;
