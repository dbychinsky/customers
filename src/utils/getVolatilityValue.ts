import { AmountCurrencyYesterdayConstType, CurrencyListShortNameEnum } from 'store/currencyStore/types';

export enum VolatilityValueEnum {
    up = 'up',
    down = 'down',
    noChange = 'noChange',
}

/**
 * @description Получение волатильности валют.
 */
export function getVolatilityValue(
    amountCurrencyConstYesterday: AmountCurrencyYesterdayConstType[],
    currencyId: CurrencyListShortNameEnum,
    currencySum: number,
): VolatilityValueEnum {
    const amountYesterday = amountCurrencyConstYesterday.find((item) => item.id === currencyId)?.amount;
    let result = VolatilityValueEnum.noChange;

    if (amountYesterday && amountYesterday > currencySum) {
        result = VolatilityValueEnum.down;
    }

    if (amountYesterday && amountYesterday < currencySum) {
        result = VolatilityValueEnum.up;
    }

    return result;
}
