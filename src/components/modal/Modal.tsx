import React, { useEffect, useRef } from "react";
import { IModalProps } from "components/modal/types";
import styles from "./Modal.module.scss";

/**
 * Контейнер модального окна, включающий в себя контейнер backdrop (тёмный фон) и
 * контейнер, позиционирующий содержимое модального окна.
 *
 * @see IModalProps
 */
export function Modal({ children, closeModal, closeBackdropClick = true }: IModalProps): React.ReactElement {
    useEffect(() => {
        const closeModalOnEscClick = (event: KeyboardEvent) => {
            if (event.key === "Escape" && closeModal) {
                closeModal();
            }
        };

        document.addEventListener("keydown", closeModalOnEscClick);

        return () => document.removeEventListener("keydown", closeModalOnEscClick);
    }, [closeModal]);

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
            className={styles.modalBackdrop}
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
