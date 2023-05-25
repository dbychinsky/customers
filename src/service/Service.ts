import {IService} from "./IService";
import axios from "axios";
import {Contact} from "../model/Contact";
import {Setting} from "../model/Setting";

/**
 * Список URL валют
 */
const enum backendServerUrl {
    CONTACT = `contactList`,
    SETTING = `setting`
}

export class Server implements IService {
    readonly MAIN_URL = process.env.REACT_APP_MAIN_URL;
    readonly MAIN_URL_FAKE = ` http://localhost:3001`;

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

    /**
     * Получение настроек приложения
     */
    async getSetting(): Promise<Setting> {
        return await axios.get(`${this.MAIN_URL}/${backendServerUrl.SETTING}`)
            .then(response => response.data)
    }

    /**
     * Сохранение настроек приложения
     */
    async updateSetting(setting: Setting): Promise<void> {
        await axios.put(`${this.MAIN_URL}/${backendServerUrl.SETTING}`, setting)
    }

}

