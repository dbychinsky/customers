import React from "react";
import clsx from "clsx";
import styles from "components/checkBoxReminder/CheckBoxReminder.module.scss";

interface CheckboxProps {

    /**
     * @description  Идентификатор.
     */
    id: string,

    /**
     * @description  Значение в поле ввода.
     */
    value: boolean,

    /**
     * @description Метод, вызываемый при изменении значения в поле ввода.
     */
    changeHandler: () => void,

    /**
     * @description Имя поля.
     */
    name: string

    /**
     * @description Текст для label.
     */
    text?: string

    /**
     * @description Дополнительный класс.
     */
    className?: string
}

/**
 * Компонент checkbox.
 * @param id
 * @param value
 * @param changeHandler
 * @param name
 * @param text
 * @param className
 * @constructor
 */
export function CheckBoxReminder({ changeHandler, text, id, className, name, value }
                                     : CheckboxProps) {
    const classWrapperCheckbox = clsx(styles.checkBoxReminder, className);

    return (
        <div className={classWrapperCheckbox}>
            <input type="checkbox"
                   checked={value}
                   name={name}
                   className={styles.checkBoxField}
                   onChange={changeHandler}
                   id={id}
            />
            <label htmlFor={id}>{text}</label>
        </div>
    );
};
