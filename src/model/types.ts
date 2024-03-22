export type PhoneListType = {

    /**
     * @description Номер телефона.
     */
    number: string;

    /**
     * @description Аттрибуты.
     */
    typeList: string[];
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
