import { EmailListType, HistoryType, PhoneListType, ProductListType, ReminderType } from 'model/types';

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
    productList: ProductListType[];

    /**
     * @description Продукция в архиве.
     */
    productListArchive: ProductListType[];

    /**
     * @description Список телефонов.
     */
    phoneList: PhoneListType[];

    /**
     * @description Email.
     */
    emailList: EmailListType[];

    /**
     * @description Физический адрес.
     */
    address: string;

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
    reminder: ReminderType | null;

    constructor() {
        this.id = 0;
        this.organization = '';
        this.contactFace = '';
        this.productList = [];
        this.productListArchive = [];
        this.phoneList = [];
        this.emailList = [];
        this.address = '';
        this.description = '';
        this.history = [];
        this.reminder = null;
    }
}
