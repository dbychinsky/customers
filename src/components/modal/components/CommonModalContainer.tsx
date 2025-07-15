import React, { useEffect } from 'react';
import { ReactComponent as CrossIcon } from 'common/assets/icon/cancelModal.svg';
import { UseModalProps } from 'components/modal/types';
import { Button } from 'components/button/Button';
import styles from 'components/modal/components/CommonModalContainer.module.scss';

/**
 * @description Интерфейс пропсов компонента "CommonModalContainer".
 *
 * @see IUseModal
 */
interface CommonModalContainerProps extends UseModalProps {
    /**
     * @description Функция закрытия модального окна
     */
    closeModal: () => void;
    /**
     * @description Функция, которая вызывается при размонтировании компонента модального окна.
     */
    onCloseModal?: () => void;
    /**
     * @description Дополнительная функция-callback, которая, при ее наличии, вызывается перед
     * выполнением функции "submit" модального окна.
     */
    submitCallback?: (() => void) | null;
}

/**
 * @description Стандартное содержимое (контейнер с компонентами) модального окна.
 *
 * @see ICommonModalContainerProps
 */
export function CommonModalContainer({
    title,
    closeModal,
    submitHandler,
    cancelHandler,
    children,
    onCloseModal,
    submittingTitle = '',
    isSubmitting = false,
    submitButtonTitle = 'Ок',
    cancelButtonTitle = 'Отмена',
    withCancelButton = false,
    submitCallback = null,
}: CommonModalContainerProps) {
    const onCloseHandler = () => {
        if (cancelHandler) {
            cancelHandler();
        }

        closeModal();
    };

    useEffect(
        () => () => {
            if (onCloseModal) {
                onCloseModal();
            }
        },
        [onCloseModal],
    );

    return (
        <div className={styles.commonModalContainer}>
            <div className={styles.modalContent}>
                <div className={styles.modalContentHeader}>
                    {title ? (isSubmitting && submittingTitle ? submittingTitle : title) : null}
                </div>

                {/*{isSubmitting ? <Spinner alignment="center" /> : null}*/}

                {children ? children : null}

                {submitHandler ? (
                    <div className={styles.commonModalButtonContainer}>
                        {withCancelButton ? (
                            <Button text={cancelButtonTitle} onClick={onCloseHandler} isDisabled={isSubmitting} />
                        ) : null}
                        <Button
                            text={submitButtonTitle}
                            onClick={() => {
                                submitHandler();

                                if (submitCallback) {
                                    submitCallback();
                                }
                            }}
                            isDisabled={isSubmitting}
                        />
                    </div>
                ) : null}
            </div>

            <div className={styles.commonModalCloseIconContainer} onClick={closeModal}>
                <CrossIcon />
            </div>
        </div>
    );
}
