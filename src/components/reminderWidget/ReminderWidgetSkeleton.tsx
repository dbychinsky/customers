import React, { useEffect, useState } from 'react';
import styles from 'components/reminderWidget/ReminderWidget.module.scss';
import moment from 'moment';
import { ContactListStore } from 'store/ContactListStore';
import { Contact } from 'model/Contact';
import { dateToDateUTC } from 'utils/dateToDateUTC';
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
export const ReminderWidgetSkeleton = observer(
    ({ contactListStore, contactEditStore }: ContactListReminderWidgetSkeletonProps) => {
        const [nearContact, setNearContact] = useState<Contact | null>();

        useEffect(() => {
            contactListStore.contactList.forEach((contact: Contact) => {
                const elemDate = dateToDateUTC(contact.reminder.date);
                if (contact.reminder.bell && elemDate > new Date()) {
                    setNearContact(contact);
                }
            });
        }, [contactListStore.contactList]);

        useEffect(() => {
            const dateContactEdit = contactEditStore.contact;
            const dateContactActive = contactListStore.contact;
            if (dateContactEdit.reminder.bell && dateContactActive) {
                if (dateContactEdit.reminder.date < dateContactActive?.reminder.date) {
                    setNearContact(dateContactActive);
                }
            }
        }, [contactEditStore.contact, contactListStore.contact]);

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
    },
);
