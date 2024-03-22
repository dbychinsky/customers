export type PhoneListType = {

    /**
     * @description Номер телефона.
     */
    number: string;

    /**
     * @description Аттрибуты.
     */
    typeList: PhoneTypeListEnum;
}

export enum PhoneTypeListEnum {
    personal = "personal",
    business = "business",
}

export type HistoryType = {

    /**
     * @description Дата совершеннного события.
     */
    date: Date;

    /**
     * @description Событие.
     */
    action: string;
}

export type ProductType = {

    /**
     * @description Название продукта.
     */
    productName: string;

    /**
     * @description Комментарий.
     */
    productComment: string;
}