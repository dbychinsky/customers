import React, {FC} from "react";
import "./InputField.scss";

/**
 * Компонент Input
 */

/**
 * Интерфейс
 */
interface IInputTextFieldProps {

    /**
     * Значение в поле ввода
     */
    value: string | number,

    /**
     * Метод, вызываемый при изменении значения в поле ввода
     *
     * @param e новое значение
     */
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,

    /**
     * Имя поля
     */
    name: string,

    /**
     * Тип поля
     */
    type: string,

    /**
     * placeHolder
     */
    placeHolder?: string,

    /**
     * disabled
     */
    disabled?: boolean
}

const InputTextField: FC<IInputTextFieldProps> = (
    {
        type,
        value,
        changeHandler,
        name,
        placeHolder,
        disabled
    }) => {
    return (
        <input
            className="inputTextField"
            type={type}
            value={value}
            onInput={changeHandler}
            name={name}
            placeholder={placeHolder}
            tabIndex={1}
            disabled={disabled}
        />
    )
}

export default InputTextField;
