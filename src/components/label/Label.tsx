import React from 'react';
import clsx from 'clsx';
import styles from 'components/label/Label.module.scss';

interface LabelProps {
    /**
     * @description Текст.
     */
    text: string;

    /**
     * @description Привязка к полю.
     */
    htmlFor?: string;

    /**
     * @description Дополнительный класс.
     */
    className?: string;

    /**
     * @description Флаг ошибки.
     */
    isError?: boolean;
}

/**
 * @description Компонент Label.
 */
export function Label({ text, htmlFor, className, isError }: LabelProps) {
    const localClassName = clsx(styles.label, className, { [styles.error]: isError });

    return (
        <label className={localClassName} htmlFor={htmlFor}>
            {text}
        </label>
    );
}
