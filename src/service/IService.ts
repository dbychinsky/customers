import {Customer} from "../model/Customer";

export interface IService {

    /**
     * Получение списка заказчиков
     */
    getCustomers(): Promise<Customer[]>;

    /**
     * Сохранение заказчика
     */
    saveCustomer(customer: Customer): Promise<void>;

    /**
     * Удаление заказчика
     */
    deleteCustomer(id: number): Promise<void>;
}