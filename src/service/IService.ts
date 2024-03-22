import {Contact} from '../model/Contact';

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
}