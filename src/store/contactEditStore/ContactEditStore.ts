import { makeAutoObservable, runInAction } from 'mobx';
import { Contact } from 'model/Contact';
import React from 'react';
import { server } from 'App';
import { Moment } from 'moment';
import {
    EmailListType,
    HistoryType,
    PhoneListType,
    PhoneTypeListEnum,
    ProductListType,
    ReminderType,
} from 'store/contactEditStore/types';
import axios from 'axios';
import { OldContact, PhoneListTypeOld } from 'model/OldContact';

const initialStateProduct = { id: '', productName: '', productComment: '' };

/**
 * @description Store для редактирования контактов.
 */
export class ContactEditStore {
    readonly MAIN_URL = process.env.REACT_APP_MAIN_URL;

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
    productList: ProductListType[] = [];

    /**
     * @description Список продукции Архив (буфер).
     */
    productListArchive: ProductListType[] = [];

    /**
     * @description Список продукции в полях формы.
     */
    productFields: ProductListType = initialStateProduct;

    /**
     * @description Список продукции в полях формы Архив.
     */
    productFieldsArchive: ProductListType = initialStateProduct;

    /**
     * @description Продукция вводимая вручную.
     */
    productNameField = '';

    /**
     * @description Продукция вводимая вручную Архив.
     */
    productNameFieldArchive = '';

    /**
     * @description История (буфер).
     */
    historyList: HistoryType[] = [];

    /**
     * @description Флаг загрузки.
     */
    isLoading = false;

    /**
     * @description Временный.
     */
    sourceContactList: OldContact[] = [];

    constructor() {
        makeAutoObservable(this);
        this.setPhoneList = this.setPhoneList.bind(this);
        this.setPhoneType = this.setPhoneType.bind(this);
        this.handleChangeFieldContact = this.handleChangeFieldContact.bind(this);
        this.handleChangeFieldsProduct = this.handleChangeFieldsProduct.bind(this);
        this.handleChangeFieldsProductArchive = this.handleChangeFieldsProductArchive.bind(this);
        this.handleChangeFieldProduct = this.handleChangeFieldProduct.bind(this);
        this.handleChangeFieldProductArchive = this.handleChangeFieldProductArchive.bind(this);
        this.handleChangeFieldsReminderComment = this.handleChangeFieldsReminderComment.bind(this);
        this.handleChangeFieldsReminderBell = this.handleChangeFieldsReminderBell.bind(this);
        this.handleChangeFieldsReminderDate = this.handleChangeFieldsReminderDate.bind(this);
    }

