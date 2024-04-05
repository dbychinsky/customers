import React, { FC, MouseEventHandler, ReactElement } from "react";
import { ButtonFormEnum } from "components/button/types";
import clsx from "clsx";
import styles from "components/button/Button.module.scss";
import { ButtonImageType, ButtonImageTypeMapping } from "components/buttonImage/types";

interface IButtonImageProps {

    /**
     * @description  Текст внутри кнопки
     */
    text?: string,

    /**
     * @description  Метод вызываемый при клике на кнопку
     */
    onClick: MouseEventHandler<HTMLElement>;

    /**
     * @description  Атрибут для определения доступности кнопки для нажатия.
     */
    isDisabled?: boolean,

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
    type?: ButtonFormEnum,

    /**
     * @description Иконка.
     */
    image: ReactElement,

    /**
     * @description Только иконка.
     */
    onlyImage: boolean;

    /**
     * @description Вариант кнопки, которая будет отображена.
     */
    variant?: ButtonImageType;
}


/**
 * @description Компонент Button.
 */
export const ButtonImage: FC<IButtonImageProps> = (
    {
        onClick,
        text,
        isDisabled,
        className,
        variant = "noStyle",
        title,
        autoFocus,
        type,
        image,
        onlyImage,
    }) => {
    const localClassNameImage = clsx(styles.button, styles.buttonImage, ButtonImageTypeMapping[variant], className);

    return (
        <button className={localClassNameImage}
                disabled={isDisabled}
                onClick={onClick}
                title={title}
                autoFocus={autoFocus}
                tabIndex={1}
                type={type ? type : "button"}>
            {image}{!onlyImage ? text : null}
        </button>
    );
};