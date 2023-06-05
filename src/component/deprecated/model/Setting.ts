/**
 * Контакт
 */
export class Setting {

    /**
     * Таймер нотификации
     */
    timerNotification: number;

    /**
     * Таймер перезагрузки списка нотификации
     */
    timerReloadNotification: number;

    /**
     * Имя пользователя
     */
    userName: string;

    constructor() {
        this.timerNotification = 20000;
        this.timerReloadNotification = 35000;
        this.userName = '';
    }
}