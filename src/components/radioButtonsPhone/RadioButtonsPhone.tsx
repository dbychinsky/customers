import React from "react";
import { PhoneTypeListEnum } from "model/types";
import styles from "components/radioButtonsPhone/RadioButtonsPhone.module.scss";

interface IRadioButtonsProps {
    state: string;
    setState: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * @description Компонент выбора.
 */
export const RadioButtonsPhone = ({ state, setState }: IRadioButtonsProps) => {
    return (
        <div className={styles.radioButtonsPhone}>
            <div className={styles.radioButtonsPhoneWrapper}>
                <input type="radio"
                       value={PhoneTypeListEnum.business}
                       checked={state === PhoneTypeListEnum.business}
                       onChange={(value) => setState(value)}
                       className={styles.radioInput}
                       id="phoneRadio1" />
                <label className={styles.label}
                       htmlFor="phoneRadio1">Рабочий</label>
            </div>
            <div className={styles.radioButtonsPhoneWrapper}>
                <input type="radio" value={PhoneTypeListEnum.personal}
                       checked={state === PhoneTypeListEnum.personal}
                       onChange={(value) => setState(value)}
                       className={styles.radioInput}
                       id="phoneRadio2" />
                <label className={styles.label}
                       htmlFor="phoneRadio2">Персональный</label>
            </div>
        </div>
    );
};
