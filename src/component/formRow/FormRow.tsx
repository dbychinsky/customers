import React, {FC, ReactElement, useContext} from 'react';
import Label from "../label/Label";
import {StoreContext} from "../../App";
import {observer} from "mobx-react";
import "./FormRow.scss";
import FeedbackMessage, {FeedbackMessageList} from "../feedbackMessage/FeedbackMessage";

/**
 * Интерфейс
 */
interface IFormRow {

    /**
     * Наименование
     */
    name: string,

    /**
     * Лейбл
     */
    label: string,

    /**
     * Поле
     */
    field: ReactElement
}

const FormRow: FC<IFormRow> = observer((
    {
        name,
        label,
        field
    }) => {

    const authStore = useContext(StoreContext).authStore;
    const message = authStore.errorList.find(elem => elem.field === field.props.name)?.message;

    return (
        <div className={`formRow ${name} ${message ? 'error' : ''}`}>
            <Label text={label} htmlFor={name}/>
            {field}
            <FeedbackMessage message={message} typeMessage={FeedbackMessageList.error}/>
        </div>
    );
});

export default FormRow;