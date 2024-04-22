import { makeAutoObservable, runInAction } from 'mobx';
import { server } from 'App';
import { ChangeEvent } from 'react';
import { getYesterdayDate } from 'utils/getYesterdayDate';
import { getNumberWithSpaces } from 'utils/getNumberWithSpaces';
import { getVolatilityValue } from 'utils/getVolatilityValue';
import {
    AmountCurrencyConstType,
    AmountCurrencyYesterdayConstType,
    CurrencyCodeEnum,
    CurrencyListShortNameEnum,
    fractionEnum,
} from 'store/currencyStore/types';

/**
 * @description Store для работы с курсами валют.
 */
export class CurrencyStore {
    /**
     * @description Флаг загрузки.
     */
    isLoading = false;

    /**
     * @description Список валют.
     */
    amountBYN = '1';
    amountUSD = '1';
    amountEUR = '1';
    amountRUB = '1';
    amountPLN = '1';

    /**
     * @description Список курсов валют.
     */
    amountCurrencyConst: AmountCurrencyConstType[] = [];

    /**
     * @description Список курсов валют "На вчера".
     */
    amountCurrencyConstYesterday: AmountCurrencyYesterdayConstType[] = [];

    /**
     * @description
     */
    radio: fractionEnum = fractionEnum.twoFraction;

    constructor() {
        makeAutoObservable(this);
        this.handleChangeFieldBYN = this.handleChangeFieldBYN.bind(this);
        this.handleChangeFieldUSD = this.handleChangeFieldUSD.bind(this);
        this.handleChangeFieldEUR = this.handleChangeFieldEUR.bind(this);
        this.handleChangeFieldRUB = this.handleChangeFieldRUB.bind(this);
        this.handleChangeFieldPLN = this.handleChangeFieldPLN.bind(this);
    }

    /**
     * @description Получение курса USD на сегодня.
     */
    getCurrencyValueUsdToday() {
        server
            .getCurrencyValueToday(CurrencyCodeEnum.USD)
            .then((currencyUsd) => {
                runInAction(() => {
                    this.amountCurrencyConst.push({
                        id: CurrencyListShortNameEnum.USD,
                        amount: currencyUsd.Cur_OfficialRate,
                        volatility: getVolatilityValue(
                            this.amountCurrencyConstYesterday,
                            CurrencyListShortNameEnum.USD,
                            currencyUsd.Cur_OfficialRate,
                        ),
                    });
                });
            })
            .catch((err) => {
                if (err.response) {
                    console.log('client received an error response (5xx, 4xx)');
                } else if (err.request) {
                    console.log('client never received a response, or request never left');
                }
            });
    }

    /**
     * @description Получение курса EUR на сегодня.
     */
    getCurrencyValueEurToday() {
        server
            .getCurrencyValueToday(CurrencyCodeEnum.EUR)
            .then((currencyEur) => {
                runInAction(() => {
                    this.amountCurrencyConst.push({
                        id: CurrencyListShortNameEnum.EUR,
                        amount: currencyEur.Cur_OfficialRate,
                        volatility: getVolatilityValue(
                            this.amountCurrencyConstYesterday,
                            CurrencyListShortNameEnum.EUR,
                            currencyEur.Cur_OfficialRate,
                        ),
                    });
                });
            })
            .catch((err) => {
                if (err.response) {
                    console.log('client received an error response (5xx, 4xx)');
                } else if (err.request) {
                    console.log('client never received a response, or request never left');
                }
            });
    }

    /**
     * @description Получение курса RUB на сегодня.
     */
    getCurrencyValueRubToday() {
        server
            .getCurrencyValueToday(CurrencyCodeEnum.RUB)
            .then((currencyRub) => {
                runInAction(() => {
                    this.amountCurrencyConst.push({
                        id: CurrencyListShortNameEnum.RUB,
                        amount: currencyRub.Cur_OfficialRate,
                        volatility: getVolatilityValue(
                            this.amountCurrencyConstYesterday,
                            CurrencyListShortNameEnum.RUB,
                            currencyRub.Cur_OfficialRate,
                        ),
                    });
                });
            })
            .catch((err) => {
                if (err.response) {
                    console.log('client received an error response (5xx, 4xx)');
                } else if (err.request) {
                    console.log('client never received a response, or request never left');
                }
            });
    }

