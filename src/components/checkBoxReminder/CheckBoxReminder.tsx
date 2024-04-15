import React from 'react';
import clsx from 'clsx';
import styles from 'components/checkBoxReminder/CheckBoxReminder.module.scss';

interface CheckboxProps {
    /**
     * @description  Идентификатор.
     */
    id: string;

    /**
     * @description  Значение в поле ввода.
     */
    valueCheckbox: boolean;

    /**
     * @description Метод, вызываемый при изменении значения в поле ввода.
     */
    changeHandlerCheckbox: (value: boolean) => void;

    /**
     * @description Имя поля.
     */
    name: string;

    /**
     * @description Текст для label.
     */
    text?: string;

    /**
     * @description Дополнительный класс.
     */
    className?: string;
}

/**
 * Компонент checkbox.
 * @param id
 * @param value
 * @param changeHandlerCheckbox
 * @param name
 * @param text
 * @param className
 * @constructor
 */
export function CheckBoxReminder({ valueCheckbox, changeHandlerCheckbox, text, id, className, name }: CheckboxProps) {
    const classWrapperCheckbox = clsx(styles.checkBoxReminder, className);

    return (
        <div className={classWrapperCheckbox}>
            <input
                checked={valueCheckbox}
                onChange={() => changeHandlerCheckbox(!valueCheckbox)}
                type='checkbox'
                name={name}
                className={styles.checkBoxField}
                id={id}
            />
            <label htmlFor={id}>{text}</label>
        </div>
    );
}
