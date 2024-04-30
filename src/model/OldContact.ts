export type PhoneListTypeOld = {
    /**
     * Номер телефона
     */
    number: string;

    /**
     * Аттрибуты
     */
    typeList: string;
};

/**
 * Контакт
 */
export class OldContact {
    /**
     * id
     */
    id: number;

    /**
     * Продукция
     */
    products: [];

    /**
     * Продукция для архива
     */
    productsArchive: [];

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
    phoneList: PhoneListTypeOld[];

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
