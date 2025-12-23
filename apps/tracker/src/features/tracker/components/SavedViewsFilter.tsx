import { type MouseEvent, useEffect, useState } from 'react';

import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { dotsTextOverflowStyles } from '@yup/ui';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { copyViewLinkToClipboard } from '@features/tracker/utils/copyViewLinkToClipboard';
import { filtersToSearchParams } from '@features/tracker/utils/filtersToSearchParams';
import { ROUTES } from '@shared/constants/routes';
import { ServiceModalName } from '@shared/enums/modals';
import { TableSortOrder, YieldTableSortByField } from '@shared/enums/tables';
import { logEvent } from '@shared/lib/analytics/googleAnalitics';
import { TrackerFilters } from '@shared/types/tracker';
import { parseArrayParam, parseParamToNumber, parseParamToString } from '@shared/utils/parseParam';
import { useGetSavedFiltersQuery } from '@store/api/trackerApi';
import { selectSavedViews, selectSelectedSavedView } from '@store/selectors/trackerSlice';
import { selectIsAuth } from '@store/selectors/userSlice';
import { addServiceModal } from '@store/slices/serviceModalSlice';
import { setFilters, setSelectedSavedView } from '@store/slices/trackerSlice';
import { useAppDispatch } from '@store/store';

const SavedViewsFilter = () => {
  const { t } = useTranslation(['tracker', 'common']);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selectedView = selectSelectedSavedView();
  const savedViews = selectSavedViews();
  const isAuth = selectIsAuth();
  useGetSavedFiltersQuery(undefined, { skip: !isAuth, refetchOnMountOrArgChange: true });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSelectView = (viewId: number) => {
    const newSelectedView = savedViews.find((v) => v.id === viewId);

    if (newSelectedView) {
      dispatch(setSelectedSavedView({ id: newSelectedView.id, filters: newSelectedView.filters }));

      const newSearchParams = filtersToSearchParams(newSelectedView.filters);
      navigate({ search: newSearchParams.toString() }, { replace: true });
    } else {
      console.warn(`Saved view with id:"${viewId}" not found.`);
    }

    setAnchorEl(null);
  };

  const onManage = () => {
    navigate(ROUTES.trackerViews);
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openAuthModal = () => {
    logEvent('Auth', 'google_auth_modal_open_from_filter');
    dispatch(addServiceModal({ name: ServiceModalName.GoogleAuth }));
  };

  const open = Boolean(anchorEl);
  const savedViewsNames = savedViews.map((view) => view.id);
  const isSelectedSaved = selectedView && savedViewsNames.includes(selectedView.id);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.size === 0) return;
    const filters: Partial<TrackerFilters> = {};
    const apyMin = parseParamToNumber('apyMin', searchParams);
    if (typeof apyMin === 'number') filters.apyMin = apyMin;

    const apyMax = parseParamToNumber('apyMax', searchParams);
    if (typeof apyMax === 'number') filters.apyMax = apyMax;

    const sortBy = parseParamToString('sortBy', searchParams);
    if (sortBy) filters.sortBy = sortBy as YieldTableSortByField;

    const sortOrder = parseParamToString('sortOrder', searchParams);
    if (sortOrder) filters.sortOrder = sortOrder as TableSortOrder;

    const chainNames = parseArrayParam('chainNames', searchParams);
    if (chainNames) filters.chainNames = chainNames;

    const tokenSymbols = parseArrayParam('tokenSymbols', searchParams);
    if (tokenSymbols) filters.tokenSymbols = tokenSymbols;

    const protocolNames = parseArrayParam('protocolNames', searchParams);
    if (protocolNames) filters.protocolNames = protocolNames;

    if (!selectedView) {
      dispatch(setFilters(filters));
    }
  }, [dispatch, selectedView]);

  if (savedViews.length === 0 || !isAuth) {
    return (
      <Button
        variant="outlined"
        sx={{ height: 36 }}
        startIcon={<BookmarkBorderOutlinedIcon />}
        disabled={isAuth && savedViews.length === 0}
        onClick={openAuthModal}
      >
        {t('noSavedViews')}
      </Button>
    );
  }

  return (
    <>
      <Button
        variant="outlined"
        sx={{ height: 36 }}
        startIcon={
          isSelectedSaved ? (
            <BookmarkAddedOutlinedIcon color="primary" />
          ) : (
            <BookmarkBorderOutlinedIcon />
          )
        }
        onClick={handleClick}
      >
        <Typography
          variant="textM"
          sx={{ maxWidth: { xs: 160, sm: 200 }, ...dotsTextOverflowStyles }}
        >
          {t(selectedView ? 'viewing' : 'savedViews', { view: selectedView?.name })}
        </Typography>
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableScrollLock
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: { width: 280, mt: 1, p: 1 },
          },
        }}
      >
        <List dense disablePadding>
          {savedViews.map(({ id, name, filters: viewFilters }) => (
            <ListItemButton key={id} onClick={() => handleSelectView(id)}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                {id === selectedView?.id ? (
                  <BookmarkAddedOutlinedIcon color="primary" fontSize="small" />
                ) : (
                  <BookmarkBorderOutlinedIcon fontSize="small" />
                )}
              </ListItemIcon>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Typography
                  sx={{
                    maxWidth: { xs: 140, sm: 160 },
                    ...dotsTextOverflowStyles,
                  }}
                >
                  {name}
                </Typography>

                <IconButton
                  aria-label="copy link"
                  color="secondary"
                  sx={{ '&:hover': { color: 'primary.main' } }}
                  onClick={(event) => copyViewLinkToClipboard(event, viewFilters, dispatch, t)}
                >
                  <LinkOutlinedIcon fontSize="small" />
                </IconButton>
              </Box>
            </ListItemButton>
          ))}
        </List>

        <Divider sx={{ my: 1 }} />

        <ListItemButton
          onClick={() => {
            onManage();
            handleClose();
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <SettingsOutlinedIcon fontSize="small" sx={{ color: 'text.primary' }} />
            <Typography variant="textM">{t('manageSavedViews')}</Typography>
          </Stack>
        </ListItemButton>
      </Popover>
    </>
  );
};

export default SavedViewsFilter;
