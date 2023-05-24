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
            field: <InputTextField value={customerStore.product}
                                   changeHandler={customerStore.handleChangeProducts}
                                   name="products"
                                   type="text"/>
        }
    ];
    const fieldListProductsArchive: Field[] = [
        {
            name: "productsArchive",
            label: "Продукция в архиве",
            field: <InputTextField value={customerStore.productArchive}
                                   changeHandler={customerStore.handleChangeProductsArchive}
                                   name="productsArchive"
                                   type="text"/>
        }
    ];
    const fieldListCustomer: Field[] = [
        {
            name: "organization",
            label: "Организация",
            field: <InputTextField
                value={customerStore.newCustomer.organization}
                changeHandler={customerStore.handleChange}
                name="organization"
                type="text"/>
        },
        {
            name: "contactFace",
            label: "ФИО",
            field: <InputTextField
                value={customerStore.newCustomer.contactFace}
                changeHandler={customerStore.handleChange}
                name="contactFace"
                type="text"/>
        }];

    const fieldListPhoneList: Field[] = [
        {
            name: "phoneList",
            label: "Номер телефона",
            field: <InputTextField
                value={customerStore.phone}
                changeHandler={customerStore.handleChangePhone}
                name="phone"
                type="text"/>
        }
    ]

    const fieldListEmail: Field[] = [
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
                id="reminder"
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
            action: <button className="button mainAction" onClick={save}>Сохранить</button>
        },
        {
            name: "cancel",
            action: <button className="button" onClick={() => exit()}>выйти</button>
        }
    ];

    return (
        <div className="customerEditPage">
            <Header title="Редактирование/Добавление"/>
            <H1 text="Редактирование/Добавление"/>
            <FormEditCustomer fieldListProducts={fieldListProducts}
                              fieldListProductsArchive={fieldListProductsArchive}
                              fieldListCustomer={fieldListCustomer}
                              fieldListPhoneList={fieldListPhoneList}
                              fieldListEmail={fieldListEmail}
                              fieldListDescription={fieldListDescription}
                              fieldListReminder={fieldListReminder}
                              actionList={actionList}/>
        </div>
    );
});

export default CustomerEditPage;