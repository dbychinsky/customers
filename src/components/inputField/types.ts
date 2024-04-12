/**
 * @description Список типов поля.
 */
export enum InputFieldEnum {
    text = 'text',
    number = 'number',
    password = 'password',
}

/**
 * @description Тип ошибки к полю.
 */
export type FieldError = {
    /**
     * @description Имя поля.
     */
    field: string;

    /**
     * @description Текстовое сообщение.
     */
    message: string;
};
