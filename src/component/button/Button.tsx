import React, {FC} from "react";
import "./Button.scss"

/**
 * Компонент Button
 */
interface IButton {

    /**
     * Метод вызываемый при клике на кнопку
     */
    onClick: (e?: any) => void,

    /**
     * Текст внутри кнопки
     */
    text?: string,

    /**
     * Атрибут для определения доступности кнопки для нажатия
     */
    disabled?: boolean,

    /**
     * Тип кнопки
     */
    type?: 'submit' | 'reset' | 'button',

    /**
     * Список дополнительных классов
     */
    classname?: string,

    /**
     * Title
     */
    title?: string
}

export const Button: FC<IButton> = (
    {
        onClick,
        text,
        disabled,
        type,
        classname,
        title
    }) => {

    return (
        <button className={`button${classname ? ' ' + classname : ''}`}
                disabled={disabled}
                onClick={onClick}
                type={type}
                title={title}>{text}
        </button>
    )
};
