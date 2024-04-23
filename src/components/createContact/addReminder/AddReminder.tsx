import React from 'react';
import styles from 'components/createContact/addReminder/AddReminder.module.scss';
import { ContactEditStore } from 'store/contactEditStore/ContactEditStore';
import { TextAreaField } from 'components/textAreaField/TextAreaField';
import { HeadingH2 } from 'components/headingH2/headingH2';
import clsx from 'clsx';
import { observer } from 'mobx-react';
import { CheckBoxReminder } from 'components/checkBoxReminder/CheckBoxReminder';
import { DatePicker } from 'components/datePicker/DatePicker';
import { ContactListStore } from 'store/ContactListStore';

interface AddReminderProps {
    contactEditStore: ContactEditStore;
    contactListStore: ContactListStore;
}

/**
 * @description Добавление напоминания.
 */
export const AddReminder = observer(({ contactEditStore, contactListStore }: AddReminderProps) => {
    const classWrapperAddReminder = clsx(styles.addReminder, {
        [styles.active]: contactEditStore.contact.reminder.bell,
    });

    return (
        <div className={classWrapperAddReminder}>
            <div className={styles.header}>
                <HeadingH2 title='Напоминание' />
                <CheckBoxReminder
                    id='addReminderCheckbox'
                    name='bell'
                    valueCheckbox={contactEditStore.contact.reminder.bell}
                    changeHandlerCheckbox={(value) => changeNotification(value)}
                />
            </div>
            <div className={styles.body}>
                <DatePicker
                    isDisabled={!contactEditStore.contact.reminder.bell}
                    date={contactEditStore.contact.reminder.date}
                    handleChange={contactEditStore.handleChangeFieldsReminderDate}
                />
                <TextAreaField
                    value={contactEditStore.contact.reminder.productComment}
                    changeHandler={contactEditStore.handleChangeFieldsReminderComment}
                    name='productComment'
                    placeHolder='Комментарий к напоминанию'
                    className={styles.fieldArea}
                    isDisabled={!contactEditStore.contact.reminder.bell}
                />
            </div>
        </div>
    );

    function changeNotification(value: boolean) {
        contactEditStore.handleChangeFieldsReminderBell(value);
        if (!value) {
            contactListStore.deleteRecordListNotification(contactEditStore.contact.id);
        }
    }
});
