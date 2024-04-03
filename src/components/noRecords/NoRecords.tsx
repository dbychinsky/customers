import React from "react";
import {
    NoRecordAlignType,
    NoRecordAlignTypeMapping,
    NoRecordFontType,
    NoRecordFontTypeMapping,
} from "components/noRecords/types";
import clsx from "clsx";
import styles from "./NoRecords.module.scss";

interface INoRecordsProps {
    text: string;
    variantFontSize: NoRecordFontType;
    variantAlign: NoRecordAlignType;
}

/**
 * @description Компонент отображения отсутствия записей.
 */
export const NoRecords = ({ text, variantFontSize, variantAlign }: INoRecordsProps) => {
    const classNoRecordWrapper = clsx(styles.noRecords,
        NoRecordFontTypeMapping[variantFontSize],
        NoRecordAlignTypeMapping[variantAlign]);

    return (
        <div className={classNoRecordWrapper}>
            {text}
        </div>
    );
};
