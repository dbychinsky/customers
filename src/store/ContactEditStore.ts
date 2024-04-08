import { makeAutoObservable, runInAction } from "mobx";
import { PhoneListType, PhoneTypeListEnum } from "model/types";
import { Contact } from "model/Contact";
import React from "react";
import { server } from "App";
import { FieldError } from "components/inputField/types";
import { ContactListStore } from "store/ContactListStore";

/**
 * @description Store для редактирования контактов.
 */
export class ContactEditStore {

    /**
     * @description Контакт.
     */
    contact: Contact = new Contact();

    /**
     * @description Список телефонов (буфер).
     */
    phoneList: PhoneListType[] = [];

    /**
     * @description Тип телефона.
     */
    phoneType: PhoneTypeListEnum = PhoneTypeListEnum.business;

    /**
     * @description Список ошибок.
     */
    errorList: FieldError[] = [];

    constructor() {
        makeAutoObservable(this);
        this.setPhoneList = this.setPhoneList.bind(this);
        this.setPhoneType = this.setPhoneType.bind(this);
        this.handleChangeField = this.handleChangeField.bind(this);
    }

    /**
     * @description Заполнение списка номеров телефонов.
     */
    setPhoneList(phoneNumber: string) {
        runInAction(() => {
            this.phoneList.push({
                number: phoneNumber, typeList: this.phoneType === PhoneTypeListEnum.business
                    ? PhoneTypeListEnum.business
                    : PhoneTypeListEnum.personal,
            });
        });
    }

    /**
     * @description Установка типа телефона.
     */
    setPhoneType(type: PhoneTypeListEnum) {
        runInAction(() => {
            this.phoneType = type;
        });
    }

    /**
     * @description Удаление номера телефона.
     */
    deleteFromPhoneList(phoneNumber: string) {
        runInAction(() => {
            this.phoneList = this.phoneList.filter((phone) => phone.number !== phoneNumber);
        });
    }

    /**
     * @description Заполнение полей (кроме номера/типа телефона).
     */
    handleChangeField(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        runInAction(() => {
            this.contact = {
                ...this.contact, [e.target.name]: e.target.value,
            };
            this.errorList = this.errorList.filter((item) => item.field !== e.target.name);
        });
    };

    /**
     * @description Валидация.
     */
    validateFields() {
        runInAction(() => {
            this.errorList = [];
        });
        if (this.contact.contactFace.length === 0) {
            runInAction(() => {
                this.errorList.push({ field: "contactFace", message: "Поле не может быть пустым" });
            });
        }
    }

    /**
     * @description Отправка данных на сервер.
     */
    pushContact() {
        if (this.errorList.length === 0) {
            server.addContact(this.contact).then();
        }
    }
}
