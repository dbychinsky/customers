import React, {useContext} from 'react';
import "./RadioButtonCurrency.scss";
import {observer} from "mobx-react";
import {StoreContext} from "../../App";
import {CurrencyListShortName} from "../../model/Currency";
import Label from "../label/Label";

const RadioButtonCurrency = observer(() => {

    const currencyRateStore = useContext(StoreContext).currencyRateStore;
    console.log(currencyRateStore.currencyValue)

    return (
        <div className="radioButtonCurrency">
            <div className="formRadio USD">
                <input id="radioUsd"
                       type="radio"
                       name="radio"
                       value={CurrencyListShortName.USD}
                       checked={currencyRateStore.currencyValue === CurrencyListShortName.USD ? true : false}
                       onChange={currencyRateStore.changeHandlerCurrencyRadio}/>
                <Label htmlFor="radioUsd" text="Radio button 1"/>
            </div>
            <div className="formRadio EUR">
                <input id="radioEur"
                       type="radio"
                       name="radio"
                       value={CurrencyListShortName.EUR}
                       checked={currencyRateStore.currencyValue === CurrencyListShortName.EUR ? true : false}
                       onChange={currencyRateStore.changeHandlerCurrencyRadio}/>
                <Label htmlFor="radioEur" text="Radio button 1"/>
            </div>
            <div className="formRadio PLN">
                <input id="radioPln"
                       type="radio"
                       name="radio"
                       value={CurrencyListShortName.PLN}
                       checked={currencyRateStore.currencyValue === CurrencyListShortName.PLN ? true : false}
                       onChange={currencyRateStore.changeHandlerCurrencyRadio}/>
                <Label htmlFor="radioPln" text="Radio button 1"/>
            </div>
            <div className="formRadio RUB">
                <input id="radioRub"
                       type="radio"
                       name="radio"
                       value={CurrencyListShortName.RUB}
                       checked={currencyRateStore.currencyValue === CurrencyListShortName.RUB ? true : false}
                       onChange={currencyRateStore.changeHandlerCurrencyRadio}/>
                <Label htmlFor="radioRub" text="Radio button 1"/>
            </div>
            <div className="formRadio BYN">
                <input id="radioByn"
                       type="radio"
                       name="radio"
                       value={CurrencyListShortName.BYN}
                       checked={currencyRateStore.currencyValue === CurrencyListShortName.BYN ? true : false}
                       onChange={currencyRateStore.changeHandlerCurrencyRadio}/>
                <Label htmlFor="radioByn" text="Radio button 1"/>
            </div>


        </div>
    );
});

export default RadioButtonCurrency;