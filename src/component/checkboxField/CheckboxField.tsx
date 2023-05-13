import React, {FC} from 'react';

interface ICheckboxField {

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

}

const CheckboxField: FC<ICheckboxField> = (
    {
        value,
        changeHandler,
        name
    }) => {

    return (
        <input type="checkbox"
               checked={value}
               onChange={changeHandler}
               name={name}
        />
    );
};

export default CheckboxField;