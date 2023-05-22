import React, {FC} from "react";
import "./Label.scss";

/**
 * Компонент Label
 */
interface ILabel {

    /**
     * Текст
     */
    text: string,

    /**
     * Привязка к полю
     */
    htmlFor?: string,

    /**
     * Привязка к полю
     */
    onClick?: (value: any) => void
}

const Label: FC<ILabel> = (
    {
        text,
        htmlFor,
        onClick
    }) => {

    return (
        <label className="label"
               htmlFor={htmlFor}
               onClick={onClick}>
            {text}
        </label>
    )
}

export default Label;