    /**
     * @description Получение курса PLN на сегодня.
     */
    getCurrencyValuePlnToday() {
        server
            .getCurrencyValueToday(CurrencyCodeEnum.PLN)
            .then((currencyPln) => {
                runInAction(() => {
                    this.amountCurrencyConst.push({
                        id: CurrencyListShortNameEnum.PLN,
                        amount: currencyPln.Cur_OfficialRate,
                        volatility: getVolatilityValue(
                            this.amountCurrencyConstYesterday,
                            CurrencyListShortNameEnum.PLN,
                            currencyPln.Cur_OfficialRate,
                        ),
                    });
                });
            })
            .catch((err) => {
                if (err.response) {
                    console.log('client received an error response (5xx, 4xx)');
                } else if (err.request) {
                    console.log('client never received a response, or request never left');
                }
            });
    }

    /**
     * @description Начальная инициализация курсов.
     */
    setCurrency() {
        runInAction(() => {
            this.amountUSD = '1';
        });
        runInAction(() => {
            this.amountBYN = (
                Number(this.amountUSD) * this.getValueAmountFromConst(CurrencyListShortNameEnum.USD)
            ).toFixed(this.radio);
        });
        runInAction(() => {
            this.amountEUR = (
                (Number(this.amountUSD) * this.getValueAmountFromConst(CurrencyListShortNameEnum.USD)) /
                this.getValueAmountFromConst(CurrencyListShortNameEnum.EUR)
            ).toFixed(this.radio);
        });
        runInAction(() => {
            this.amountRUB = (
                Number(this.amountUSD) *
                this.getValueAmountFromConst(CurrencyListShortNameEnum.USD) *
                (100 / this.getValueAmountFromConst(CurrencyListShortNameEnum.RUB))
            ).toFixed(this.radio);
        });
        runInAction(() => {
            this.amountPLN = (
                Number(this.amountUSD) *
                this.getValueAmountFromConst(CurrencyListShortNameEnum.USD) *
                (10 / this.getValueAmountFromConst(CurrencyListShortNameEnum.PLN))
            ).toFixed(this.radio);
        });
    }

    /**
     * @description Получение всех курсов на сегодня.
     */
    getAllCurrencyValueToday() {
        this.getCurrencyValueUsdToday();
        this.getCurrencyValueEurToday();
        this.getCurrencyValueRubToday();
        this.getCurrencyValuePlnToday();
        this.setCurrency();
    }

    /**
     * @description Получение курса USD на вчера.
     */
    getCurrencyValueUsdYesterday() {
        server
            .getCurrencyValueTargetDay(getYesterdayDate(), CurrencyCodeEnum.USD)
            .then((currencyUsd) => {
                runInAction(() => {
                    this.amountCurrencyConstYesterday.push({
                        id: CurrencyListShortNameEnum.USD,
                        amount: currencyUsd.Cur_OfficialRate,
                    });
                });
            })
            .catch((err) => {
                if (err.response) {
                    console.log('client received an error response (5xx, 4xx)');
                } else if (err.request) {
                    console.log('client never received a response, or request never left');
                }
            });
    }

    /**
     * @description Получение курса EUR на сегодня.
     */
    getCurrencyValueEurYesterday() {
        server
            .getCurrencyValueTargetDay(getYesterdayDate(), CurrencyCodeEnum.EUR)
            .then((currencyEur) => {
                runInAction(() => {
                    this.amountCurrencyConstYesterday.push({
                        id: CurrencyListShortNameEnum.EUR,
                        amount: currencyEur.Cur_OfficialRate,
                    });
                });
            })
            .catch((err) => {
                if (err.response) {
                    console.log('client received an error response (5xx, 4xx)');
                } else if (err.request) {
                    console.log('client never received a response, or request never left');
                }
            });
    }

    /**
     * @description Получение курса RUB на сегодня.
     */
    getCurrencyValueRubYesterday() {
        server
            .getCurrencyValueTargetDay(getYesterdayDate(), CurrencyCodeEnum.RUB)
            .then((currencyRub) => {
                runInAction(() => {
                    this.amountCurrencyConstYesterday.push({
                        id: CurrencyListShortNameEnum.RUB,
                        amount: currencyRub.Cur_OfficialRate,
                    });
                });
            })
            .catch((err) => {
                if (err.response) {
                    console.log('client received an error response (5xx, 4xx)');
                } else if (err.request) {
                    console.log('client never received a response, or request never left');
                }
            });
    }

