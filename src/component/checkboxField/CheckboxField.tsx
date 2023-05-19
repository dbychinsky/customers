import React, {FC} from 'react';
import "./CheckBox.scss";

interface ICheckboxField {

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

}

const CheckboxField: FC<ICheckboxField> = (
    {
        id,
        value,
        changeHandler,
        name
    }) => {

    return (
   <div className="checkboxWrapper">
       <input type="checkbox"
              checked={value}
              name={name}
              className="checkbox"
              onChange={changeHandler}
              id={id}/>
       <label htmlFor={id}></label>
   </div>
    );
};

export default CheckboxField;