import React, {FC} from 'react';
import "./DateField.scss";
import ru from 'date-fns/locale/ru';
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateField.scss";

interface IDateField {
    startDate: Date,
    setStartDate: (value: Date) => void
}

const DateField: FC<IDateField> = ({startDate, setStartDate}) => {

    registerLocale('ru', ru)
    return (
        <div className="dateField">
            <DatePicker
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                locale="ru"
                showTimeSelect
                timeFormat="p"
                timeIntervals={15}
                dateFormat="Pp"/>
        </div>
    );
};

export default DateField;