    /**
     * @description Получение курса PLN на сегодня.
     */
    getCurrencyValuePlnYesterday() {
        server
            .getCurrencyValueTargetDay(getYesterdayDate(), CurrencyCodeEnum.PLN)
            .then((currencyPln) => {
                runInAction(() => {
                    this.amountCurrencyConstYesterday.push({
                        id: CurrencyListShortNameEnum.PLN,
                        amount: currencyPln.Cur_OfficialRate,
                    });
                });
            })
            .catch((err) => {
                if (err.response) {
                    console.log('client received an error response (5xx, 4xx)');
                } else if (err.request) {
                    console.log('client never received a response, or request never left');
                }
            });
    }

    /**
     * @description Получение всех курсов на сегодня.
     */
    getAllCurrencyValueYesterday() {
        runInAction(() => {
            this.amountCurrencyConstYesterday = [];
        });
        this.getCurrencyValueUsdYesterday();
        this.getCurrencyValueEurYesterday();
        this.getCurrencyValueRubYesterday();
        this.getCurrencyValuePlnYesterday();
        console.log(this.amountCurrencyConstYesterday);
    }

    /**
     * @description Поле BYN.
     */
    handleChangeFieldBYN(e: ChangeEvent<HTMLInputElement>) {
        runInAction(() => {
            this.amountBYN = e.target.value;

            this.amountUSD = getNumberWithSpaces(
                (Number(this.amountBYN) / this.getValueAmountFromConst(CurrencyListShortNameEnum.USD)).toFixed(
                    this.radio,
                ),
            );

            this.amountEUR = getNumberWithSpaces(
                (Number(this.amountBYN) / this.getValueAmountFromConst(CurrencyListShortNameEnum.EUR)).toFixed(
                    this.radio,
                ),
            );

            this.amountRUB = getNumberWithSpaces(
                (Number(this.amountBYN) * (100 / this.getValueAmountFromConst(CurrencyListShortNameEnum.RUB))).toFixed(
                    this.radio,
                ),
            );

            this.amountPLN = getNumberWithSpaces(
                (Number(this.amountBYN) * (10 / this.getValueAmountFromConst(CurrencyListShortNameEnum.PLN))).toFixed(
                    this.radio,
                ),
            );
        });
    }

    /**
     * @description Поле USD.
     */
    handleChangeFieldUSD(e: ChangeEvent<HTMLInputElement>) {
        runInAction(() => {
            this.amountUSD = e.target.value;

            this.amountBYN = getNumberWithSpaces(
                (Number(this.amountUSD) * this.getValueAmountFromConst(CurrencyListShortNameEnum.USD)).toFixed(
                    this.radio,
                ),
            );

            this.amountEUR = getNumberWithSpaces(
                (
                    (Number(this.amountUSD) * this.getValueAmountFromConst(CurrencyListShortNameEnum.USD)) /
                    this.getValueAmountFromConst(CurrencyListShortNameEnum.EUR)
                ).toFixed(this.radio),
            );

            this.amountRUB = getNumberWithSpaces(
                (
                    Number(this.amountUSD) *
                    this.getValueAmountFromConst(CurrencyListShortNameEnum.USD) *
                    (100 / this.getValueAmountFromConst(CurrencyListShortNameEnum.RUB))
                ).toFixed(this.radio),
            );

            this.amountPLN = getNumberWithSpaces(
                (
                    Number(this.amountUSD) *
                    this.getValueAmountFromConst(CurrencyListShortNameEnum.USD) *
                    (10 / this.getValueAmountFromConst(CurrencyListShortNameEnum.PLN))
                ).toFixed(this.radio),
            );
        });
    }

