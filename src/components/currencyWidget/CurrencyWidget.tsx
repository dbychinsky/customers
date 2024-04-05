import React, { useState } from "react";
import styles from "components/currencyWidget/CurrencyWidget.module.scss";
import { InputField } from "components/inputField/InputField";
import { InputFieldEnum } from "components/inputField/types";
import { HeadingH2 } from "components/headingH2/headingH2";

interface ICurrencyWidgetProps {

}

/**
 * @description Виджет курсов валют.
 */
export const CurrencyWidget = ({}: ICurrencyWidgetProps) => {
    const [value, setValue] = useState<string>("");
    return (
        <div className={styles.currencyWidget}>
            <HeadingH2 title="Конвертация валют" />
            <div className={styles.currencyWidgetWrapper}>
                <InputField value={value}
                            changeHandler={() => {
                            }}
                            name="Byn"
                            type={InputFieldEnum.text}
                            className={styles.inputFieldByn}
                            mask={false} />
                <InputField value={value}
                            changeHandler={() => {
                            }}
                            name="Usd"
                            type={InputFieldEnum.text}
                            className={styles.inputFieldUsd}
                            mask={false} />
                <InputField value={value}
                            changeHandler={() => {
                            }}
                            name="Rub"
                            type={InputFieldEnum.text}
                            className={styles.inputFieldRub}
                            mask={false} />
            </div>
        </div>
    );
};
