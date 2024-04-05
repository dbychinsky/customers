import { makeAutoObservable, runInAction } from "mobx";
import { PhoneListType, PhoneTypeListEnum } from "model/types";
import { Contact } from "model/Contact";
import React from "react";
import { server } from "App";

/**
 * @description Store для редактирования контактов.
 */
export class ContactEditStore {

    /**
     * @description Контакт.
     */
    contact: Contact = new Contact();

    /**
     * @description Организация.
     */
    // organization: string = "";

    /**
     * @description ФИО, контактное лицо.
     */
    // contactFace: string = "";

    /**
     * @description Комментарии.
     */
    // description: string = "";

    /**
     * @description Список телефонов (буфер).
     */
    phoneList: PhoneListType[] = [];

    /**
     * @description Тип телефона.
     */
    phoneType: PhoneTypeListEnum = PhoneTypeListEnum.business;

    constructor() {
        makeAutoObservable(this);
        this.setPhoneList = this.setPhoneList.bind(this);
        this.setPhoneType = this.setPhoneType.bind(this);
        this.handleChangeField = this.handleChangeField.bind(this);
    }

    // setOrganization(organization: string) {
    //     runInAction(() => {
    //         this.organization = organization;
    //     });
    // }
    //
    // setContactFace(contactFace: string) {
    //     runInAction(() => {
    //         this.contactFace = contactFace;
    //     });
    // }
    //
    // setDescription(description: string) {
    //     runInAction(() => {
    //         this.description = description;
    //     });
    // }

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
     * @description Установка тиа телефона.
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
        });
    };

    /**
     * @description Отправка данных на сервер.
     */
    pushContact() {
        server.addContact(this.contact).then();
    }

}
