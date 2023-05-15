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
    htmlFor?: string
}

const Label: FC<ILabel> = (
    {
        text,
        htmlFor
    }) => {

    return (
        <label className="label" htmlFor={htmlFor}>
            {text}
        </label>
    )
}

export default Label;
