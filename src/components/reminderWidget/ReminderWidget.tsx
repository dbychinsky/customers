import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from 'store/RootStoreContext';
import styles from 'components/reminderWidget/ReminderWidget.module.scss';
import { ReactComponent as IconBell } from 'common/assets/icon/bellActive.svg';
import { ReminderWidgetSkeleton } from 'components/reminderWidget/ReminderWidgetSkeleton';

export const ReminderWidget = observer(() => {
    const { contactListStore } = useStores();

    if (contactListStore.contactListNotificationActive.length === 0) {
        return <ReminderWidgetSkeleton contactListStore={contactListStore} />;
    }

    return (
        <div className={styles.reminderWidget}>
            {contactListStore.contactListNotificationActive.map(({ id, contactFace, organization, description }) => (
                <div key={id} className={styles.contact}>
                    <div className={styles.content}>
                        {organization ? (
                            <div className={styles.organization}>{organization}</div>
                        ) : (
                            <div className={styles.contactFace}>{contactFace}</div>
                        )}
                        <div className={styles.description}>{description}</div>
                    </div>
                    <div className={styles.iconBell}>
                        <IconBell />
                    </div>
                </div>
            ))}
        </div>
    );
});
