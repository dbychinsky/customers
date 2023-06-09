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
import "./ContactEditPage.scss";
import FormEditContact from "../../component/formEditContact/FormEditContact";
import H1 from "../../component/header/H1";
import InputPhoneNumber from "../../component/inputPhoneNumber/inputPhoneNumber";

/**
 * Страница редактирования/добавления контакта
 */
const ContactEditPage = observer(() => {

    const contactStore = useContext(StoreContext).contactStore;
    const [startDate, setStartDate] = useState(new Date());
    const navigate = useNavigate();
    const {id} = useParams();

    /**
     * Получение значения Места для редактирования и установка в state
     */
    useEffect(() => {
        if (id !== undefined) {
            contactStore.setEditPlace(Number(id));
            setStartDate(Conversation.dateToDateUTC(contactStore.getDateForState(Number(id))));
        } else {
            contactStore.setEditPlace();
        }

        return () => {
            contactStore.clearPhoneList();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Сохраняем новый контакт
     */
    const save = () => {
        if (!id) {
            contactStore.save(startDate);
        } else {
            contactStore.update(id, contactStore.newContact, startDate);
        }
        contactStore.deleteRecordListNotification(id);
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
            field: <InputTextField value={contactStore.product}
                                   changeHandler={contactStore.handleChangeProducts}
                                   name="products"
                                   type="text"/>
        }
    ];
    const fieldListProductsArchive: Field[] = [
        {
            name: "productsArchive",
            label: "Продукция в архиве",
            field: <InputTextField value={contactStore.productArchive}
                                   changeHandler={contactStore.handleChangeProductsArchive}
                                   name="productsArchive"
                                   type="text"/>
        }
    ];
    const fieldListContact: Field[] = [
        {
            name: "organization",
            label: "Организация",
            field: <InputTextField
                value={contactStore.newContact.organization}
                changeHandler={contactStore.handleChange}
                name="organization"
                type="text"/>
        },
        {
            name: "contactFace",
            label: "ФИО",
            field: <InputTextField
                value={contactStore.newContact.contactFace}
                changeHandler={contactStore.handleChange}
                name="contactFace"
                type="text"/>
        }];

    const fieldListPhoneList: Field[] = [
        {
            name: "phoneList",
            label: "Номер телефона",
            field: <InputPhoneNumber/>
        }
    ]

    const fieldListEmail: Field[] = [
        {
            name: "email",
            label: "Email",
            field: <InputTextField
                value={contactStore.newContact.email}
                changeHandler={contactStore.handleChange}
                name="email"
                type="text"/>
        }];
    const fieldListDescription: Field[] = [{
        name: "description",
        label: "Описание",
        field: <TextAreaField
            value={contactStore.newContact.description}
            changeHandler={contactStore.handleChange}
            name="description"
            type="text"/>
    }];
    const fieldListReminder: Field[] = [
        {
            name: "reminder",
            label: "Напоминание",
            field: <InputCheckboxField
                id="reminder"
                value={contactStore.newContact.reminder}
                changeHandler={contactStore.handleChangeCheckbox}
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
            action: <button className="button mainAction" tabIndex={1} onClick={save}>Сохранить</button>
        },
        {
            name: "cancel",
            action: <button className="button" tabIndex={1} onClick={() => exit()}>выйти</button>
        }
    ];

    return (
        <div className="contactEditPage">
            <H1 text="Редактирование/Добавление"/>
            <FormEditContact fieldListProducts={fieldListProducts}
                             fieldListProductsArchive={fieldListProductsArchive}
                             fieldListContact={fieldListContact}
                             fieldListPhoneList={fieldListPhoneList}
                             fieldListEmail={fieldListEmail}
                             fieldListDescription={fieldListDescription}
                             fieldListReminder={fieldListReminder}
                             actionList={actionList}/>
        </div>
    );
});

export default ContactEditPage;