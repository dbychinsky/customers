import styles from './Button.module.scss'

/**
 * @description Константа, позволяющая по полученному пропсу 'variant' получить класс,
 * отвечающий за вариант отображения кнопки.
 * *
 * @see ButtonVariantType
 */
export const ButtonTypeMapping = {
    primary: styles.primary,
    secondary: styles.secondary,
    cancel: styles.cancel,
    custom: styles.custom,
};

export type ButtonType = keyof typeof ButtonTypeMapping;

export enum ButtonFormType {
    button = 'button',
    submit = 'submit',
    reset = 'reset',
}