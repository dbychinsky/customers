import React, {ChangeEvent, FC} from 'react';
import {observer} from 'mobx-react';
import clsx from 'clsx';
import styles from 'components/formRow/FormRow.module.scss';
import {Label} from 'components/label/Label';
import {InputField} from 'components/inputField/InputField';
import {FeedbackMessageField} from 'components/feedbackMessageField/FeedbackMessageField';
import {FieldError, InputFieldEnum} from 'components/inputField/types';

interface IFormRow {
    /**
     * @description Значение поля ввода.
     */
    inputValue: string,

    /**
     * @description Имя поля ввода.
     */
    inputName: string,

    /**
     * @description Обработчик ввода поля.
     */
    inputChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;

    /**
     * @description Тип поля ввода.
     */
    inputType: InputFieldEnum;

    /**
     * @description Список ошибок.
     */
    errorList: FieldError[];

    /**
     * @description Текст для label.
     */
    labelText: string;

    /**
     * @description  Список дополнительных классов.
     */
    className?: string,
}

/**
 * @description Блок, объединящий поля ввода, подписи к ним, ошибки.
 */
export const FormRow: FC<IFormRow> = observer((
    {
        inputValue,
        inputName,
        inputChangeHandler,
        inputType,
        errorList,
        labelText,
        className
    }) => {
    const localClassName = clsx(styles.formRow, className);
    let messages: string | undefined = errorList.find(item => item.field === inputName)?.message;

    return (
        <div className={localClassName}>
            <Label text={labelText}/>
            <InputField
                value={inputValue}
                changeHandler={inputChangeHandler}
                name={inputName}
                type={inputType}
                isError={!!messages}/>
            {messages ? <FeedbackMessageField message={messages}/> : null}
        </div>
    );
});