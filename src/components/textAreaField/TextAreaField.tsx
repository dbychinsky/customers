import React from 'react';
import styles from 'components/textAreaField/TextAreaField.module.scss';
import clsx from 'clsx';

interface TextAreaFieldProps {
    /**
     * @description Значение в поле ввода.
     */
    value: string | number;

    /**
     * @description Метод, вызываемый при изменении значения в поле ввода.
     */
    changeHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

    /**
     * @description Имя поля.
     */
    name: string;

    /**
     * @description Имя поля.
     */
    className?: string;

    /**
     * @description placeHolder.
     */
    placeHolder?: string;

    /**
     * @description isDisabled.
     */
    isDisabled?: boolean;
}

/**
 * @description Компонент Text Area.
 */
export function TextAreaField({ value, changeHandler, name, className, placeHolder, isDisabled }: TextAreaFieldProps) {
    const classWrapperTextArea = clsx(styles.textAreaField, className);

    return (
        <>
            <textarea
                className={classWrapperTextArea}
                value={value}
                onChange={changeHandler}
                name={name}
                tabIndex={1}
                placeholder={placeHolder}
                disabled={isDisabled}
            />
        </>
    );
}
