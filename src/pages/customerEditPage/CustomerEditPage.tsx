import React, {useContext, useEffect, useState} from 'react';
import InputTextField from "../../component/inputField/InputField";
import InputCheckboxField from "../../component/checkboxField/CheckboxField";
import DateField from "../../component/dateField/DateField";
import {StoreContext} from "../../App";
import {useNavigate, useParams} from "react-router";
import {observer} from "mobx-react";
import TextAreaField from "../../component/textAreaField/TextAreaField";
import {Conversation} from "../../utility/Conversation";
import {ActionListType, Field} from "../../component/form/Form";
import "./CustomerEditPage.scss";
import Header from "../../component/header/Header";
import FormEditCustomer from "../../component/formEditCustomer/FormEditCustomer";
import H2 from "../../component/header/H2";
import H1 from "../../component/header/H1";

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
        customerStore.deleteRecordListNotification(id);
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

    const fieldListProducts: Field[] = [
        {
            name: "products",
            label: "Продукция",
            field: <InputTextField value={customerStore.newCustomer.products}
                                   changeHandler={customerStore.handleChange}
                                   name="products"
                                   type="text"/>
        }
    ];
    const fieldListCustomer: Field[] = [{
        name: "contactFace",
        label: "ФИО",
        field: <InputTextField
            value={customerStore.newCustomer.contactFace}
            changeHandler={customerStore.handleChange}
            name="contactFace"
            type="text"/>
    },
        {
            name: "organization",
            label: "Организация",
            field: <InputTextField
                value={customerStore.newCustomer.organization}
                changeHandler={customerStore.handleChange}
                name="organization"
                type="text"/>
        }];
    const fieldListContacts: Field[] = [{
        name: "phone",
        label: "Номер телефона",
        field: <InputTextField
            value={customerStore.newCustomer.phone}
            changeHandler={customerStore.handleChange}
            name="phone"
            type="text"/>
    },
        {
            name: "email",
            label: "Email",
            field: <InputTextField
                value={customerStore.newCustomer.email}
                changeHandler={customerStore.handleChange}
                name="email"
                type="text"/>
        }];
    const fieldListDescription: Field[] = [{
        name: "description",
        label: "Описание",
        field: <TextAreaField
            value={customerStore.newCustomer.description}
            changeHandler={customerStore.handleChange}
            name="description"
            type="text"/>
    }];
    const fieldListReminder: Field[] = [
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
    ]


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
            <Header title="Редактирование/Добавление"/>
            <H1 text="Редактирование/Добавление"/>
            <FormEditCustomer fieldListProducts={fieldListProducts}
                              fieldListCustomer={fieldListCustomer}
                              fieldListContacts={fieldListContacts}
                              fieldListDescription={fieldListDescription}
                              fieldListReminder={fieldListReminder}
                              actionList={actionList}/>
        </div>
    );
});

export default CustomerEditPage;