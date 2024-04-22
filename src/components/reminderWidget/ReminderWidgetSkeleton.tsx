import React from 'react';
import styles from 'components/reminderWidget/ReminderWidget.module.scss';
import moment from 'moment';
import { ContactListStore } from 'store/ContactListStore';
import { Contact } from 'model/Contact';
import { dateToDateUTC } from 'utils/dateToDateUTC';
import { ReactComponent as IconBell } from 'common/assets/icon/bellActive.svg';

interface ContactListReminderWidgetSkeletonProps {
    contactListStore: ContactListStore;
}

/**
 * @description Виджет напоминнания ближайшей нотификации.
 */
export const ReminderWidgetSkeleton = ({ contactListStore }: ContactListReminderWidgetSkeletonProps) => {
    const nearContact: Contact | null = getNearNotification();

    return (
        <div className={styles.reminderWidget}>
            <div className={styles.reminderSkeleton}>
                {nearContact ? (
                    <div className={styles.content}>
                        {nearContact.organization ? (
                            <div className={styles.organization}>{nearContact.organization}</div>
                        ) : (
                            <div className={styles.contactFace}>{nearContact.contactFace}</div>
                        )}
                        <div className={styles.date}>{moment(nearContact.reminder.date).format('LLL')}</div>
                    </div>
                ) : (
                    <div className={styles.noRecords}>Нет нотификаций</div>
                )}
                <div className={styles.iconBell}>
                    <IconBell />
                </div>
            </div>
        </div>
    );

    /**
     * @description Функция получения ближайшего напоминания.
     */
    function getNearNotification(): Contact | null {
        let result: Contact | null = null;
        contactListStore.contactList.forEach((contact: Contact) => {
            const elemDate = dateToDateUTC(contact.reminder.date);
            if (contact.reminder.bell && elemDate > new Date()) {
                result = contact;
            }
        });

        return result;
    }
};
