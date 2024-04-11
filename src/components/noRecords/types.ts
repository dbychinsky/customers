import styles from "./NoRecords.module.scss";

export const NoRecordFontTypeMapping = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
};

export type NoRecordFontType = keyof typeof NoRecordFontTypeMapping;

export const NoRecordAlignTypeMapping = {
    left: styles.left,
    center: styles.center,
    right: styles.right,
};

export type NoRecordAlignType = keyof typeof NoRecordAlignTypeMapping;

