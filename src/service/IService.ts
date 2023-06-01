import {Contact} from "../model/Contact";
import {Setting} from "../model/Setting";

export interface IService {

    /**
     * Получение списка контактов
     */
    getContacts(): Promise<Contact[]>;

    /**
     * Сохранение контакта
     */
    addContact(contact: Contact): Promise<void>;

    /**
     * Обновление контакта
     */
    updateContact(id: string, data: any): Promise<void>

    /**
     * Удаление контакта
     */
    deleteContact(id: number): Promise<void>;

    /**
     * Получение списка опций
     */
    getSetting(): Promise<Setting>;

    /**
     * Обновление опций
     */
    updateSetting(setting: Setting): Promise<void>;

    /**
     * Получение курса валют на сегодня
     */
    getCurrencyList(date: string, cur_id: number): Promise<{}>;
}