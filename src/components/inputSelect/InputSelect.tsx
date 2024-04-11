import React, { ChangeEvent } from "react";
import styles from "./InputSelect.module.scss";

type InputSelectProps = {

    /**
     * @description Метод, вызывающийся при изменении поля
     *
     * @param event выбранное значение
     */
    changeHandler: (event: ChangeEvent<HTMLSelectElement>) => void,

    /**
     * @description Возможные значения
     */
    valueList: [],

    /**
     * @description Значение в поле ввода
     */
    value: string,

    /**
     * @description Имя поля
     */
    name: string,

    /**
     * @description Дефолтное значение.
     */
    optionDefaultValue?: string
}

/**
 * @description Компонент c выпадающими вариантами выбора.
 */
export function InputSelect(
    {
        changeHandler,
        valueList,
        value,
        name,
        optionDefaultValue,
    }: InputSelectProps) {
    return (
        <select onChange={changeHandler}
                defaultValue={value}
                name={name}
                className={styles.inputSelect}>
            <option
                value={optionDefaultValue}>{optionDefaultValue ? optionDefaultValue : "Выберите значение"}</option>
            {
                valueList.map((product) => {
                    return <option key={product} value={product}>{product}</option>;
                })
            }
        </select>
    );
};
