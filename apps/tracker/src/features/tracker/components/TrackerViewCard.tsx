import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { ConfirmModalData } from '@features/serviceModal/components/ConfirmModal';
import FilterChipsList from '@features/tracker/components/FilterChipsList';
import { copyViewLinkToClipboard } from '@features/tracker/utils/copyViewLinkToClipboard';
import { filtersToSearchParams } from '@features/tracker/utils/filtersToSearchParams';
import { ROUTES } from '@shared/constants/routes';
import { ServiceModalName } from '@shared/enums/modals';
import { SavedTrackerViewItem } from '@shared/types/tracker';
import { useDeleteSavedFilterMutation } from '@store/api/trackerApi';
import { selectTrackerFilters } from '@store/selectors/trackerSlice';
import { addServiceModal } from '@store/slices/serviceModalSlice';
import { removeSavedView, setSelectedSavedView } from '@store/slices/trackerSlice';
import { useAppDispatch } from '@store/store';

interface TrackerViewCardProps {
  isLoading?: boolean;
  savedView?: SavedTrackerViewItem;
}
const TrackerViewCard = ({ isLoading, savedView }: TrackerViewCardProps) => {
  const { t } = useTranslation(['tracker', 'common']);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const filters = selectTrackerFilters();
  const [deleteSavedFilter] = useDeleteSavedFilterMutation();

  const handleEditView = (viewName: string, id: number) => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.SaveTracker,
        payload: { savedViewName: viewName, savedViewId: id },
      })
    );
  };

  const handleDeleteView = async (viewId: number) => {
    await deleteSavedFilter(viewId).unwrap();
    dispatch(removeSavedView(viewId));
  };

  const handleOpenDeleteViewModal = (id: number) => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.Confirm,
        payload: {
          title: t('areYouSure'),
          subtitle: t('actionCannotBeUndone'),
          submitTitle: t('common:delete'),
          onSubmit: () => handleDeleteView(id),
        } as ConfirmModalData,
      })
    );
  };

  const handleViewClick = (view: SavedTrackerViewItem) => {
    dispatch(setSelectedSavedView({ id: view.id, filters: view.filters }));
    const params = filtersToSearchParams(view.filters);
    const url = `${ROUTES.main}?${params.toString()}`;
    navigate(url);
  };

  if (isLoading) {
    return (
      <Paper
        square={false}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: {
            xs: '100%',
            sm: 'calc((100% - 2 * 16px) / 3)',
          },
          minWidth: { xs: '100%', sm: '280px' },
          p: { xs: 2, md: 3 },
        }}
      >
        <Stack direction="column" spacing={2} sx={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" height={32} />
          <Skeleton variant="text" width="40%" height={24} />
          <Skeleton variant="rectangular" height={120} />
        </Stack>
      </Paper>
    );
  }

  if (!savedView) {
    return null;
  }

  const { id, name, filters: savedFilters, createdAt } = savedView;

  return (
    <Paper
      square={false}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: {
          xs: '100%',
          sm: 'calc((100% - 16px) / 2)',
          md: 'calc((100% - 2 * 16px) / 3)',
        },
        minWidth: { xs: '100%', sm: '280px' },
      }}
    >
      <Stack direction="column" sx={{ p: { xs: 2, md: 3, flex: 1 } }} spacing={{ xs: 2, md: 3 }}>
        <Stack direction="column" spacing={0.75}>
          <Typography variant="textXXLB" lineHeight="24px">
            {name}
          </Typography>
          {createdAt && (
            <Typography variant="textM" color="text.secondary">
              {t('created', { date: format(new Date(createdAt), 'dd/MM/yyyy') })}
            </Typography>
          )}
        </Stack>
        <Stack direction="column" spacing={1.5} mt={1}>
          <FilterChipsList title={t('stablecoins')} data={savedFilters.tokenSymbols} />
          <FilterChipsList title={t('chains')} data={savedFilters.chainNames} />
          <FilterChipsList title={t('protocols')} data={savedFilters.protocolNames} />
          <FilterChipsList
            title={t('apyRange')}
            data={[`${savedFilters.apyMin}% - ${savedFilters.apyMax}%`]}
            hideList={
              (savedFilters.apyMin === filters?.defaultAPY![0] &&
                savedFilters.apyMax === filters?.defaultAPY![1]) ||
              !savedFilters.apyMin ||
              !savedFilters.apyMax
            }
          />
        </Stack>
      </Stack>
      <Divider />
      <Box
        sx={({ spacing }) => ({
          display: 'flex',
          justifyContent: 'space-between',
          p: { xs: 2, md: spacing(2, 3, 3, 3) },
        })}
      >
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleViewClick(savedView)}
          startIcon={<VisibilityOutlinedIcon />}
        >
          {t('view')}
        </Button>
        <Stack direction="row" spacing={1}>
          <IconButton
            sx={{ borderRadius: 2 }}
            onClick={(event) => copyViewLinkToClipboard(event, savedFilters, dispatch, t)}
          >
            <LinkOutlinedIcon />
          </IconButton>
          <IconButton sx={{ borderRadius: 2 }} onClick={() => handleEditView(name, id)}>
            <EditNoteOutlinedIcon />
          </IconButton>
          <IconButton sx={{ borderRadius: 2 }} onClick={() => handleOpenDeleteViewModal(id)}>
            <DeleteOutlinedIcon />
          </IconButton>
        </Stack>
      </Box>
    </Paper>
  );
};

export default TrackerViewCard;
