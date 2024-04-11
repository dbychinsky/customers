import ReactDOM from "react-dom";
import React, { useCallback, useRef, useState } from "react";
import { UseModalProps, UseModalReturnType } from "components/modal/types";
import { Modal } from "components/modal/Modal";
import { CommonModalContainer } from "components/modal/components/CommonModalContainer";

/**
 * Хук useModal, который позволяет манипулировать компонентом модального
 * окна (создание, отображение, закрытие).
 *
 * @return массив с сущностями, которые по порядку соответствуют следующим типам:
 *
 * **Modal** - компонент модального окна для отображения.
 *
 * **openModal** - функция открытия модального окна.
 *
 * **closeModal** - функция закрытия модального окна.
 *
 * **isOpenModal** - состояние модального окна.
 *
 * @see UseModalReturnType
 */
export function useModal(): UseModalReturnType {
    const [isOpen, setIsOpen] = useState(false);

    const callbackRef = useRef<(() => void) | null | undefined>(null);

    const closeModal = useCallback(() => setIsOpen(false), []);
    const openModal = useCallback((callback?: () => void) => {
        callbackRef.current = callback;
        setIsOpen(true);
    }, []);

    const ModalComponent = useCallback(
        ({
             title,
             cancelButtonTitle,
             submitButtonTitle,
             withCancelButton,
             cancelHandler,
             submitHandler,
             isSubmitting,
             submittingTitle,
             isActiveSubmitButton,
             isActiveCancelButton,
             onCloseModal,
             children,
             closeBackdropClick,
         }: UseModalProps) =>
            isOpen
                ? ReactDOM.createPortal(
                    <Modal closeModal={closeModal} closeBackdropClick={closeBackdropClick}>
                        <CommonModalContainer
                            title={title}
                            submittingTitle={submittingTitle}
                            isSubmitting={isSubmitting}
                            closeModal={closeModal}
                            onCloseModal={onCloseModal}
                            submitHandler={submitHandler}
                            cancelHandler={cancelHandler}
                            cancelButtonTitle={cancelButtonTitle}
                            submitButtonTitle={submitButtonTitle}
                            withCancelButton={withCancelButton}
                            isActiveSubmitButton={isActiveSubmitButton}
                            isActiveCancelButton={isActiveCancelButton}
                            submitCallback={callbackRef.current}
                        >
                            {children}
                        </CommonModalContainer>
                    </Modal>,
                    document.body,
                )
                : null,
        [isOpen, closeModal],
    );

    return [ModalComponent, openModal, closeModal, isOpen];
}
