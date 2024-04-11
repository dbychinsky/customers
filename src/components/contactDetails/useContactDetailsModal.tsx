import React, { useCallback, useState } from "react";
import { useModal } from "components/modal/useModal";
import { ContactDetails } from "components/contactDetails/ContactDetails";
import { ModalConfirm } from "components/modalConfirm/ModalConfirm";

/**
 * @description Модальное окно деталей контакта
 */
export function useContactDetailsModal(deleteContact: () => void): UseDetailsModalReturnProps {
    const [Modal, openModal, closeModal] = useModal();
    const [isShowConfirm, setIsShowConfirm] = useState(false);

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
        <Modal title="Детали контакта" onCloseModal={onCloseDetailsModal}>
            {isShowConfirm
                ? <ModalConfirm deleteContact={deleteContact}
                                setIsShowConfirm={setIsShowConfirm} />
                : <ContactDetails contactId={contactId}
                                  setIsShowConfirm={setIsShowConfirm} />}
        </Modal>
    );

    return { ModalShowDetails, showDetailsHandler, onCloseDetailsModal };
}


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
    /**
     * Функция-callback, вызываемая при клике на иконку Закрытия.
     */
    onCloseDetailsModal: () => void;
};