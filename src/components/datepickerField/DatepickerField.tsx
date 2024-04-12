import React from 'react';
import clsx from 'clsx';

export interface DatepickerProps {
    /**
     * @description Идентификатор поля.
     */
    id: string;
    /**
     * @description Дата.
     */
    value: Date;
    /**
     * @description Метод установки даты.
     */
    onChange: (date: Date) => void;
    /**
     * @description Пропс, который обозначает наличие ошибки.
     */
    className?: string;
    /**
     * @description Пропс, который обозначает наличие ошибки.
     */
    errorState?: boolean;
    /**
     * @description Пропс, который управляет рендером текстового сообщения ошибки.
     * Если true - будет отрендерен текст ошибки.
     */
    withTextError?: boolean;
    /**
     * @description Текст ошибки.
     */
    textError?: string;
    /**
     * @description Вызов функции при потере фокуса.
     */
    onBlur?: () => void;
    /**
     * @description Признак недоступности поля для редактирования.
     */
    disabled?: boolean;
    /**
     * @description Текст placeholder компонента.
     */
    placeholder?: string;
}

/**
 * @description Компонент "DatepickerField".
 */
export function DatepickerField({ className = '' }: DatepickerProps) {
    const classWrapperDatepicker = clsx('reactWrapper', className);

    return <div className={classWrapperDatepicker}>asdasda</div>;
}
