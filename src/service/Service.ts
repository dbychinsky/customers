import axios from 'axios';
import { Contact } from 'model/Contact';
import { IService } from 'service/IService';
import { Product } from 'model/Product';
import { ResponseCurrencyPeriodType } from 'store/currencyStore/types';

/**
 * @description  Список URL валют.
 */
const enum serverUrl {
    CONTACT = `contactList`,
    PRODUCT = `productList`,
    SETTING = `setting`,
    RATES = `https://www.nbrb.by/api/exrates/rates`,
}

export class Server implements IService {
    readonly MAIN_URL_FAKE = ` http://localhost:3001`;
    readonly MAIN_URL = this.MAIN_URL_FAKE;

    // readonly MAIN_URL = process.env.REACT_APP_MAIN_URL;

    /**
     * @description  Получение списка контактов.
     */
    async getContacts(): Promise<Contact[]> {
        return await axios.get(`${this.MAIN_URL}/${serverUrl.CONTACT}`).then((response) => response.data);
    }

    /**
     * @description Получение контакта по id (Нет отдельного метода).
     */
    async getContactById(id: number): Promise<Contact> {
        return await axios
            .get(`${this.MAIN_URL}/${serverUrl.CONTACT}`)
            .then((response) => response.data.find((item: Contact) => item.id === id));
    }

    /**
     * @description  Добавление.
     * @param contact
     */
    async addContact(contact: Contact): Promise<void> {
        await axios.post(`${this.MAIN_URL}/${serverUrl.CONTACT}`, contact).then((response) => response.data.id);
    }

    /**
     * @description  Обновление.
     */
    async updateContact(id: number, data: Contact): Promise<void> {
        await axios.put(`${this.MAIN_URL}/${serverUrl.CONTACT}/${id}`, data);
    }

    /**
     * @description  Удаление.
     */
    async deleteContact(idContact: number): Promise<void> {
        await axios.delete(`${this.MAIN_URL}/${serverUrl.CONTACT}/${idContact}`);
    }

    /**
     * @description Получение списка продукции.
     */
    async getProducts(): Promise<Product[]> {
        return await axios.get(`${this.MAIN_URL}/${serverUrl.PRODUCT}`).then((response) => response.data);
    }

    /**
     * @description Получение курса валюты на сегодня.
     */
    async getCurrencyValueToday(cur_id: number): Promise<ResponseCurrencyPeriodType> {
        return await axios.get(`${serverUrl.RATES}/${cur_id}`).then((response) => response.data);
    }

    /**
     * @description Получение курса валюты на конкретный день.
     */
    async getCurrencyValueTargetDay(date: string, cur_id: number): Promise<ResponseCurrencyPeriodType> {
        return await axios.get(`${serverUrl.RATES}/${cur_id}?ondate=${date}`).then((response) => response.data);
    }
}
