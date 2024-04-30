import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from 'store/RootStoreContext';
import styles from 'components/reminderWidget/ReminderWidget.module.scss';
import { ReactComponent as IconBell } from 'common/assets/icon/bellActive.svg';
import { ReminderWidgetSkeleton } from 'components/reminderWidget/ReminderWidgetSkeleton';

interface ReminderWidgetProps {
    handleClickOnContact: (id: string) => void;
}

export const ReminderWidget = observer(({ handleClickOnContact }: ReminderWidgetProps) => {
    const { contactListStore, contactEditStore } = useStores();

    if (contactListStore.contactListNotificationActivated.length === 0) {
        return <ReminderWidgetSkeleton contactListStore={contactListStore} contactEditStore={contactEditStore} />;
    }

    return (
        <div className={styles.reminderWidget}>
            {contactListStore.contactListNotificationActivated.map(({ id, contactFace, organization, reminder }) => (
                <div key={id} className={styles.contact} onClick={() => handleClickOnContact(id)}>
                    <div className={styles.content}>
                        {organization ? (
                            <div className={styles.organization}>{organization}</div>
                        ) : (
                            <div className={styles.contactFace}>{contactFace}</div>
                        )}
                        {reminder.comment.length !== 0 ? (
                            <div className={styles.description}>{reminder.comment}</div>
                        ) : null}
                    </div>
                    <div className={styles.iconBell}>
                        <IconBell />
                    </div>
                </div>
            ))}
        </div>
    );
});
