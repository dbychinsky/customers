import React, {useContext, useEffect, useState} from 'react';
import InputTextField from "../../component/inputField/InputField";
import InputCheckboxField from "../../component/checkboxField/CheckboxField";
import DateField from "../../component/dateField/DateField";
import {StoreContext} from "../../App";
import {useNavigate, useParams} from "react-router";
import {observer} from "mobx-react";
import TextAreaField from "../../component/textAreaField/TextAreaField";
import {Conversation} from "../../utility/Conversation";
import Form, {ActionListType, Field} from "../../component/form/Form";

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    /**
     * Список полей
     */
    const fieldList: Field[] = [
        {
            name: "organization",
            label: "Организация",
            field: <InputTextField value={customerStore.newCustomer.organization}
                                   changeHandler={customerStore.handleChange}
                                   name="organization"
                                   type="text"/>
            // validationList: [validator.emptyValidator]
        },
        {
            name: "contactFace",
            label: "Контактное лицо",
            field: <InputTextField
                value={customerStore.newCustomer.contactFace}
                changeHandler={customerStore.handleChange}
                name="contactFace"
                type="text"/>
        },
        {
            name: "phone",
            label: "Номер телефона",
            field: <InputTextField
                value={customerStore.newCustomer.phone}
                changeHandler={customerStore.handleChange}
                name="phone"
                type="text"/>
        },
        {
            name: "Email",
            label: "Номер телефона",
            field: <InputTextField
                value={customerStore.newCustomer.email}
                changeHandler={customerStore.handleChange}
                name="Email"
                type="text"/>
        },
        {
            name: "description",
            label: "Описание",
            field: <TextAreaField
                value={customerStore.newCustomer.description}
                changeHandler={customerStore.handleChange}
                name="description"
                type="text"/>
        },
        {
            name: "reminder",
            label: "Напоминание",
            field: <InputCheckboxField
                value={customerStore.newCustomer.reminder}
                changeHandler={customerStore.handleChangeCheckbox}
                name="reminder"/>
        },
        {
            name: "reminderDate",
            label: "Дата напоминания",
            field: <DateField
                startDate={startDate}
                setStartDate={setStartDate}/>
        }
    ];

    /**
     * Список кнопок
     */
    const actionList: ActionListType[] = [
        {
            name: "submit",
            action: <button onClick={save}>save</button>
        },
        {
            name: "cancel",
            action: <button onClick={() => exit()}>Back</button>
        }
    ];


    return (
        <div className="customerEditPage">
            <h1>Редактирование/Добавление заказчика</h1>
            <Form fieldList={fieldList}
                  actionList={actionList}/>

        </div>
    );
});

export default CustomerEditPage;