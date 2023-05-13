/**
 * Класс работы с датой
 */
export class Conversation {

    static dateToStrUTC(date: Date): string {
        return new Date(date).toLocaleString();
    }

    static dateToDateUTC(date: Date): Date {
        let dateStr = date.toLocaleString();
        return new Date(dateStr);
    }

    static checkboxBoolToString(value: boolean): string {
        if (value) {
            return 'Включено'
        } else {
            return 'Отключено'
        }
    }
}

