import React, { useEffect } from "react";

import { ReactComponent as CrossIcon } from "../../../common/assets/icon/cancel_modal.svg";
import { IUseModal } from "components/modal/types";
import { Button } from "components/button/Button";
import styles from "./CommonModalContainer.module.scss";

/**
 * @description Интерфейс пропсов компонента "CommonModalContainer".
 *
 * @see IUseModal
 */
interface ICommonModalContainerProps extends IUseModal {
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
                                         isActiveSubmitButton = false,
                                         isActiveCancelButton = false,
                                         submittingTitle = "",
                                         isSubmitting = false,
                                         submitButtonTitle = "Ок",
                                         cancelButtonTitle = "Отмена",
                                         withCancelButton = false,
                                         submitCallback = null,
                                     }: ICommonModalContainerProps) {
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
                <div className={styles.modalContentHeader}>{title ? (
                    isSubmitting && submittingTitle ? submittingTitle : title
                ) : null}</div>

                {/*{isSubmitting ? <Spinner alignment="center" /> : null}*/}

                {children ? children : null}

                {submitHandler ? (
                    <div className={styles.commonModalButtonContainer}>
                        {withCancelButton ? (
                            <Button text={cancelButtonTitle}
                                    onClick={onCloseHandler}
                                    isDisabled={isSubmitting} />
                        ) : null}
                        <Button text={submitButtonTitle}
                                onClick={() => {
                                    submitHandler();

                                    if (submitCallback) {
                                        submitCallback();
                                    }
                                }}
                                isDisabled={isSubmitting} />
                    </div>
                ) : null}
            </div>

            <div className={styles.commonModalCloseIconContainer} onClick={closeModal}>
                <CrossIcon />
            </div>
        </div>
    );
}
