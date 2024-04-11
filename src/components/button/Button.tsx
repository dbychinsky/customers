import React, { MouseEventHandler } from "react";
import clsx from "clsx";
import styles from "components/button/Button.module.scss";
import { ButtonFormEnum, ButtonType, ButtonTypeMapping } from "components/button/types";

interface ButtonProps {

    /**
     * @description  Текст внутри кнопки
     */
    text: string,

    /**
     * @description  Метод вызываемый при клике на кнопку
     */
    onClick: MouseEventHandler<HTMLElement>;

    /**
     * @description  Атрибут для определения доступности кнопки для нажатия.
     */
    isDisabled?: boolean,

    /**
     * @description Вариант кнопки, которая будет отображена.
     */
    variant?: ButtonType;

    /**
     * @description  Список дополнительных классов.
     */
    className?: string,

    /**
     * @description Title.
     */
    title?: string,

    /**
     * @description Тип кнопки.
     */
    type?: ButtonFormEnum,
}


/**
 * @description Компонент Button.
 */
export function Button(
    {
        onClick,
        text,
        isDisabled,
        variant = "primary",
        className,
        title,
        type,
    }: ButtonProps) {

    const localClassName = clsx(styles.button, ButtonTypeMapping[variant], className);

    return (
        <button className={localClassName}
                disabled={isDisabled}
                onClick={onClick}
                title={title}
                tabIndex={1}
                type={type ? type : "button"}>
            {text}
        </button>
    );
}
