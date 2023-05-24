import {IService} from "./IService";
import axios from "axios";
import {Customer} from "../model/Customer";
import {Setting} from "../model/Setting";

/**
 * Список URL валют
 */
const enum backendServerUrl {
    CUSTOMER = `customerList`,
    SETTING = `setting`
}

export class Server implements IService {
    readonly MAIN_URL = process.env.REACT_APP_MAIN_URL;
    readonly MAIN_URL_FAKE = ` http://localhost:3001`;

    /**
     * Получение списка заказчиков
     */
    async getCustomers(): Promise<Customer[]> {
        return await axios.get(`${this.MAIN_URL_FAKE}/${backendServerUrl.CUSTOMER}`)
            .then(response => response.data)
    }

    /**
     * Добавление
     * @param customer
     */
    async addCustomer(customer: Customer): Promise<void> {
        await axios.post(`${this.MAIN_URL_FAKE}/${backendServerUrl.CUSTOMER}`, customer)
            .then((response) => response.data.id)
    }

    /**
     * Обновление
     */
    async updateCustomer(id: string, data: any): Promise<void> {
        await axios.put(`${this.MAIN_URL_FAKE}/${backendServerUrl.CUSTOMER}/${id}`, data)
    };

    /**
     * Удаление
     */
    async deleteCustomer(idCustomer: number): Promise<void> {
        await axios.delete(`${this.MAIN_URL_FAKE}/${backendServerUrl.CUSTOMER}/${idCustomer}`);
    };

    /**
     * Получение настроек приложения
     */
    async getSetting(): Promise<Setting> {
        return await axios.get(`${this.MAIN_URL_FAKE}/${backendServerUrl.SETTING}`)
            .then(response => response.data)
    }

    /**
     * Сохранение настроек приложения
     */

    // async saveCustomer(data): Promise<void> {
    //     await axios.put(`${this.MAIN_URL_FAKE}/${backendServerUrl.CUSTOMER}/${id}`, data)
    // };

    async updateSetting(setting: Setting): Promise<void> {
        await axios.put(`${this.MAIN_URL_FAKE}/${backendServerUrl.SETTING}`, setting)
    }

}

