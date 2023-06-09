import React, {FC} from 'react';
import "./CheckboxNormal.scss"


interface ICheckboxNormal {

    /**
     * Идентификатор
     */
    id: string,

    /**
     * Значение в поле ввода
     */
    value: boolean,

    /**
     * Метод, вызываемый при изменении значения в поле ввода
     *
     * @param e новое значение
     */
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,

    /**
     * Имя поля
     */
    name: string

    /**
     * label text
     */
    text?: string

    /**
     * class
     */
    className?: string

}

const CheckboxNormal: FC<ICheckboxNormal> = (
    {
        id,
        value,
        changeHandler,
        name,
        text,
        className
    }) => {

    return (
        <div className={`checkboxWrapperNormal ${className ? className : ''}`}>
            <input type="checkbox"
                   checked={value}
                   name={name}
                   className="checkbox"
                   onChange={changeHandler}
                   id={id}
            />
            <label htmlFor={id}>{text}</label>
        </div>
    );
};

export default CheckboxNormal;