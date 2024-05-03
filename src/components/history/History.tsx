import React from 'react';
import styles from 'components/history/History.module.scss';
import { HeadingH2 } from 'components/headingH2/headingH2';
import 'moment/locale/ru';
import { observer } from 'mobx-react';
import { NoRecords } from 'components/noRecords/NoRecords';
import clsx from 'clsx';
import { HistoryType } from 'store/contactEditStore/types';

interface HistoryWidgetProps {
    historyListSorted: HistoryType[];
    className?: string;
}

/**
 * @description Компонент отображения Истории.
 */
export const History = observer(({ historyListSorted, className }: HistoryWidgetProps) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const moment = require('moment');
    const classWrapperHistory = clsx(styles.history, className);

    return (
        <div className={classWrapperHistory}>
            <HeadingH2 title='История' />
            {historyListSorted.length !== 0 ? (
                historyListSorted.map((item) => (
                    <div key={item.id} className={styles.historyRow}>
                        <div className={styles.date}>{moment(item.date).format('L')}</div>
                        <div className={styles.comments}>{item.historyComment}</div>
                    </div>
                ))
            ) : (
                <NoRecords text='История отсутствует' variantFontSize='small' variantAlign='left' />
            )}
        </div>
    );
});
