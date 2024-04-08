import React from "react";
import { Button } from "components/button/Button";
import styles from "./modalConfirm.module.scss";
import { HeadingH2 } from "components/headingH2/headingH2";

interface ModalConfirmProps {
    /**
     * Функция закрытия модального окна.
     */
    deleteContact: () => void;
    /**
     * Функция показа окна подтверждения.
     */
    setIsShowConfirm: (value: boolean) => void;
}

/**
 * @description Компонент модального окна подтверждения.
 */
export const ModalConfirm = ({ deleteContact, setIsShowConfirm }: ModalConfirmProps) => {
    return (
        <div className={styles.modalConfirm}>
            <HeadingH2 title="Удалить выбранный контакт?" />
            <div className={styles.description}>
                Данные контакта будут удалены безвозвратно!
            </div>
            <div className={styles.actionBar}>
                <Button text="Да" onClick={deleteContact}
                        className={styles.delete} />
                <Button text="Нет" onClick={() => setIsShowConfirm(false)} />
            </div>
        </div>
    );
};
