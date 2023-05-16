/**
 * Константы путей
 */
export enum RouterPathList {

    /**
     * Начальная страница - LoginPage
     */
    ROOT_PATH = "/",

    /**
     * Страница со списком заказчиков
     */
    CUSTOMER_LIST_PAGE = "customerListPage/",

    /**
     * Страница реадктирования/добавления заказчика
     */
    CUSTOMER_EDIT_PAGE = "customerEditPage/",

    /**
     * Страница редактирования/добавления
     */
    CUSTOMER_EDIT_ID_PAGE = ":id/",

    /**
     * Страница со списком нотификаций
     */
    CUSTOMER_LIST_REMINDER_PAGE = "customerListReminderPage/"

}