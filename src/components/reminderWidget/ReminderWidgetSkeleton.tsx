import React, { useEffect } from 'react';
import styles from 'components/reminderWidget/ReminderWidget.module.scss';
import moment from 'moment';
import { ContactListStore } from 'store/ContactListStore';
import { Contact } from 'model/Contact';
import { ReactComponent as IconBell } from 'common/assets/icon/bellActive.svg';
import { observer } from 'mobx-react';
import { ContactEditStore } from 'store/contactEditStore/ContactEditStore';

interface ContactListReminderWidgetSkeletonProps {
    contactListStore: ContactListStore;
    contactEditStore: ContactEditStore;
}

/**
 * @description Виджет напоминнания ближайшей нотификации.
 */
export const ReminderWidgetSkeleton = observer(({ contactListStore }: ContactListReminderWidgetSkeletonProps) => {
    const nearNotificationContact: Contact | undefined = contactListStore.nearContactListNotification;

    useEffect(() => {
        contactListStore.getNearNotification();
    }, [contactListStore]);

    return (
        <div className={styles.reminderWidget}>
            <div className={styles.reminderSkeleton}>
                {nearNotificationContact ? (
                    <div className={styles.content}>
                        {nearNotificationContact.organization ? (
                            <div className={styles.organization}>{nearNotificationContact.organization}</div>
                        ) : (
                            <div className={styles.contactFace}>{nearNotificationContact.contactFace}</div>
                        )}
                        <div className={styles.date}>{moment(nearNotificationContact.reminder.date).format('LLL')}</div>
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
});
