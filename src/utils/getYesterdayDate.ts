/**
 * Получаем вчерашнюю дату формата 2023-03-16
 */
export function getYesterdayDate(): string {
    const toDay: Date = new Date();
    toDay.setDate(toDay.getDate() - 1);
    return toDay.toISOString().slice(0, 10);
}
