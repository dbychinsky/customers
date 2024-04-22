import React from 'react';
import styles from 'components/currencyWidget/CurrencyWidget.module.scss';
import { HeadingH2 } from 'components/headingH2/headingH2';
import { CurrencyStore } from 'store/currencyStore/CurrencyStore';
import { observer } from 'mobx-react';
import { CurrencyRateBlock } from 'components/currencyRateBlock/CurrencyRateBlock';

interface CurrencyWidgetProps {
    currencyStore: CurrencyStore;
}

/**
 * @description Виджет курсов валют.
 */
export const CurrencyWidget = observer(({ currencyStore }: CurrencyWidgetProps) => (
    <div className={styles.currencyWidget}>
        <HeadingH2 title='Конвертация валют' />
        <div className={styles.currencyWidgetWrapper}>
            <CurrencyRateBlock currencyStore={currencyStore} />
        </div>
    </div>
));
