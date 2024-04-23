export type AmountCurrencyConstType = { id: string; amount: number; volatility: string };
export type AmountCurrencyYesterdayConstType = { id: string; amount: number };

export enum fractionEnum {
    nonFraction = 0,
    twoFraction = 2,
    fourFraction = 4,
}

export enum CurrencyListFullNameEnum {
    BYN = 'Белорусский рубль',
    USD = 'Доллар США',
    EUR = 'Евро',
    RUB = 'Российский рубль',
    PLN = 'Польский злотый',
}

export enum CurrencyListShortNameEnum {
    BYN = 'BYN',
    USD = 'USD',
    EUR = 'EUR',
    RUB = 'RUB',
    PLN = 'PLN',
}

export enum CurrencyCodeEnum {
    BYN = 0,
    USD = 431,
    EUR = 451,
    RUB = 456,
    PLN = 452,
}

/**
 * @description Ответ сервера на запрос курса валют
 */
export type ResponseCurrencyPeriodType = {
    Cur_Abbreviation: string;
    Cur_ID: number;
    Cur_Name: string;
    Cur_OfficialRate: number;
    Cur_Scale: number;
    Date: string;
    Error_Message: string;
};
