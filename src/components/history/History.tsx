import React from 'react';
import styles from 'components/history/History.module.scss';
import { Contact } from 'model/Contact';
import { HeadingH2 } from 'components/headingH2/headingH2';
import 'moment/locale/ru';
import { observer } from 'mobx-react';
import { NoRecords } from 'components/noRecords/NoRecords';
import clsx from 'clsx';

interface HistoryWidgetProps {
    activeContact: Contact;
    className?: string;
    isBorderText: boolean;
}

/**
 * @description Компонент отображения Истории.
 */
export const History = observer(({ activeContact, className, isBorderText }: HistoryWidgetProps) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const moment = require('moment');
    const classWrapperHistory = clsx(styles.history, className, { [styles.cut]: isBorderText });

    return (
        <div className={classWrapperHistory}>
            <HeadingH2 title='История' />
            {activeContact && isBorderText && activeContact?.historyList.length > 2 ? (
                <div className={styles.dotted}>...</div>
            ) : null}
            {activeContact?.historyList.length !== 0 ? (
                isBorderText ? (
                    activeContact?.historyList.slice(-2).map((item) => (
                        <div key={item.id} className={styles.historyRow}>
                            <div className={styles.date}>{moment(item.date).format('L')}</div>
                            <div className={styles.comments}>{item.historyComment}</div>
                        </div>
                    ))
                ) : (
                    activeContact?.historyList.map((item) => (
                        <div key={item.id} className={styles.historyRow}>
                            <div className={styles.date}>{moment(item.date).format('L')}</div>
                            <div className={styles.comments}>{item.historyComment}</div>
                        </div>
                    ))
                )
            ) : (
                <NoRecords text='История отсутствует' variantFontSize='small' variantAlign='left' />
            )}
        </div>
    );
});
