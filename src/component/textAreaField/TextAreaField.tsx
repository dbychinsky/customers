import React from 'react';
import "./TextAreaField.scss";

/**
 * Интерфейс
 */
interface ITextAreaField {

    /**
     * Значение в поле ввода
     */
    value: string | number,

    /**
     * Метод, вызываемый при изменении значения в поле ввода
     *
     * @param e новое значение
     */
    changeHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,

    /**
     * Имя поля
     */
    name: string,

    /**
     * Тип поля
     */
    type?: string

}

/**
 * Компонент textArea
 * @constructor
 */
const TextAreaField = ({value, type, name, changeHandler}: ITextAreaField) => {
    return (
        <>
            <textarea className="textAreaField"
                      value={value}
                      onChange={changeHandler}
                      name={name}
            tabIndex={1}></textarea>
        </>
    );
};

export default TextAreaField;