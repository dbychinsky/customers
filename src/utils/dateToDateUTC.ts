export function dateToDateUTC(date: Date): Date {
    const dateStr = date.toLocaleString('ru-RU');
    return new Date(dateStr);
}
