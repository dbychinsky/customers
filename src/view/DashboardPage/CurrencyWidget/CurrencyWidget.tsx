import React from "react";
import styles from "./CurrencyWidget.module.scss";

interface ICurrencyWidgetProps {

}

export const CurrencyWidget = ({}: ICurrencyWidgetProps) => {
    return (
        <div className={styles.currencyWidget}>
            CurrencyWidget
        </div>
    );
};
