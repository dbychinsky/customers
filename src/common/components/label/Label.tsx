import React, {FC} from "react";
import clsx from "clsx";
import styles from "common/components/label/Label.module.scss";

interface ILabelProps {

    /**
     * @description Текст.
     */
    text: string,

    /**
     * @description Привязка к полю.
     */
    htmlFor?: string,

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
 * @description Компонент Label.
 */
export const Label: FC<ILabelProps> = (
    {
        text,
        htmlFor,
        className,
        isError
    }) => {

    const localClassName = clsx(styles.label, className, {[styles.error]: isError});

    return (
        <label className={localClassName} htmlFor={htmlFor}>
            {text}
        </label>
    )
}

