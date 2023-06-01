import React, {ReactElement} from 'react';
import {observer} from "mobx-react";
import FormRow from "../formRow/FormRow";
import "./Form.scss";
import {FieldError} from "../../store/AuthStore";

/**
 * Тип Field
 */
export type Field = {
    /**
     * Имя поля
     */
    name: string

    /**
     * Текст подписи к полю
     */
    label: string,

    /**
     * Поле
     */
    field: ReactElement,

    /**
     * Список валидаторов
     */
    validationList?: ((field: Field) => FieldError | undefined)[],
}


/**
 * Тип для экшенов формы
 */
export type ActionListType = {

    /**
     * Имя экшена
     */
    name: string,

    /**
     * Кнопки
     */
    action: ReactElement
}

/**
 * Интерфейс формы
 */
interface IForm {
    fieldList: Field[],
    actionList: ActionListType[]
}

const Form = observer(({
                           fieldList,
                           actionList
                       }: IForm) => {

    return (
        <form className="form" onSubmit={(event) => event.preventDefault()}>
            {fieldList.map(({name, label, field}) =>
                <FormRow className={name}
                         label={label}
                         field={field}
                         key={name}
                />
            )}
            {actionList.map(({name, action}) =>
                <div className="actionBar" key={name}>
                    {action}
                </div>
            )}
        </form>
    );
});

export default Form;