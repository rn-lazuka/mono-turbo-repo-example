import { lazy, Suspense } from 'react';
import type { PropsWithChildren } from 'react';

import ReactDOM from 'react-dom';

import { modalZIndex } from '@shared/constants/common';
import { ServiceModalName } from '@shared/enums/modals';
import { selectServiceModals } from '@store/selectors/serviceModalSlice';

const SaveTrackerModal = lazy(() => import('@features/serviceModal/components/SaveTrackerModal'));
const ConfirmModal = lazy(() => import('@features/serviceModal/components/ConfirmModal'));
const GoogleAuthModal = lazy(() => import('@features/serviceModal/components/GoogleAuthModal'));

const ModalSuspense = ({ children }: PropsWithChildren) => {
  return <Suspense fallback={<div />}>{children}</Suspense>;
};

export const ServiceModal = () => {
  const modals = selectServiceModals();
  let modalIndex = modalZIndex;
  const getModalComponentByName = (modalName: string) => {
    modalIndex += 1;
    switch (modalName) {
      case ServiceModalName.SaveTracker:
        return <SaveTrackerModal index={modalIndex} key={modalName} />;
      case ServiceModalName.Confirm:
        return <ConfirmModal index={modalIndex} key={modalName} />;
      case ServiceModalName.GoogleAuth:
        return <GoogleAuthModal index={modalIndex} key={modalName} />;
      default:
        return null;
    }
  };

  return ReactDOM.createPortal(
    Object.keys(modals).map((modal) => (
      <ModalSuspense key={modal}>{getModalComponentByName(modal)}</ModalSuspense>
    )),
    document.getElementById('modal-root') as Element
  );
};
