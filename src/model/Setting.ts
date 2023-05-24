/**
 * Контакт
 */
export class Setting {

    /**
     * Таймер нотификации
     */
    timerNotification: number;

    /**
     * Имя пользователя
     */
    userName: string;

    constructor() {
        this.timerNotification = 0;
        this.userName = '';
    }
}