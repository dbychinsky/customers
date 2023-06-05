import {IService} from "./IService";
import axios from "axios";
import {Contact} from "../model/Contact";
import {Setting} from "../component/deprecated/model/Setting";
import {ResponseCurrencyPeriod} from "../component/deprecated/model/ResponseCurrencyPeriod";

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

    /**
     * Получение курса USD на сегодня
     */
    getCurrencyList(date: string, cur_id: number): Promise<ResponseCurrencyPeriod> {
        return axios.get(`${backendServerUrl.RATES}/${cur_id}`)
            .then(response => response.data)
            .catch(err => {
                if (err.response) {
                    console.log("client received an error response (5xx, 4xx)")
                } else if (err.request) {
                    console.log("client never received a response, or request never left")

                } else {
                    console.log("anything else")
                }
            })
    };
}

