import React, { useEffect, useState } from 'react';
import styles from 'components/calendarWidget/CalendarWidget.module.scss';
import { DateCalendar, LocalizationProvider, PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import moment, { Moment } from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { ContactListStore } from 'store/ContactListStore';
import { observer } from 'mobx-react';
import { Badge } from '@mui/material';

interface CalendarWidgetProps {
    contactListStore: ContactListStore;
}

export const CalendarWidget = observer(({ contactListStore }: CalendarWidgetProps) => {
    const [fieldDate, setFieldDate] = useState(new Date());
    const [highlightedDays, setHighlightedDays] = useState([0]);

    useEffect(() => {
        setHighlightedDays(contactListStore.reminderListDateWithNotification);
    }, [contactListStore.reminderListDateWithNotification]);

    return (
        <div className={styles.pmWidget}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateCalendar
                    value={moment(fieldDate)}
                    onChange={handleDate}
                    onMonthChange={() => console.log('2')}
                    slots={{
                        day: ServerDay,
                    }}
                    slotProps={{
                        day: {
                            highlightedDays,
                        } as never,
                    }}
                />
            </LocalizationProvider>
        </div>
    );

    function ServerDay(props: PickersDayProps<Moment> & { highlightedDays?: number[] }) {
        const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
        const isSelected = !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

        return (
            <Badge
                key={props.day.toString()}
                overlap='circular'
                badgeContent={isSelected ? <div>dssds</div> : undefined}
            >
                <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
            </Badge>
        );
    }

    function handleDate(date: Moment | null) {
        if (date) {
            setFieldDate(date.toDate());
        }
    }
});
