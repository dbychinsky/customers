import {Customer} from "../model/Customer";

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
}