    /**
     * @description СОЗДАНИЕ контакта.
     */
    /**
     * @description Заполнение списка номеров телефонов.
     */
    setPhoneList(phoneNumber: string) {
        runInAction(() => {
            this.phoneList.push({
                number: phoneNumber,
                typeList:
                    this.phoneType === PhoneTypeListEnum.business
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
                ...this.productFields,
                [e.target.name]: e.target.value,
            };
        });
    }

    /**
     * @description Заполнение списка продукции в полях формы Архив.
     */
    handleChangeFieldsProductArchive(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        runInAction(() => {
            this.productFieldsArchive = {
                ...this.productFieldsArchive,
                [e.target.name]: e.target.value,
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
                productName: this.productNameField ? this.productNameField : this.productFields.productName,
                productComment: this.productFields.productComment,
            });
        });
        runInAction(() => {
            this.productFields.productComment = '';
            this.productNameField = '';
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
            this.productFieldsArchive.productComment = '';
            this.productNameFieldArchive = '';
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
     * @description Заполнение полей (кроме номера/типа телефона).
     */
    handleChangeFieldContact(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        runInAction(() => {
            this.contact = {
                ...this.contact,
                [e.target.name]: e.target.value,
            };
        });
    }

    /**
     * @description Валидация на доступность кнопки добавдения продукции.
     */
    isDisableButtonAddProducts(): boolean {
        return (
            (this.productFields.productName.length === 0 || this.productFields.productName === 'Выберите значение') &&
            this.productNameField.length === 0
        );
    }

    /**
     * @description Валидация на доступность кнопки добавдения продукции.
     */
    isDisableButtonAddProductsArchive(): boolean {
        return (
            (this.productFieldsArchive.productName.length === 0 ||
                this.productFieldsArchive.productName === 'Выберите значение') &&
            this.productNameFieldArchive.length === 0
        );
    }

    /**
     * @description Очистка полей формы создания нового контакта.
     */
    clearFieldsCreateContact() {
        runInAction(() => {
            this.contact = new Contact();
            this.phoneList = [];
            this.emailList = [];
            this.productList = [];
            this.productListArchive = [];
            this.historyList = [];
            this.productNameField = '';
            this.productNameFieldArchive = '';
            this.productFields = initialStateProduct;
            this.productFieldsArchive = initialStateProduct;
        });
    }

    /**
     * @description Заполнение Напоминания (Флаг).
     */
    handleChangeFieldsReminderBell(checked: boolean) {
        runInAction(() => {
            this.contact = {
                ...this.contact,
                reminder: {
                    bell: checked,
                    comment: this.contact.reminder.comment,
                    date: this.contact.reminder.date,
                },
            };
        });
    }

    /**
     * @description Заполнение Напоминания (Комментарий).
     */
    handleChangeFieldsReminderComment(e: React.ChangeEvent<HTMLTextAreaElement>) {
        runInAction(() => {
            this.contact = {
                ...this.contact,
                reminder: {
                    bell: this.contact.reminder.bell,
                    comment: e.target.value,
                    date: this.contact.reminder.date,
                },
            };
        });
    }

    /**
     * @description Заполнение Напоминания (Дата).
     */
    handleChangeFieldsReminderDate(date: Moment | null) {
        runInAction(() => {
            this.contact = {
                ...this.contact,
                reminder: {
                    bell: this.contact.reminder.bell,
                    comment: this.contact.reminder.comment,
                    date: date ? date.toDate() : new Date(),
                },
            };
        });
    }

    /**
     * @description Заполнение списка Истории (буфер).
     */
    setHistoryList(fieldDate: Date, fieldComment: string) {
        runInAction(() => {
            this.historyList.push({
                id: new Date().toString(),
                date: fieldDate,
                historyComment: fieldComment,
            });
        });
    }

    /**
     * @description Удаление списка истории (буфер).
     */
    deleteFromHistoryList(id: string) {
        runInAction(() => {
            this.historyList = this.historyList.filter((history) => history.id !== id);
        });
    }

    /**
     * @description Отправка данных на сервер.
     */
    async pushContact() {
        this.updateData();
        server.addContact(this.contact).then();
    }

    /**
     * @description РЕДАКТИРОВАНИЕ контакта.
     */
    /**
     * @description Получение контакта по id.
     */
    getContactById(idContact: string) {
        runInAction(() => {
            this.isLoading = true;
        });
        server
            .getContactById(idContact)
            .then((contact) => {
                runInAction(() => {
                    this.contact = contact;
                });
                runInAction(() => {
                    if (contact.phoneList.length) {
                        contact.phoneList.map((elem) => {
                            this.phoneList.push(elem);
                        });
                    }
                    if (contact.emailList.length) {
                        contact.emailList.map((elem) => {
                            this.emailList.push(elem);
                        });
                    }
                    if (contact.productList.length) {
                        contact.productList.map((elem) => {
                            this.productList.push(elem);
                        });
                    }
                    if (contact.productListArchive.length) {
                        contact.productListArchive.map((elem) => {
                            this.productListArchive.push(elem);
                        });
                    }
                    if (contact.historyList.length) {
                        contact.historyList.map((elem) => {
                            this.historyList.push(elem);
                        });
                    }
                });
            })
            .catch((err) => {
                if (err.response) {
                    console.log('client received an error response (5xx, 4xx)');
                } else if (err.request) {
                    console.log('client never received a response, or request never left');
                }
            })
            .finally(() => {
                setTimeout(() => {
                    runInAction(() => {
                        this.isLoading = false;
                    });
                }, 500);
            });
    }

    /**
     * @description Отправка редактированных данных на сервер.
     */
    async pushEditContact(idContact: string | undefined) {
        if (idContact) {
            this.updateData();
            server.updateContact(idContact, this.contact).then();
        }
    }

    /**
     * @description Обновление данных перед отправкой на сервер.
     */
    updateData() {
        runInAction(() => {
            this.contact = {
                ...this.contact,
                phoneList: this.phoneList,
            };
        });
        runInAction(() => {
            this.contact = {
                ...this.contact,
                emailList: this.emailList,
            };
        });
        runInAction(() => {
            this.contact = {
                ...this.contact,
                productList: this.productList,
            };
        });
        runInAction(() => {
            this.contact = {
                ...this.contact,
                productListArchive: this.productListArchive,
            };
        });
        runInAction(() => {
            this.contact = {
                ...this.contact,
                historyList: this.historyList,
            };
        });
    }

    /**
     * @description Обновление данных перед отправкой на сервер.
     */
    async convertContactList() {
        this.getSourceContactList()
            .then((response) => {
                runInAction(() => {
                    this.sourceContactList = response;
                });
            })
            .then(() => this.conversationData());
    }

    async getSourceContactList(): Promise<OldContact[]> {
        return await axios.get(`${this.MAIN_URL}/sourceContactList`).then((response) => response.data);
    }

    conversationData() {
        this.sourceContactList.forEach((item) => {
            runInAction(() => {
                this.contact.id = item.id.toString();
                this.contact.contactFace = item.contactFace;
                this.contact.organization = item.organization;
                this.contact.description = item.description;
                this.contact.address = '';
                this.contact.emailList = getItemFromItemListEmail(item.email);
                this.contact.phoneList = getItemFromItemListPhone(item.phoneList);
                this.contact.productList = getItemFromItemListProduct(item.products);
                this.contact.productListArchive = getItemFromItemListProduct(item.productsArchive);
                this.contact.historyList = [];
                this.contact.reminder = getItemFromItemListReminder(item.reminderDate, item.reminder);
            });

            function createUniqueID() {
                return 'id_' + Math.random().toString(36).substr(2, 9);
            }

            function getTypePhone(type: string): PhoneTypeListEnum {
                if (type == 'work') {
                    return PhoneTypeListEnum.business;
                } else {
                    return PhoneTypeListEnum.personal;
                }
            }

            function getItemFromItemListProduct(list: []): ProductListType[] {
                const newArray: ProductListType[] = [];

                for (let i = 0; i < list.length; i++) {
                    newArray.push({ id: createUniqueID(), productName: list[i], productComment: '' });
                }

                return newArray;
            }

            function getItemFromItemListPhone(list: PhoneListTypeOld[]): PhoneListType[] {
                const newArray: PhoneListType[] = [];
                list.forEach((itemList: PhoneListTypeOld) => {
                    newArray.push({ number: itemList.number, typeList: getTypePhone(itemList.typeList) });
                });

                return newArray;
            }

            function getItemFromItemListEmail(list: string): EmailListType[] {
                const newArray: EmailListType[] = [];
                newArray.push({ email: list });

                return newArray;
            }

            function getItemFromItemListReminder(reminderDate: Date, reminder: boolean): ReminderType {
                return { date: reminderDate, bell: reminder, comment: 'Позвонить' };
            }

            console.log(this.contact);
            server.addContact(this.contact).then();
        });
    }
}
