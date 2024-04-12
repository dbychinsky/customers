import { Contact } from 'model/Contact';

export interface IService {
    /**
     * @description Получение списка контактов.
     */
    getContacts(): Promise<Contact[]>;

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
    deleteContact(id: number): Promise<void>;

    /**
     * @description Получение списка продуктов.
     */
    getProducts(): Promise<[]>;
}