    /**
     * @description Поле EUR.
     */
    handleChangeFieldEUR(e: ChangeEvent<HTMLInputElement>) {
        runInAction(() => {
            this.amountEUR = e.target.value;

            this.amountBYN = getNumberWithSpaces(
                (Number(this.amountEUR) * this.getValueAmountFromConst(CurrencyListShortNameEnum.EUR)).toFixed(
                    this.radio,
                ),
            );

            this.amountUSD = getNumberWithSpaces(
                (
                    (Number(this.amountEUR) * this.getValueAmountFromConst(CurrencyListShortNameEnum.EUR)) /
                    this.getValueAmountFromConst(CurrencyListShortNameEnum.USD)
                ).toFixed(this.radio),
            );

            this.amountRUB = getNumberWithSpaces(
                (
                    Number(this.amountEUR) *
                    this.getValueAmountFromConst(CurrencyListShortNameEnum.EUR) *
                    (100 / this.getValueAmountFromConst(CurrencyListShortNameEnum.RUB))
                ).toFixed(this.radio),
            );

            this.amountPLN = getNumberWithSpaces(
                (
                    Number(this.amountEUR) *
                    this.getValueAmountFromConst(CurrencyListShortNameEnum.EUR) *
                    (10 / this.getValueAmountFromConst(CurrencyListShortNameEnum.PLN))
                ).toFixed(this.radio),
            );
        });
    }

    /**
     * @description Поле RUB.
     */
    handleChangeFieldRUB(e: ChangeEvent<HTMLInputElement>) {
        runInAction(() => {
            this.amountRUB = e.target.value;

            this.amountBYN = getNumberWithSpaces(
                (Number(this.amountRUB) / (100 / this.getValueAmountFromConst(CurrencyListShortNameEnum.RUB))).toFixed(
                    this.radio,
                ),
            );

            this.amountUSD = getNumberWithSpaces(
                (
                    Number(this.amountRUB) /
                    (100 / this.getValueAmountFromConst(CurrencyListShortNameEnum.RUB)) /
                    this.getValueAmountFromConst(CurrencyListShortNameEnum.USD)
                ).toFixed(this.radio),
            );

            this.amountEUR = getNumberWithSpaces(
                (
                    Number(this.amountRUB) /
                    (100 / this.getValueAmountFromConst(CurrencyListShortNameEnum.RUB)) /
                    this.getValueAmountFromConst(CurrencyListShortNameEnum.EUR)
                ).toFixed(this.radio),
            );

            this.amountPLN = getNumberWithSpaces(
                (
                    Number(this.amountRUB) /
                    (100 / this.getValueAmountFromConst(CurrencyListShortNameEnum.RUB)) /
                    (this.getValueAmountFromConst(CurrencyListShortNameEnum.PLN) / 10)
                ).toFixed(this.radio),
            );
        });
    }

    /**
     * @description Поле PLN.
     */
    handleChangeFieldPLN(e: ChangeEvent<HTMLInputElement>) {
        runInAction(() => {
            this.amountPLN = e.target.value;

            this.amountBYN = getNumberWithSpaces(
                ((Number(this.amountPLN) / 10) * this.getValueAmountFromConst(CurrencyListShortNameEnum.PLN)).toFixed(
                    this.radio,
                ),
            );

            this.amountUSD = getNumberWithSpaces(
                (
                    ((Number(this.amountPLN) / 10) * this.getValueAmountFromConst(CurrencyListShortNameEnum.PLN)) /
                    this.getValueAmountFromConst(CurrencyListShortNameEnum.USD)
                ).toFixed(this.radio),
            );

            this.amountEUR = getNumberWithSpaces(
                (
                    ((Number(this.amountPLN) / 10) * this.getValueAmountFromConst(CurrencyListShortNameEnum.PLN)) /
                    this.getValueAmountFromConst(CurrencyListShortNameEnum.EUR)
                ).toFixed(this.radio),
            );

            this.amountRUB = getNumberWithSpaces(
                (
                    (Number(this.amountPLN) / 10) *
                    this.getValueAmountFromConst(CurrencyListShortNameEnum.PLN) *
                    (100 / this.getValueAmountFromConst(CurrencyListShortNameEnum.RUB))
                ).toFixed(this.radio),
            );
        });
    }

    /**
     * @description Получение значения валюты из списка костант валют.
     */
    getValueAmountFromConst(
        currency: CurrencyListShortNameEnum,
        amountCurrencyConst: AmountCurrencyConstType[] = this.amountCurrencyConst,
    ) {
        const target = amountCurrencyConst.find((item) => item.id === currency)?.amount;
        if (target) {
            return target;
        } else return 0;
    }

    /**
     * @description Переключение выбора дробной части суммы.
     */
    setRadio(value: fractionEnum) {
        runInAction(() => {
            this.radio = value;
        });
    }
}
