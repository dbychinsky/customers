import { makeAutoObservable, runInAction } from "mobx";
import { EmailListType, PhoneListType, PhoneTypeListEnum, ProductType } from "model/types";
import { Contact } from "model/Contact";
import React from "react";
import { server } from "App";
import { FieldError } from "components/inputField/types";

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
     * @description Список emails (буфер).
     */
    emailList: EmailListType[] = [];

    /**
     * @description Список продукции (буфер).
     */
    productList: ProductType[] = [];

    /**
     * @description Список продукции Архив (буфер).
     */
    productListArchive: ProductType[] = [];

    /**
     * @description Список продукции в полях формы.
     */
    productFields: ProductType = { id: "", productName: "", productComment: "" };

    /**
     * @description Список продукции в полях формы Архив.
     */
    productFieldsArchive: ProductType = { id: "", productName: "", productComment: "" };

    /**
     * @description Продукция вводимая вручную.
     */
    productNameField: string = "";

    /**
     * @description Продукция вводимая вручную Архив.
     */
    productNameFieldArchive: string = "";

    /**
     * @description Список ошибок.
     */
    errorList: FieldError[] = [];

    constructor() {
        makeAutoObservable(this);
        this.setPhoneList = this.setPhoneList.bind(this);
        this.setPhoneType = this.setPhoneType.bind(this);
        this.handleChangeFieldContact = this.handleChangeFieldContact.bind(this);
        this.handleChangeFieldsProduct = this.handleChangeFieldsProduct.bind(this);
        this.handleChangeFieldsProductArchive = this.handleChangeFieldsProductArchive.bind(this);
        this.handleChangeFieldProduct = this.handleChangeFieldProduct.bind(this);
        this.handleChangeFieldProductArchive = this.handleChangeFieldProductArchive.bind(this);
        this.clearFieldsCreateContact = this.clearFieldsCreateContact.bind(this);
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
     * @description Заполнение списка emails.
     */
    setEmailList(email: string) {
        runInAction(() => {
            this.emailList.push({ email: email });
        });
    }

    /**
     * @description Удаление email.
     */
    deleteFromEmailList(emailProps: string) {
        runInAction(() => {
            this.emailList = this.emailList.filter((email) => email.email !== emailProps);
        });
    }

    /**
     * @description Заполнение списка продукции в полях формы.
     */
    handleChangeFieldsProduct(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        runInAction(() => {
            this.productFields = {
                ...this.productFields, [e.target.name]: e.target.value,
            };
        });
    }

    /**
     * @description Заполнение списка продукции в полях формы Архив.
     */
    handleChangeFieldsProductArchive(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        runInAction(() => {
            this.productFieldsArchive = {
                ...this.productFieldsArchive, [e.target.name]: e.target.value,
            };
        });
    }

    /**
     * @description Заполнение списка продукции(буфер).
     */
    setProductList() {
        runInAction(() => {
            this.productList.push({
                id: new Date().toString(),
                productName: this.productNameField
                    ? this.productNameField
                    : this.productFields.productName,
                productComment: this.productFields.productComment,
            });
        });
        runInAction(() => {
            this.productFields.productComment = "";
            this.productNameField = "";
        });
    }

    /**
     * @description Заполнение списка продукции Архив (буфер).
     */
    setProductListArchive() {
        runInAction(() => {
            this.productListArchive.push({
                id: new Date().toString(),
                productName: this.productNameFieldArchive
                    ? this.productNameFieldArchive
                    : this.productFieldsArchive.productName,
                productComment: this.productFieldsArchive.productComment,
            });
        });
        runInAction(() => {
            this.productFieldsArchive.productComment = "";
            this.productNameFieldArchive = "";
        });
    }

    /**
     * @description Заполнение продукции вручную.
     */
    handleChangeFieldProduct(e: React.ChangeEvent<HTMLInputElement>) {
        runInAction(() => {
            this.productNameField = e.target.value;
        });
    }

    /**
     * @description Заполнение продукции вручную Архив.
     */
    handleChangeFieldProductArchive(e: React.ChangeEvent<HTMLInputElement>) {
        runInAction(() => {
            this.productNameFieldArchive = e.target.value;
        });
    }

    /**
     * @description Удаление продукции.
     */
    deleteFromProductList(id: string) {
        runInAction(() => {
            this.productList = this.productList.filter((product) => product.id !== id);
        });
    }

    /**
     * @description Удаление продукции Архив.
     */
    deleteFromProductListArchive(id: string) {
        runInAction(() => {
            this.productListArchive = this.productListArchive.filter((product) => product.id !== id);
        });
    }

    /**
     * @description Очистка списка продукции(буфер).
     */
    clearFieldsProduct() {
        runInAction(() => {
            this.productFields.productComment = "";
            this.productNameField = "";
        });
    }

    /**
     * @description Очистка списка продукции Архив(буфер).
     */
    clearFieldsProductArchive() {
        runInAction(() => {
            this.productFieldsArchive.productComment = "";
            this.productNameFieldArchive = "";
        });
    }

    /**
     * @description Заполнение полей (кроме номера/типа телефона).
     */
    handleChangeFieldContact(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
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
    async pushContact() {
        if (this.errorList.length === 0) {
            runInAction(() => {
                this.contact = {
                    ...this.contact, phoneList: this.phoneList,
                };
            });
            runInAction(() => {
                this.contact = {
                    ...this.contact, emailList: this.emailList,
                };
            });
            runInAction(() => {
                this.contact = {
                    ...this.contact, productList: this.productList,
                };
            });
            runInAction(() => {
                this.contact = {
                    ...this.contact, productListArchive: this.productListArchive,
                };
            });

            server.addContact(this.contact).then();
        }
    }

    /**
     * @description Валидация на доступность кнопки добавдения продукции.
     */
    isDisableButtonAddProducts(): boolean {
        return (this.productFields.productName.length === 0
                || this.productFields.productName === "Выберите значение")
            && this.productNameField.length === 0;
    }

    /**
     * @description Валидация на доступность кнопки добавдения продукции.
     */
    isDisableButtonAddProductsArchive(): boolean {
        return (this.productFieldsArchive.productName.length === 0
                || this.productFieldsArchive.productName === "Выберите значение")
            && this.productNameFieldArchive.length === 0;
    }

    /**
     * @description Очистка полей формы создания нового контакта.
     */
    clearFieldsCreateContact() {
        this.contact = new Contact();
        this.productList = [];
        this.productListArchive = [];
    }
}
