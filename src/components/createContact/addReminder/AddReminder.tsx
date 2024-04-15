import React from 'react';
import styles from 'components/createContact/addReminder/AddReminder.module.scss';
import { ContactEditStore } from 'store/ContactEditStore';
import { TextAreaField } from 'components/textAreaField/TextAreaField';
import { HeadingH2 } from 'components/headingH2/headingH2';
import clsx from 'clsx';
import { observer } from 'mobx-react';
import { CheckBoxReminder } from 'components/checkBoxReminder/CheckBoxReminder';
import { DatePicker } from 'components/datePicker/DatePicker';

interface AddReminderProps {
    contactEditStore: ContactEditStore;
}

/**
 * @description Добавление напоминания.
 */
export const AddReminder = observer(({ contactEditStore }: AddReminderProps) => {
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
                    changeHandlerCheckbox={contactEditStore.handleChangeFieldsReminderBell}
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
});
