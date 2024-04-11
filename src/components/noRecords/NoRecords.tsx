import React from "react";
import {
    NoRecordAlignType,
    NoRecordAlignTypeMapping,
    NoRecordFontType,
    NoRecordFontTypeMapping,
} from "components/noRecords/types";
import clsx from "clsx";
import styles from "./NoRecords.module.scss";

interface NoRecordsProps {
    text: string;
    variantFontSize: NoRecordFontType;
    variantAlign: NoRecordAlignType;
}

/**
 * @description Компонент отображения отсутствия записей.
 */
export function NoRecords({ text, variantFontSize, variantAlign }: NoRecordsProps) {
    const classNoRecordWrapper = clsx(styles.noRecords,
        NoRecordFontTypeMapping[variantFontSize],
        NoRecordAlignTypeMapping[variantAlign]);

    return (
        <div className={classNoRecordWrapper}>
            {text}
        </div>
    );
};
