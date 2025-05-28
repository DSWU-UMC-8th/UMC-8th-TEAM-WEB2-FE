import { useState } from 'react';

type ModalType = null | 'success' | 'error' | 'cancel';

interface UseModalReturn {
    modal: ModalType;
    showSuccessModal: () => void;
    showErrorModal: () => void;
    showCancelModal: () => void;
    hideModal: () => void;
}

export const useModal = (): UseModalReturn => {
    const [modal, setModal] = useState<ModalType>(null);

    const showSuccessModal = () => setModal('success');
    const showErrorModal = () => setModal('error');
    const showCancelModal = () => setModal('cancel');
    const hideModal = () => setModal(null);

    return {
        modal,
        showSuccessModal,
        showErrorModal,
        showCancelModal,
        hideModal,
    };
}; 