import React, { useEffect, useState } from 'react';
import styles from 'components/calendarWidget/CalendarWidget.module.scss';
import {
    DateCalendar,
    DayCalendarSkeleton,
    LocalizationProvider,
    PickersDay,
    PickersDayProps,
} from '@mui/x-date-pickers';
import moment, { Moment } from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { ContactListStore } from 'store/ContactListStore';
import { observer } from 'mobx-react';
import { Badge } from '@mui/material';

interface CalendarWidgetProps {
    contactListStore: ContactListStore;
}

export const CalendarWidget = observer(({ contactListStore }: CalendarWidgetProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [highlightedDays, setHighlightedDays] = useState([0]);
    console.log(contactListStore);

    useEffect(() => {
        contactListStore.getDateForCalendarReminder(new Date());
        setHighlightedDays(contactListStore.reminderListDateWithNotification);
    }, [contactListStore]);

    return (
        <div className={styles.calendarWidget}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateCalendar
                    defaultValue={moment(new Date())}
                    onMonthChange={(value: Moment) => handleDate(value)}
                    loading={isLoading}
                    slots={{
                        day: ServerDay,
                    }}
                    slotProps={{
                        day: {
                            highlightedDays,
                        } as never,
                    }}
                    renderLoading={() => <DayCalendarSkeleton />}
                    sx={{
                        '&.MuiDateCalendar-root': { width: '100%' },
                        '& .MuiDayCalendar-header': { justifyContent: 'space-between' },
                        '& .MuiDayCalendar-weekContainer': { justifyContent: 'space-between' },
                    }}
                />
            </LocalizationProvider>
        </div>
    );

    function ServerDay(props: PickersDayProps<Moment> & { highlightedDays?: number[] }) {
        const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

        const isSelected = !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

        return (
            <Badge key={props.day.toString()} overlap='circular' badgeContent={isSelected ? '🌚' : undefined}>
                <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
            </Badge>
        );
    }

    function handleDate(date: Moment) {
        setIsLoading(true);
        contactListStore.getDateForCalendarReminder(date.toDate());
        setHighlightedDays(contactListStore.reminderListDateWithNotification);
        setIsLoading(false);
    }
});
