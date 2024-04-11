import styles from "components/buttonImage/ButtonImage.module.scss";

/**
 * @description Константа, позволяющая по полученному пропсу "variant" получить класс,
 * отвечающий за вариант отображения кнопки.
 * *
 * @see ButtonVariantType
 */
export const ButtonImageTypeMapping = {
    noStyle: styles.noStyle,
    add: styles.add,
    clear: styles.clear,
    delete: styles.delete,
};

export type ButtonImageType = keyof typeof ButtonImageTypeMapping;
