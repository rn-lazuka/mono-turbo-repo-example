import { type MouseEvent } from 'react';

import { type TFunction } from 'i18next';

import { filtersToSearchParams } from '@features/tracker/utils/filtersToSearchParams';
import { AlertType } from '@shared/enums/common';
import { TrackerFilters } from '@shared/types/tracker';
import { showSnackbar } from '@store/slices/snackbarSlice';
import { AppDispatch } from '@store/store';

export const copyViewLinkToClipboard = (
  event: MouseEvent<HTMLElement>,
  filters: Partial<TrackerFilters>,
  dispatch: AppDispatch,
  t: TFunction<[any, 'common'], undefined>
) => {
  event.stopPropagation();

  const params = filtersToSearchParams(filters);
  const url = `${window.location.origin}?${params.toString()}`;

  navigator.clipboard
    .writeText(url)
    .then(() => {
      dispatch(
        showSnackbar({ message: t('common:copiedToClipboard'), severity: AlertType.Success })
      );
    })
    .catch((err) => {
      dispatch(
        showSnackbar({
          message: t('common:failedToCopy', { error: err }),
          severity: AlertType.Error,
        })
      );
    });
};
