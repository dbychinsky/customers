import {HistoryType, PhoneListType, ProductType} from "model/types";

/**
 * @description Контакт.
 */
export class Contact {

    /**
     * @description id.
     */
    id: number;

    /**
     * @description Организация.
     */
    organization: string;

    /**
     * @description ФИО, контактное лицо.
     */
    contactFace: string;

    /**
     * @description Продукция.
     */
    productList: ProductType[];

    /**
     * @description Продукция в архиве.
     */
    productListArchive: ProductType[];

    /**
     * @description Список телефонов.
     */
    phoneList: PhoneListType[];

    /**
     * @description Email.
     */
    email: string;

    /**
     * @description Комментарии.
     */
    description: string;

    /**
     * @description История.
     */
    history: HistoryType[];

    /**
     * @description Флаг напоминания.
     */
    reminder: boolean;

    /**
     * @description Дата и время напоминания.
     */
    reminderDate: Date;

    constructor() {
        this.id = 0;
        this.organization = "";
        this.contactFace = "";
        this.productList = [];
        this.productListArchive = [];
        this.phoneList = [];
        this.email = "";
        this.description = "";
        this.history = [];
        this.reminder = false;
        this.reminderDate = new Date();
    }
}