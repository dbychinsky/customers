import {Customer} from "../model/Customer";
import {Setting} from "../model/Setting";

export interface IService {

    /**
     * Получение списка заказчиков
     */
    getCustomers(): Promise<Customer[]>;

    /**
     * Сохранение заказчика
     */
    addCustomer(customer: Customer): Promise<void>;

    /**
     * Обновление заказчика
     */
    updateCustomer(id: string, data: any): Promise<void>

    /**
     * Удаление заказчика
     */
    deleteCustomer(id: number): Promise<void>;

    /**
     * Получение списка опций
     */
    getSetting(): Promise<Setting>;

    /**
     * Обновление опций
     */
    updateSetting(setting: Setting): Promise<void>;
}