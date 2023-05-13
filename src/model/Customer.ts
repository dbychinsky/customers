/**
 * Заказчик
 */
export class Customer {

    /**
     * id
     */
    id: number;

    /**
     * Организация
     */
    organization: string;

    /**
     * ФИО, контактное лицо
     */
    contactFace: string;

    /**
     * Номер телефона
     */
    phone: string;

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
        this.organization = '';
        this.contactFace = '';
        this.phone = '';
        this.description = '';
        this.reminder = false;
        this.reminderDate = new Date();
    }
}