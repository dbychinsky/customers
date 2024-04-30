import { Contact } from 'model/Contact';
import { Product } from 'model/Product';
import { ResponseCurrencyPeriodType } from 'store/currencyStore/types';

export interface IService {
    /**
     * @description Получение списка контактов.
     */
    getContacts(): Promise<Contact[]>;

    /**
     * @description Получение контакта по id (Нет отдельного метода).
     */
    getContactById(id: string): Promise<Contact>;

    /**
     * @description Сохранение контакта.
     */
    addContact(contact: Contact): Promise<void>;

    /**
     * @description Обновление контакта.
     */
    updateContact(id: string, data: never): Promise<void>;

    /**
     * @description Удаление контакта.
     */
    deleteContact(id: string): Promise<void>;

    /**
     * @description Получение списка продуктов.
     */
    getProducts(): Promise<Product[]>;

    /**
     * @description Получение курса валюты на сегодня.
     */
    getCurrencyValueToday(cur_id: number): Promise<ResponseCurrencyPeriodType>;

    /**
     * @description Получение курса валюты на конкретный день.
     */
    getCurrencyValueTargetDay(date: string, cur_id: number): Promise<ResponseCurrencyPeriodType>;
}
