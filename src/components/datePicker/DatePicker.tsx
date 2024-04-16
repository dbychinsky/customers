import React from 'react';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment, { Moment } from 'moment';
import styles from 'components/datePicker/DatePicker.module.scss';

interface DatePickerProps {
    date: Date;
    handleChange: (date: Moment | null) => void;
    isDisabled?: boolean;
}

/**
 * @description Компонент Даты.
 * @param date
 * @param handleChange
 * @param isDisabled
 * @constructor
 */
export function DatePicker({ date, handleChange, isDisabled }: DatePickerProps) {
    return (
        <div className={styles.datePicker}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                    value={moment(date)}
                    onChange={(date) => handleChange(date)}
                    className={styles.datePickerWrapper}
                    disabled={isDisabled}
                />
            </LocalizationProvider>
        </div>
    );
}
