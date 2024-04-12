export type PhoneListType = {
    /**
     * @description Номер телефона.
     */
    number: string;
    /**
     * @description Аттрибуты.
     */
    typeList: PhoneTypeListEnum;
};

export type EmailListType = {
    /**
     * @description Электронная почта.
     */
    email: string;
};

export enum PhoneTypeListEnum {
    personal = 'personal',
    business = 'business',
}

export type HistoryType = {
    /**
     * @description Идентификатор.
     */
    id: string;
    /**
     * @description Дата совершеннного события.
     */
    date: Date;
    /**
     * @description Событие.
     */
    action: string;
};

export type ProductType = {
    /**
     * @description Идентификатор.
     */
    id: string;
    /**
     * @description Название продукта.
     */
    productName: string;
    /**
     * @description Комментарий.
     */
    productComment: string;
};

export type ReminderType = {
    /**
     * @description Флаг срабатывания.
     */
    bell: string;
    /**
     * @description Дата.
     */
    date: Date;
    /**
     * @description Комментарий.
     */
    comment: string;
};
