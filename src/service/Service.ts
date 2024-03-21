import {IService} from "./IService";
import axios from "axios";
import {Contact} from "../model/Contact";

/**
 * Список URL валют
 */
const enum backendServerUrl {
    CONTACT = `contactList`,
    SETTING = `setting`,
    RATES = `https://www.nbrb.by/api/exrates/rates`
}

export class Server implements IService {
    readonly MAIN_URL_FAKE = ` http://localhost:3001`;
    // readonly MAIN_URL = this.MAIN_URL_FAKE;
    readonly MAIN_URL = process.env.REACT_APP_MAIN_URL;


    /**
     * Получение списка контактов
     */
    async getContacts(): Promise<Contact[]> {
        return await axios.get(`${this.MAIN_URL}/${backendServerUrl.CONTACT}`)
            .then(response => response.data)
    }

    /**
     * Добавление
     * @param contact
     */
    async addContact(contact: Contact): Promise<void> {
        await axios.post(`${this.MAIN_URL}/${backendServerUrl.CONTACT}`, contact)
            .then((response) => response.data.id)
    }

    /**
     * Обновление
     */
    async updateContact(id: string, data: any): Promise<void> {
        await axios.put(`${this.MAIN_URL}/${backendServerUrl.CONTACT}/${id}`, data)
    };

    /**
     * Удаление
     */
    async deleteContact(idContact: number): Promise<void> {
        await axios.delete(`${this.MAIN_URL}/${backendServerUrl.CONTACT}/${idContact}`);

    };
}
