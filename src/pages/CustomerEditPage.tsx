import React, {useContext, useEffect, useState} from 'react';
import InputTextField from "../component/inputField/InputField";
import InputCheckboxField from "../component/checkboxField/CheckboxField";
import DateField from "../component/dateField/DateField";
import {StoreContext} from "../App";
import {useNavigate, useParams} from "react-router";
import {observer} from "mobx-react";
import FormRow from "../component/formRow/FormRow";
import TextAreaField from "../component/textAreaField/TextAreaField";
import {Conversation} from "../utility/Conversation";

/**
 * Страница редактирования/добавления заказчика
 */
const CustomerEditPage = observer(() => {

    const customerStore = useContext(StoreContext).customerStore;
    const [startDate, setStartDate] = useState(new Date());
    const navigate = useNavigate();
    const {id} = useParams();

    /**
     * Получение значения Места для редактирования и установка в state
     */
    useEffect(() => {
        if (id !== undefined) {
            customerStore.setEditPlace(Number(id));
            setStartDate(Conversation.dateToDateUTC(customerStore.getDateForState(Number(id))));
        } else {
            customerStore.setEditPlace();
        }
    }, []);

    /**
     * Сохраняем нового заказчика
     */
    const save = () => {
        if (!id) {
            customerStore.save(startDate);
        } else {
            customerStore.update(id, customerStore.newCustomer, startDate);
        }
        exit();
    }

    /**
     * Вернуться
     */
    const exit = () => {
        navigate(-1);
    }

    return (
        <div className="customerEditPage">
            <h1>Редактирование/Добавление заказчика</h1>
            <div className="form">
                <FormRow label="Организация">
                    <InputTextField value={customerStore.newCustomer.organization}
                                    changeHandler={customerStore.handleChange}
                                    name="organization"
                                    type="text"/>
                </FormRow>

                <FormRow label="Контактное лицо">
                    <InputTextField value={customerStore.newCustomer.contactFace}
                                    changeHandler={customerStore.handleChange}
                                    name="contactFace"
                                    type="text"/>
                </FormRow>

                <FormRow label="Номер телефона">
                    <InputTextField value={customerStore.newCustomer.phone}
                                    changeHandler={customerStore.handleChange}
                                    name="phone"
                                    type="text"/>
                </FormRow>

                <FormRow label="Email">
                    <InputTextField value={customerStore.newCustomer.email}
                                    changeHandler={customerStore.handleChange}
                                    name="email"
                                    type="text"/>
                </FormRow>

                <FormRow label="Описание">
                    <TextAreaField value={customerStore.newCustomer.description}
                                   changeHandler={customerStore.handleChange}
                                   name="description"
                                   type="text"/>
                </FormRow>

                <FormRow label="Напоминание">
                    <InputCheckboxField value={customerStore.newCustomer.reminder}
                                        changeHandler={customerStore.handleChangeCheckbox}
                                        name="reminder"/>
                </FormRow>

                <FormRow label="Дата напоминания">
                    <DateField startDate={startDate}
                               setStartDate={setStartDate}/>
                </FormRow>

                <div className="actionBar">
                    <button onClick={save}>save</button>
                    <button onClick={() => exit()}>Back</button>
                </div>
            </div>

        </div>
    );
});

export default CustomerEditPage;