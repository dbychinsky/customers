import React, {FC} from 'react';

/**
 * Компонент Input
 */

/**
 * Интерфейс
 */
interface IInputTextFieldPasswordProps {

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
    placeHolder?: string

}

const InputTextFieldPassword: FC<IInputTextFieldPasswordProps> = (
    {
        type,
        value,
        changeHandler,
        name,
        placeHolder
    }) => {
    return (
        <input
            className='InputTextFieldPassword'
            type={type}
            value={value}
            onInput={changeHandler}
            name={name}
            placeholder={placeHolder}
            tabIndex={1}
        />
    )
}

export default InputTextFieldPassword;
