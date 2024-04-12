import React from 'react';
import { Button } from 'components/button/Button';
import styles from 'components/modalConfirm/modalConfirm.module.scss';
import { HeadingH2 } from 'components/headingH2/headingH2';

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
export function ModalConfirm({ deleteContact, setIsShowConfirm }: ModalConfirmProps) {
    return (
        <div className={styles.modalConfirm}>
            <HeadingH2 title='Удалить выбранный контакт?' />
            <div className={styles.description}>Данные контакта будут удалены безвозвратно!</div>
            <div className={styles.actionBar}>
                <Button text='Да' onClick={deleteRecord} className={styles.delete} />
                <Button text='Нет' onClick={cancel} />
            </div>
        </div>
    );

    function deleteRecord() {
        deleteContact();
        setIsShowConfirm(false);
    }

    function cancel() {
        setIsShowConfirm(false);
    }
}
