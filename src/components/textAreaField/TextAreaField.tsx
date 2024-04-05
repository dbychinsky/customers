import React from "react";
import styles from "./TextAreaField.module.scss";
import clsx from "clsx";

interface ITextAreaFieldProps {

    /**
     * @description Значение в поле ввода.
     */
    value: string | number,

    /**
     * @description Метод, вызываемый при изменении значения в поле ввода.
     */
    changeHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,

    /**
     * @description Имя поля.
     */
    name: string,

    /**
     * @description Имя поля.
     */
    className?: string,

    /**
     * @description placeHolder.
     */
    placeHolder?: string,
}

/**
 * @description Компонент Text Area.
 */
export const TextAreaField = ({ value, changeHandler, name, className, placeHolder }: ITextAreaFieldProps) => {
    const classWrapperTextArea = clsx(styles.textAreaField, className);

    return (
        <>
            <textarea className={classWrapperTextArea}
                      value={value}
                      onChange={changeHandler}
                      name={name}
                      tabIndex={1}
                      placeholder={placeHolder}>

            </textarea>
        </>
    );
};
