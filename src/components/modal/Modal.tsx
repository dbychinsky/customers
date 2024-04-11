import React, { useEffect, useRef, useState } from "react";
import styles from "./Modal.module.scss";
import clsx from "clsx";
import { ModalProps } from "components/modal/types";

/**
 * Контейнер модального окна, включающий в себя контейнер backdrop (тёмный фон) и
 * контейнер, позиционирующий содержимое модального окна.
 *
 * @see IModalProps
 */
export function Modal({ children, closeModal, closeBackdropClick = true }: ModalProps): React.ReactElement {
    const [isView, setIsView] = useState(false);
    const classWrapperModal = clsx(styles.modalBackdrop, { [styles.show]: isView });

    useEffect(() => {
        const closeModalOnEscClick = (event: KeyboardEvent) => {
            if (event.key === "Escape" && closeModal) {
                closeModal();
            }
        };

        document.addEventListener("keydown", closeModalOnEscClick);

        return () => document.removeEventListener("keydown", closeModalOnEscClick);
    }, [closeModal]);

    useEffect(() => {
        setTimeout(() => {
            setIsView(true);
        }, 100);
    }, []);

    const mouseDownElementRef = useRef<EventTarget | null>(null);

    return (
        <div
            onMouseDown={(event) => {
                mouseDownElementRef.current = event.target;
            }}
            onClick={(event) => {
                if (closeBackdropClick && closeModal && event.target === mouseDownElementRef.current) {
                    closeModal();
                }
            }}
            className={classWrapperModal}
        >
            <div
                className={styles.modal}
                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                    event.stopPropagation();
                }}
            >
                {children}
            </div>
        </div>
    );
}
