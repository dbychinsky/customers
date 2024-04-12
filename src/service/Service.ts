import axios from 'axios';
import { Contact } from 'model/Contact';
import { IService } from 'service/IService';

/**
 * @description  Список URL валют.
 */
const enum backendServerUrl {
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
        return await axios.get(`${this.MAIN_URL}/${backendServerUrl.CONTACT}`).then((response) => response.data);
    }

    /**
     * @description  Добавление.
     * @param contact
     */
    async addContact(contact: Contact): Promise<void> {
        await axios.post(`${this.MAIN_URL}/${backendServerUrl.CONTACT}`, contact).then((response) => response.data.id);
    }

    /**
     * @description  Обновление.
     */
    async updateContact(id: string, data: never): Promise<void> {
        await axios.put(`${this.MAIN_URL}/${backendServerUrl.CONTACT}/${id}`, data);
    }

    /**
     * @description  Удаление.
     */
    async deleteContact(idContact: number): Promise<void> {
        await axios.delete(`${this.MAIN_URL}/${backendServerUrl.CONTACT}/${idContact}`);
    }

    /**
     * @description Получение списка продукции.
     */
    async getProducts(): Promise<[]> {
        return await axios.get(`${this.MAIN_URL}/${backendServerUrl.PRODUCT}`).then((response) => response.data);
    }
}
