import { DefaultModal } from '@yup/ui';
import { useTranslation } from 'react-i18next';

import { ServiceModalName } from '@shared/enums/modals';
import { ServiceModalProps } from '@shared/types/serviceModal';
import { selectServiceModal } from '@store/selectors/serviceModalSlice';
import { removeServiceModal } from '@store/slices/serviceModalSlice';
import { useAppDispatch } from '@store/store';

export interface ConfirmModalData {
  title: string;
  subtitle?: string;
  submitTitle?: string;
  onSubmit: () => Promise<void> | void;
}

const ConfirmModal = ({ index }: ServiceModalProps) => {
  const { subtitle, submitTitle, title, onSubmit }: ConfirmModalData = selectServiceModal(
    ServiceModalName.Confirm
  );
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(removeServiceModal(ServiceModalName.Confirm));
  };

  const handleSubmit = async () => {
    await onSubmit();
    handleClose();
  };

  return (
    <DefaultModal
      onClose={handleClose}
      submitButton={{
        action: handleSubmit,
        title: submitTitle ?? t('submit'),
      }}
      sx={{ zIndex: index }}
      title={title}
      subtitle={subtitle}
    />
  );
};

export default ConfirmModal;
