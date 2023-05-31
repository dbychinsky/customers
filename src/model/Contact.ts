export type PhoneListType = {

    /**
     * Номер телефона
     */
    number: string;

    /**
     * Аттрибуты
     */
    typeList: string[];

}

/**
 * Контакт
 */
export class Contact {

    /**
     * id
     */
    id: number;

    /**
     * Продукция
     */
    products: string[];

    /**
     * Продукция для архива
     */
    productsArchive: string[];

    /**
     * ФИО, контактное лицо
     */
    contactFace: string;

    /**
     * Организация
     */
    organization: string;

    /**
     * Список телефонов
     */
    // phoneList: [{ number: string, typeList: string[] }];
    phoneList: PhoneListType[];

    /**
     * Email телефона
     */
    email: string;

    /**
     * Описание
     */
    description: string;

    /**
     * Флаг напоминания
     */
    reminder: boolean;

    /**
     * Дата и время напоминания
     */
    reminderDate: Date;

    constructor() {
        this.id = 0;
        this.products = [];
        this.productsArchive = [];
        this.contactFace = '';
        this.organization = '';
        this.phoneList = [];
        this.email = '';
        this.description = '';
        this.reminder = false;
        this.reminderDate = new Date();
    }
}