/**
 * Класс работы с датой
 */
export class Conversation {

    static dateToStrUTC(date: Date): string {
        return new Date(date).toLocaleString('ru-RU').slice(0, -3);
    }

    static dateToDateUTC(date: Date): Date {
        let dateStr = date.toLocaleString('ru-RU');
        return new Date(dateStr);
    }

    static checkboxBoolToString(value: boolean): string {
        if (value) {
            return 'on'
        } else {
            return 'off'
        }
    }
}

