import React, { ChangeEvent } from 'react';
import styles from 'components/inputSelect/InputSelect.module.scss';

interface InputSelectProps<P> {
    /**
     * @description Метод, вызывающийся при изменении поля
     *
     * @param event выбранное значение
     */
    changeHandler: (event: ChangeEvent<HTMLSelectElement>) => void;

    /**
     * @description Возможные значения
     */
    valueList: P[];

    /**
     * @description Значение в поле ввода
     */
    value?: string;

    /**
     * @description Имя поля
     */
    name: string;

    /**
     * @description Дефолтное значение.
     */
    optionDefaultValue?: string;
}

/**
 * @description Компонент c выпадающими вариантами выбора.
 */
export function InputSelect<P extends { id: number; name: string }>({
    changeHandler,
    valueList,
    name,
    optionDefaultValue,
}: InputSelectProps<P>) {
    return (
        <select onChange={changeHandler} defaultValue={optionDefaultValue} name={name} className={styles.inputSelect}>
            <option value={optionDefaultValue}>{optionDefaultValue ? optionDefaultValue : 'Выберите значение'}</option>
            {valueList.map((item) => (
                <option key={item.id} value={item.name}>
                    {item.name}
                </option>
            ))}
        </select>
    );
}
