/**
 * Заказчик
 */
export class Customer {

    /**
     * id
     */
    id: string;

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

    constructor() {
        this.id = '';
        this.organization = '';
        this.contactFace = '';
        this.phone = '';
        this.description = '';
    }
}