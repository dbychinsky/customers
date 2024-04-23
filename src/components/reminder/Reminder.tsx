import React from 'react';
import { Contact } from 'model/Contact';
import styles from 'components/reminder/Reminder.module.scss';
import { HeadingH2 } from 'components/headingH2/headingH2';
import { NoRecords } from 'components/noRecords/NoRecords';
import clsx from 'clsx';

interface ReminderWidgetProps {
    activeContact: Contact;
    className?: string;
    isBorderText: boolean;
}

/**
 * @description Компонент отображения Напоминания.
 */
export const Reminder = ({ activeContact, className, isBorderText }: ReminderWidgetProps) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const moment = require('moment');
    const classWrapperReminder = clsx(styles.reminder, className);
    const classWrapperReminderComment = clsx(styles.comment, { [styles.cut]: isBorderText });

    return (
        <div className={classWrapperReminder}>
            <HeadingH2 title='Напоминание' />
            {activeContact?.reminder?.bell ? (
                <div className={styles.reminderWrapper}>
                    <div className={styles.date}>{moment(activeContact.reminder.date).format('lll')}</div>
                    <div className={classWrapperReminderComment}>{activeContact.reminder.productComment}</div>
                </div>
            ) : (
                <NoRecords text='Напоминания отсутствуют' variantFontSize='small' variantAlign='left' />
            )}
        </div>
    );
};
