import React from 'react';
import styles from 'components/reminderStatisticWidget/ReminderStatisticWidget.module.scss';
import { ContactListStore } from 'store/ContactListStore';
import { HeadingH1 } from 'components/headingH1/headingH1';
import { PieChart } from '@mui/x-charts';
import { ReminderWidget } from 'components/reminderWidget/ReminderWidget';
import { observer } from 'mobx-react';

interface StatisticWidgetProps {
    contactListStore: ContactListStore;
    handleClickOnContact: (id: number) => void;
}

/**
 * @description Виджет статистики и напоминаний.
 */
export const ReminderStatisticWidget = observer(({ contactListStore, handleClickOnContact }: StatisticWidgetProps) => {
    const allRecords = contactListStore.contactList.length;
    const recordReminder: number = contactListStore.contactList.filter((item) => item.reminder.bell).length;
    const recordWithOutReminder: number = contactListStore.contactList.filter((item) => !item.reminder.bell).length;

    return (
        <div className={styles.reminderStatisticWidget}>
            <div className={styles.statistic}>
                <HeadingH1 title='Напоминания' />
                <div className={styles.statisticContent}>
                    <div className={styles.chart}>
                        <PieChart
                            series={[
                                {
                                    data: [
                                        { id: 0, value: recordReminder, label: 'С напоминанием', color: '#2ed47e' },
                                        {
                                            id: 1,
                                            value: recordWithOutReminder,
                                            label: 'Без напоминания',
                                            color: '#ffe99a',
                                        },
                                    ],
                                    cx: 22,
                                    cy: 22,
                                    innerRadius: 12,
                                    outerRadius: 26,
                                },
                            ]}
                            width={60}
                            height={60}
                            slotProps={{
                                legend: { hidden: true },
                            }}
                        />
                    </div>
                    <div className={styles.statisticRecordsList}>
                        <div className={styles.recordBig}>
                            <div>Всего записей:</div>
                            <div>{allRecords}</div>
                        </div>
                        <div className={styles.recordSmall}>
                            <div>С напоминанием:</div>
                            <div>{recordReminder}</div>
                        </div>
                        <div className={styles.recordSmall}>
                            <div>Без напоминания:</div>
                            <div>{recordWithOutReminder}</div>
                        </div>
                        <div className={styles.recordSmall}>
                            <div className={styles.active}>Активные:</div>
                            <div className={styles.active}>{contactListStore.contactListNotificationActive.length}</div>
                        </div>
                    </div>
                </div>
            </div>

            <ReminderWidget handleClickOnContact={handleClickOnContact} />
        </div>
    );
});
