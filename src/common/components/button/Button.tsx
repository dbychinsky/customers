import React, {FC, MouseEventHandler} from "react";
import {ButtonFormType, ButtonType, ButtonTypeMapping} from "common/components/button/types";
import clsx from "clsx";
import styles from "common/components/button/Button.module.scss";

interface IButtonProps {

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
     * @description Автофокус.
     */
    autoFocus?: boolean,

    /**
     * @description Тип кнопки.
     */
    type?: ButtonFormType,
}


/**
 * @description Компонент Button.
 */
export const Button: FC<IButtonProps> = (
    {
        onClick,
        text,
        isDisabled,
        variant = "primary",
        className,
        title,
        autoFocus,
        type
    }) => {

    const localClassName = clsx(styles.button, ButtonTypeMapping[variant], className);

    return (
        <button className={localClassName}
                disabled={isDisabled}
                onClick={onClick}
                title={title}
                autoFocus={autoFocus}
                tabIndex={1}
                type={type ? type : "button"}>
            {text}
        </button>
    )
};
