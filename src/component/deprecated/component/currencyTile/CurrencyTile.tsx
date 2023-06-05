import React, {useContext, useEffect} from 'react';
import "./CurrencyTile.scss";
import {GetDate} from "../../../../utility/GetDate";
import FormRow from "../../../formRow/FormRow";
import {StoreContext} from "../../../../App";
import InputTextField from "../../../inputField/InputField";
import {getClassName} from "../../../../utility/GetClassName";
import {observer} from "mobx-react";
import RadioButtonCurrency from "../radioButtonCurrency/RadioButtonCurrency";
import {CurrencyListFullName, CurrencyListShortName} from "../../model/Currency";

const CurrencyTile = observer(() => {
    let actualDate = new Date();
    const currencyRateStore = useContext(StoreContext).currencyRateStore;

    /**
     * Получаем курсы валют на дату
     */
    useEffect(() => {
        currencyRateStore.getCurrencyDay(GetDate.convertDateToString(actualDate));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [actualDate]);

    return (
        <div className="currencyTile">
            <span className="smallText">
                    {GetDate.dateSerializeDDMMYY(GetDate.convertDateToString(actualDate))}
                <a href="https://www.nbrb.by/statistics/rates/ratesdaily.asp"
                   title="currency"
                   target="_blank" rel="noreferrer"
                   className="siteNBRB">Сайт НБРБ
                </a>
                </span>
            <div className="top">
                <FormRow label={""}
                         className="currency"
                         field={
                             <RadioButtonCurrency/>
                         }
                />

                <FormRow label={""}
                         className="amount"
                         field={
                             <InputTextField
                                 value={currencyRateStore.calcAmount}
                                 changeHandler={currencyRateStore.changeHandlerValue}
                                 name="amountBYN"
                                 type="number"
                             />
                         }
                />
            </div>
            {currencyRateStore.calcAmount
                ? currencyRateStore.currencyListCalculated?.map((
                    {
                        byn,
                        eur,
                        usd,
                        rub,
                        pln
                    }, index) => (
                    <div key={index} className="bottom">
                        {/*<span className="iconExchange"><CiRepeat/></span>*/}
                        <div className={`result ${getClassName(byn.toString(),
                            currencyRateStore.calcAmount)
                            ? "equal"
                            : ""}`}>
                            <span className={CurrencyListShortName.BYN}>{CurrencyListFullName.BYN}:</span>
                            <span className="count">{byn.toFixed(2)}</span>
                        </div>
                        <div className={`result ${getClassName(usd.toString(),
                            currencyRateStore.calcAmount)
                            ? "equal"
                            : ""}`}>
                            <span className={CurrencyListShortName.USD}>{CurrencyListFullName.USD}:</span>
                            <span className="count">{usd.toFixed(2)}</span>
                        </div>
                        <div className={`result ${getClassName(eur.toString(),
                            currencyRateStore.calcAmount)
                            ? "equal"
                            : ""}`}>
                            <span className={CurrencyListShortName.EUR}>{CurrencyListFullName.EUR}:</span>
                            <span className="count">{eur.toFixed(2)}</span>
                        </div>
                        <div className={`result ${getClassName(rub.toString(),
                            currencyRateStore.calcAmount)
                            ? "equal"
                            : ""}`}>
                            <span className={CurrencyListShortName.RUB}>{CurrencyListFullName.RUB}:</span>
                            <span className="count">{rub.toFixed(2)}</span>
                        </div>
                        <div className={`result ${getClassName(pln.toString(),
                            currencyRateStore.calcAmount)
                            ? "equal"
                            : ""}`}>
                            <span className={CurrencyListShortName.PLN}>{CurrencyListFullName.PLN}:</span>
                            <span className="count">{pln.toFixed(2)}</span>
                        </div>
                    </div>
                ))
                : ''
            }
        </div>
    );
});

export default CurrencyTile;