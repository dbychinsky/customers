/**
 * Заказчик
 */
import {ProductList} from "./ProductList";

export class Customer {

    /**
     * id
     */
    id: number;

    /**
     * Продукция
     */
    products: ProductList[];

    /**
     * ФИО, контактное лицо
     */
    contactFace: string;

    /**
     * Организация
     */
    organization: string;

    /**
     * Номер телефона
     */
    phone: string;

    /**
     * Номер телефона
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
        this.contactFace = '';
        this.organization = '';
        this.phone = '';
        this.email = '';
        this.description = '';
        this.reminder = false;
        this.reminderDate = new Date();
    }
}