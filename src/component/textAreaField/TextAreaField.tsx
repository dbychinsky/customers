import React from 'react';

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
            <textarea className="textArea"
                      value={value}
                      onChange={changeHandler}
                      name={name}></textarea>
        </>
    );
};

export default TextAreaField;