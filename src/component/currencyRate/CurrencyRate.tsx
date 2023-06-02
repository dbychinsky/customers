import React, {useContext} from 'react';
import {observer} from "mobx-react";
import {StoreContext} from "../../App";
import "./CurrencyRate.scss";

const CurrencyRate = observer(() => {

    const currencyRateStore = useContext(StoreContext).currencyRateStore;
    return (
        <div className="currencyRate">
            <div className="rate usd">{currencyRateStore.amountUSD}</div>
            <div className="rate eur">{currencyRateStore.amountEUR}</div>
            <div className="rate pln">{currencyRateStore.amountPLN}<span>10</span></div>
            <div className="rate rub">{currencyRateStore.amountRUB}<span>100</span></div>
        </div>
    );
});

export default CurrencyRate;