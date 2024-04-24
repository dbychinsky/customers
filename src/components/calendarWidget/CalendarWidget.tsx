import React, { useState } from 'react';
import styles from 'components/calendarWidget/CalendarWidget.module.scss';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import moment, { Moment } from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { ContactListStore } from 'store/ContactListStore';
import { observer } from 'mobx-react';

interface CalendarWidgetProps {
    contactListStore: ContactListStore;
}

export const CalendarWidget = observer(({ contactListStore }: CalendarWidgetProps) => {
    const [fieldDate, setFieldDate] = useState(new Date());
    console.log(contactListStore.contactList.length);
    // useEffect(() => {
    //     contactListStore.activeReminderList.forEach((item) => {
    //         const elem = document.querySelector(
    //             `[data-timestamp='${new Date(item.reminder.date.toString().slice(0, 10)).getTime().toString()}']`,
    //         );
    //         console.log(new Date(item.reminder.date.toString().slice(0, 10)).getTime().toString());
    //         if (elem) {
    //             elem.classList.add('my-class');
    //         }
    //     });
    // });

    return (
        <div className={styles.pmWidget}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateCalendar
                    value={moment(fieldDate)}
                    onChange={handleDate}
                    slots={
                        {
                            // day: moment(contactListStore.nearContactListNotification?.reminder.date),
                        }
                    }
                />
            </LocalizationProvider>
        </div>
    );

    function handleDate(date: Moment | null) {
        if (date) {
            setFieldDate(date.toDate());
        }
    }
});
