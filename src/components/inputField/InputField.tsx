import React, { FC } from "react";
import clsx from "clsx";
import styles from "components/inputField/InputField.module.scss";
import { InputFieldEnum } from "components/inputField/types";
import { useMask } from "@react-input/mask";


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

    /**
     * @description Маска.
     */
    mask: boolean;

    /**
     * @description Количество символов.
     */
    maxLength?: number;
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
        isError,
        mask,
        maxLength
    }) => {
    const classWrapperName = clsx(styles.inputField, className, { [styles.error]: isError });
    const inputRef = useMask({ mask: "+375 (__) ___-__-__", replacement: { _: /\d/ } });

    let typeField: InputFieldEnum = InputFieldEnum.text;

    if (type === InputFieldEnum.number) {
        typeField = InputFieldEnum.text;
    }

    if (type === InputFieldEnum.password) {
        typeField = InputFieldEnum.password;
    }

    const defaultInput = <input
        className={classWrapperName}
        type={typeField}
        value={value}
        onInput={changeHandler}
        name={name}
        placeholder={placeHolder}
        tabIndex={1}
        disabled={disabled}
        autoComplete="new-password"
        maxLength={maxLength}/>;

    const maskInput = <input
        className={classWrapperName}
        type={typeField}
        value={value}
        onInput={changeHandler}
        name={name}
        placeholder={"+375 (__) ___-__-__"}
        tabIndex={1}
        disabled={disabled}
        autoComplete="new-password"
        maxLength={maxLength}
        ref={inputRef} />;

    return (
        mask
            ? maskInput
            : defaultInput
    );

};