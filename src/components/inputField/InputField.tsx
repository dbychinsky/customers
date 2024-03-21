import React, {FC} from "react";
import {InputFieldEnum} from "components/inputField/types";
import clsx from "clsx";
import styles from "./InputField.module.scss";


interface IInputFieldProps {

    /**
     * @description Значение в поле ввода.
     */
    value: string | number,

    /**
     * @description Метод, вызываемый при изменении значения в поле ввода.
     *
     * @param e новое значение.
     */
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,

    /**
     * @description Имя поля.
     */
    name: string,

    /**
     * @description Тип поля.
     */
    type: InputFieldEnum,

    /**
     * @description placeHolder.
     */
    placeHolder?: string,

    /**
     * @description disabled.
     */
    disabled?: boolean

    /**
     * @description Дополнительный класс.
     */
    className?: string,

    /**
     * @description Флаг ошибки.
     */
    isError?: boolean
}

/**
 * @description Компонент Input, поле ввода.
 */
export const InputField: FC<IInputFieldProps> = (
    {
        type,
        value,
        changeHandler,
        name,
        placeHolder,
        disabled,
        className,
        isError
    }) => {
    const localClassName = clsx(styles.inputField, className, {[styles.error]: isError});

    let typeField: InputFieldEnum = InputFieldEnum.text;

    if (type === InputFieldEnum.number) {
        typeField = InputFieldEnum.text
    }

    if (type === InputFieldEnum.password) {
        typeField = InputFieldEnum.password
    }

    return (
        <input
            className={localClassName}
            type={typeField}
            value={value}
            onInput={changeHandler}
            name={name}
            placeholder={placeHolder}
            tabIndex={1}
            disabled={disabled}
            autoComplete="new-password"
        />
    )
}