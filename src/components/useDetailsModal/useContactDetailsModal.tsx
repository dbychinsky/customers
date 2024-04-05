import React, { useCallback } from "react";
import { useModal } from "components/modal/useModal";
import { ContactDetails } from "components/useDetailsModal/ContactDetails";


/**
 * @description Модальное окно деталей контакта
 */
export function useContactDetailsModal(): UseDetailsModalReturnProps {
    const [Modal, openModal, closeModal] = useModal();

    const onCloseDetailsModal = useCallback(() => {
        closeModal();
    }, [closeModal]);

    const showDetailsHandler = useCallback(
        () => {
            openModal();
        },
        [openModal],
    );


    const ModalShowDetails = (contactId: number | null) => (
        <Modal title="Детали" onCloseModal={onCloseDetailsModal}>
            <ContactDetails closeModal={onCloseDetailsModal} contactId={contactId} />
        </Modal>
    );

    return { ModalShowDetails, showDetailsHandler };
};


/**
 * Тип возвращаемого объекта хука "useContactDetailsModal".
 *
 * @see useModalCopyProtocol
 */
type UseDetailsModalReturnProps = {
    /**
     * Функция-компонент модального окна.
     */
    ModalShowDetails: (contactId: number | null) => React.ReactElement;
    /**
     * Функция-callback, вызываемая при клике на иконку просмотра деталей.
     */
    showDetailsHandler: () => void;
};