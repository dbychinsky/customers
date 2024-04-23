import React, { ReactElement, useEffect } from 'react';
import styles from 'components/currencyRateBlock/CurrencyRateBlock.module.scss';
import { ReactComponent as IconAmountBYN } from 'common/assets/icon/currency/BYN.svg';
import { ReactComponent as IconAmountUSD } from 'common/assets/icon/currency/USD.svg';
import { ReactComponent as IconAmountEUR } from 'common/assets/icon/currency/EUR.svg';
import { ReactComponent as IconAmountRUB } from 'common/assets/icon/currency/RUB.svg';
import { ReactComponent as IconAmountPLN } from 'common/assets/icon/currency/PLN.svg';
import { ReactComponent as IconTrendingUp } from 'common/assets/icon/currency/trendingUp.svg';
import { ReactComponent as IconTrendingDown } from 'common/assets/icon/currency/trendingDown.svg';
import { ReactComponent as IconTrendingLine } from 'common/assets/icon/currency/trendingLine.svg';
import { CurrencyStore } from 'store/currencyStore/CurrencyStore';
import { InputField } from 'components/inputField/InputField';
import { InputFieldEnum } from 'components/inputField/types';
import { observer } from 'mobx-react';
import { VolatilityValueEnum } from 'utils/getVolatilityValue';
import { CurrencyListShortNameEnum, fractionEnum } from 'store/currencyStore/types';
import moment from 'moment';

interface CurrencyRateBlockProps {
    currencyStore: CurrencyStore;
}

/**
 * @description Вывод актуальных курсов.
 */
export const CurrencyRateBlock = observer(({ currencyStore }: CurrencyRateBlockProps) => {
    useEffect(() => {
        currencyStore.getAllCurrencyValueYesterday();
        currencyStore.getAllCurrencyValueToday();
    }, [currencyStore, currencyStore.radio]);

    return (
        <div className={styles.currencyRateBlock}>
            <div className={styles.rowDate}>
                <div className={styles.dateNow}>Курсы на дату (НацБанк):</div>
                <div className={styles.dateNowDate}>{moment(currencyStore.currentDate).format('LL')}</div>
            </div>
            <div className={styles.row}>
                <div className={styles.icon}>
                    <IconAmountBYN />
                </div>
                <div className={styles.amount}>
                    <InputField
                        value={currencyStore.amountBYN ? currencyStore.amountBYN : ''}
                        changeHandler={currencyStore.handleChangeFieldBYN}
                        name='amountBYN'
                        type={InputFieldEnum.text}
                        className={styles.inputField}
                        mask={false}
                    />
                </div>
                <div className={styles.iconRate}>
                    <div className={styles.iconRate}>{getIconCurrency(CurrencyListShortNameEnum.BYN)}</div>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.icon}>
                    <IconAmountUSD />
                </div>
                <div className={styles.amount}>
                    <InputField
                        value={currencyStore.amountUSD ? currencyStore.amountUSD : ''}
                        changeHandler={currencyStore.handleChangeFieldUSD}
                        name='amountUSD'
                        type={InputFieldEnum.text}
                        className={styles.inputField}
                        mask={false}
                    />
                </div>
                <div className={styles.iconRate}>{getIconCurrency(CurrencyListShortNameEnum.USD)}</div>
            </div>
            <div className={styles.row}>
                <div className={styles.icon}>
                    <IconAmountEUR />
                </div>
                <div className={styles.amount}>
                    <InputField
                        value={currencyStore.amountEUR ? currencyStore.amountEUR : ''}
                        changeHandler={currencyStore.handleChangeFieldEUR}
                        name='amountEUR'
                        type={InputFieldEnum.text}
                        className={styles.inputField}
                        mask={false}
                    />
                </div>
                <div className={styles.iconRate}>
                    <div className={styles.iconRate}>{getIconCurrency(CurrencyListShortNameEnum.EUR)}</div>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.icon}>
                    <IconAmountRUB />
                </div>
                <div className={styles.amount}>
                    <InputField
                        value={currencyStore.amountRUB}
                        changeHandler={currencyStore.handleChangeFieldRUB}
                        name='amountRUB'
                        type={InputFieldEnum.text}
                        className={styles.inputField}
                        mask={false}
                    />
                </div>
                <div className={styles.iconRate}>
                    <div className={styles.iconRate}>{getIconCurrency(CurrencyListShortNameEnum.RUB)}</div>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.icon}>
                    <IconAmountPLN />
                </div>
                <div className={styles.amount}>
                    <InputField
                        value={currencyStore.amountPLN ? currencyStore.amountPLN : ''}
                        changeHandler={currencyStore.handleChangeFieldPLN}
                        name='amountPLN'
                        type={InputFieldEnum.text}
                        className={styles.inputField}
                        mask={false}
                    />
                </div>
                <div className={styles.iconRate}>
                    <div className={styles.iconRate}>{getIconCurrency(CurrencyListShortNameEnum.PLN)}</div>
                </div>
            </div>
            <div className={styles.radio}>
                <div className={styles.radioButtonsPhoneWrapper}>
                    <input
                        type='radio'
                        value={currencyStore.radio}
                        checked={currencyStore.radio === fractionEnum.nonFraction}
                        onChange={() => currencyStore.setRadio(fractionEnum.nonFraction)}
                        className={styles.radioInput}
                        id='nonFraction'
                    />
                    <label className={styles.label} htmlFor='nonFraction'>
                        0
                    </label>
                    <input
                        type='radio'
                        value={currencyStore.radio}
                        checked={currencyStore.radio === fractionEnum.twoFraction}
                        onChange={() => currencyStore.setRadio(fractionEnum.twoFraction)}
                        className={styles.radioInput}
                        id='twoFraction'
                    />
                    <label className={styles.label} htmlFor='twoFraction'>
                        .00
                    </label>
                    <input
                        type='radio'
                        value={currencyStore.radio}
                        checked={currencyStore.radio === fractionEnum.fourFraction}
                        onChange={() => currencyStore.setRadio(fractionEnum.fourFraction)}
                        className={styles.radioInput}
                        id='fourFraction'
                    />
                    <label className={styles.label} htmlFor='fourFraction'>
                        .0000
                    </label>
                </div>
            </div>
        </div>
    );

    function getIconCurrency(currencyListShortNameEnum: string): ReactElement {
        const target = currencyStore.amountCurrencyConst.find(
            (amount) => amount.id === currencyListShortNameEnum,
        )?.volatility;

        let result: ReactElement = (
            <div className={styles.iconTrendingLine}>
                <IconTrendingLine />
            </div>
        );

        if (target === VolatilityValueEnum.down) {
            result = (
                <div className={styles.iconTrendingDown}>
                    <IconTrendingDown />
                </div>
            );
        }

        if (target === VolatilityValueEnum.up) {
            result = (
                <div className={styles.iconTrendingUp}>
                    <IconTrendingUp />
                </div>
            );
        }

        return result;
    }
});
