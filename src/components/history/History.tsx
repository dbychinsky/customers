import React from "react";
import styles from "components/history/History.module.scss";
import { Contact } from "model/Contact";
import { HeadingH2 } from "components/headingH2/headingH2";
import "moment/locale/ru";
import { observer } from "mobx-react";
import { NoRecords } from "components/noRecords/NoRecords";
import clsx from "clsx";

interface IHistoryWidgetProps {
    activeContact: Contact;
    className?: string;
    isBorderText: boolean;
}

/**
 * @description Компонент отображения Истории.
 */
export const History = observer(({ activeContact, className, isBorderText }: IHistoryWidgetProps) => {
    const moment = require("moment");
    const classWrapperHistory = clsx(styles.history, className, { [styles.cut]: isBorderText });

    return (
        <div className={classWrapperHistory}>
            <HeadingH2 title="История" />
            {activeContact && isBorderText && activeContact?.history.length > 2
                ? <div className={styles.dotted}>...</div>
                : null}
            {activeContact?.history.length !== 0
                ? isBorderText
                    ? activeContact?.history.slice(-2).map((item) =>
                        <div key={item.id}
                             className={styles.historyRow}>
                            <div className={styles.date}>{moment(item.date).format("L")}</div>
                            <div className={styles.comments}>{item.action}</div>
                        </div>)
                    : activeContact?.history.map((item) => (
                        <div key={item.id}
                             className={styles.historyRow}>
                            <div className={styles.date}>{moment(item.date).format("L")}</div>
                            <div className={styles.comments}>{item.action}</div>
                        </div>
                    ))
                : <NoRecords text="История отсутствует"
                             variantFontSize={"small"}
                             variantAlign={"left"} />}
        </div>
    );
});
