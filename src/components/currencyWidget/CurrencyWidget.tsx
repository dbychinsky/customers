import React from 'react';
import styles from 'components/currencyWidget/CurrencyWidget.module.scss';
import { HeadingH2 } from 'components/headingH2/headingH2';
import { CurrencyStore } from 'store/currencyStore/CurrencyStore';
import { observer } from 'mobx-react';
import { CurrencyRateBlock } from 'components/currencyRateBlock/CurrencyRateBlock';
import { ButtonImage } from 'components/buttonImage/ButtonImage';
import { ReactComponent as Restart } from 'common/assets/icon/restart.svg';

interface CurrencyWidgetProps {
    currencyStore: CurrencyStore;
}

/**
 * @description Виджет курсов валют.
 */
export const CurrencyWidget = observer(({ currencyStore }: CurrencyWidgetProps) => {
    return (
        <div className={styles.currencyWidget}>
            <div className={styles.currencyHeader}>
                <HeadingH2 title='Конвертация валют' />
                <ButtonImage
                    onClick={getValueCurrency}
                    image={<Restart />}
                    onlyImage={true}
                    className={styles.buttonAddContact}
                />
            </div>
            <div className={styles.currencyWidgetWrapper}>
                <CurrencyRateBlock currencyStore={currencyStore} />
            </div>
        </div>
    );

    function getValueCurrency() {
        currencyStore.getAllCurrencyValueYesterday();
        currencyStore.getAllCurrencyValueToday();
    }
});
