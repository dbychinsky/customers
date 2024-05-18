import React, { useEffect, useState } from 'react';
import { HeadingH1 } from 'components/headingH1/headingH1';
import { useNavigateHelper } from 'router/hooks/useNavigateHelper';
import { useStores } from 'store/RootStoreContext';
import {
    DateCalendar,
    DayCalendarSkeleton,
    LocalizationProvider,
    PickersDay,
    PickersDayProps,
} from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment, { Moment } from 'moment';
import { observer } from 'mobx-react';
import styles from 'pages/CalendarPage/CalendarPage.module.scss';
import { Badge } from '@mui/material';

/**
 * @description Страница с календарем.
 */
export const CalendarPage = observer(() => {
    const { authStore, contactListStore } = useStores();
    const { navigateToDashboardPage } = useNavigateHelper();
    const [calendarField, setCalendarField] = useState(moment(new Date()));
    const [isLoading, setIsLoading] = useState(false);
    const [highlightedDays, setHighlightedDays] = useState([0]);

    const sxProps = {
        '&.MuiDateCalendar-root': { width: '100%', height: 'auto', color: '#475569' },
        '& .MuiTypography-root': { width: '14%', margin: '0' },
        '& .MuiDayCalendar-header': { justifyContent: 'space-between' },
        '& .MuiPickersArrowSwitcher-button': { cursor: 'pointer !important' },
        '& .MuiPickersCalendarHeader-root': {
            minHeight: '30px',
            maxHeight: '30px',
            paddingLeft: '27px',
            paddingRight: '0',
            margin: '5px 0 0 0',
        },
        '& .MuiDayCalendar-monthContainer': {
            display: 'table',
            tableLayout: 'fixed',
            width: '99%',
            borderCollapse: 'collapse',
            textAlign: 'center',
        },
        '& .MuiDayCalendar-weekContainer': {
            margin: '0',
            display: 'table-row',
        },
        '& .MuiBadge-root': {
            display: 'table-cell',
            border: '1px solid  #dae0ec',
        },
        '& .MuiButtonBase-root': {
            width: 'auto',
            height: '40px',
            margin: '0',
            fontSize: '16px',
            cursor: 'default',
        },
        '& .MuiButtonBase-root:hover': {
            background: 'none',
        },
        '& .MuiPickersSlideTransition-root': { minHeight: '202px' },
        '& .MuiPickersDay-dayOutsideMonth': { fontSize: '12px' },
        '& .Mui-selected': { background: 'none !important', color: '#475569 !important' },
        '& .Mui-selected:hover': { background: 'none', color: '#475569' },
        '& .Mui-selected:focus': { background: 'none', color: '#475569' },
        '& .MuiPickersDay-today': {
            background: 'none  !important',
            backgroundColor: 'none  !important',
            color: '#796df6 !important',
            border: 'none !important',
            fontSize: '20px !important',
        },
        '& .MuiPickersDay-today:hover': { color: '#796df6' },
    };

    const iconAlert = <div className={styles.iconAlert} />;

    function ServerDay(props: PickersDayProps<Moment> & { highlightedDays?: number[] }) {
        const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

        const isSelected = !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

        return (
            <Badge key={props.day.toString()} overlap='circular' badgeContent={isSelected ? iconAlert : undefined}>
                <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
            </Badge>
        );
    }

    useEffect(() => {
        if (!authStore.isAuth) {
            navigateToDashboardPage();
        }
    }, [authStore.isAuth, navigateToDashboardPage]);

    return (
        <div className={styles.calendarPage}>
            <HeadingH1 title='Календарь' />

            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateCalendar
                    value={calendarField}
                    onMonthChange={(value: Moment) => handleDate(value)}
                    onYearChange={(value: Moment) => handleDate(value)}
                    onChange={(value) => setCalendarField(value)}
                    loading={isLoading}
                    showDaysOutsideCurrentMonth
                    className={styles.calendar}
                    slots={{
                        day: ServerDay,
                    }}
                    slotProps={{
                        day: {
                            highlightedDays,
                        } as never,
                    }}
                    renderLoading={() => <DayCalendarSkeleton />}
                    sx={sxProps}
                />
            </LocalizationProvider>
        </div>
    );

    function handleDate(date: Moment) {
        setIsLoading(true);
        contactListStore.getDateForCalendarReminder(date.toDate());
        setHighlightedDays(contactListStore.reminderListDateWithNotification);
        setIsLoading(false);
    }
});
