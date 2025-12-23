import { ServiceModalName } from '@shared/enums/modals';
import { useAppSelector } from '@store/store';

export const selectServiceModal = (modalName: ServiceModalName) =>
  useAppSelector((state) => state.serviceModal[modalName]) ?? {};
export const selectServiceModals = () => useAppSelector((state) => state.serviceModal);
export const selectHasServiceModal = () =>
  useAppSelector((state) => !!Object.keys(state.serviceModal).length);
