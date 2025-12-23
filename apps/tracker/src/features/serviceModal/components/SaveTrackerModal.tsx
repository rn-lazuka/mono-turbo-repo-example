import { useState } from 'react';

import { alpha } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DefaultModal } from '@yup/ui';
import { useTranslation } from 'react-i18next';

import FilterChipsList from '@features/tracker/components/FilterChipsList';
import { ServiceModalName } from '@shared/enums/modals';
import { logEvent } from '@shared/lib/analytics/googleAnalitics';
import { ServiceModalProps } from '@shared/types/serviceModal';
import {
  useSaveTrackerViewMutation,
  useUpdateTrackerViewNameMutation,
} from '@store/api/trackerApi';
import { selectServiceModal } from '@store/selectors/serviceModalSlice';
import { selectSavedViews, selectTrackerFilters } from '@store/selectors/trackerSlice';
import { removeServiceModal } from '@store/slices/serviceModalSlice';
import { addSavedView, updateSavedView } from '@store/slices/trackerSlice';
import { useAppDispatch } from '@store/store';

interface SaveTrackerModalData {
  savedViewName?: string;
  savedViewId?: number;
}

const SaveTrackerModal = ({ index }: ServiceModalProps) => {
  const { savedViewName, savedViewId }: SaveTrackerModalData = selectServiceModal(
    ServiceModalName.SaveTracker
  );
  const { t } = useTranslation('tracker');
  const dispatch = useAppDispatch();
  const filters = selectTrackerFilters();
  const savedViews = selectSavedViews();
  const [trackerViewName, setTrackerViewName] = useState(savedViewName ?? '');
  const [error, setError] = useState<string | null>(null);
  const savedView = savedViews.find((v) => v.name === savedViewName);
  const filtersToShow = savedViewName ? savedView!.filters : filters;
  const [saveTrackerView] = useSaveTrackerViewMutation();
  const [updateTrackerViewName] = useUpdateTrackerViewNameMutation();

  const handleClose = () => {
    dispatch(removeServiceModal(ServiceModalName.SaveTracker));
  };

  const handleSubmit = async () => {
    const trimmedName = trackerViewName.trim();
    if (!trimmedName) return;

    if (savedViewName && savedViewId) {
      await updateTrackerViewName({ id: savedViewId, name: trimmedName }).unwrap();
      dispatch(updateSavedView({ oldName: savedViewName, newName: trimmedName }));
    } else {
      const newView = {
        name: trimmedName,
        filters,
      };
      const res = await saveTrackerView(newView).unwrap();
      dispatch(addSavedView(res));
    }
    logEvent('Tracker', 'save_tracker_view_confirm');
    handleClose();
  };

  return (
    <DefaultModal
      onClose={handleClose}
      submitButton={{
        action: handleSubmit,
        title: t(savedViewName ? 'updateTracker' : 'saveTracker'),
        disabled: trackerViewName.trim() === '',
      }}
      sx={{ zIndex: index }}
      title={t(savedViewName ? 'editTracker' : 'saveTracker')}
      subtitle={t(savedViewName ? 'updateConfiguration' : 'saveCurrentFilters')}
    >
      <TextField
        required
        label={t('trackerName')}
        placeholder={t('highYield')}
        autoFocus
        focused
        size="small"
        value={trackerViewName}
        error={Boolean(error)}
        helperText={error}
        sx={{ mt: 2 }}
        onChange={(e) => {
          setTrackerViewName(e.target.value);
          if (error) setError(null);
        }}
      />
      <Paper
        square={false}
        sx={(theme) => ({
          background: alpha(theme.palette.neutral[99], 0.5),
          mt: 2,
          p: 1.5,
        })}
      >
        <Typography variant="textMSB">{t('filtersPreview')}</Typography>
        <Stack direction="column" spacing={1.5} mt={1}>
          <FilterChipsList title={t('stablecoins')} data={filtersToShow.tokenSymbols} />
          <FilterChipsList title={t('chains')} data={filtersToShow.chainNames} />
          <FilterChipsList title={t('protocols')} data={filtersToShow.protocolNames} />
          <FilterChipsList
            title={t('apyRange')}
            data={[`${filtersToShow.apyMin}% - ${filtersToShow.apyMax}%`]}
            hideList={
              (filtersToShow.apyMin === filtersToShow?.defaultAPY?.[0] &&
                filtersToShow.apyMax === filtersToShow.defaultAPY?.[1]) ||
              !filtersToShow.apyMin ||
              !filtersToShow.apyMax
            }
          />
        </Stack>
      </Paper>
    </DefaultModal>
  );
};

export default SaveTrackerModal;
