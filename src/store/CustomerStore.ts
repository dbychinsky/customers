import React from "react";
import {makeAutoObservable, runInAction} from "mobx";
import {Customer} from "../model/Customer";
import {server} from "../App";
import {PushNotification} from "../utility/PushNotification";
import {Conversation} from "../utility/Conversation";

/**
 * Store для работы с LoanStore
 */
export class CustomerStore {

    /**
     * Новый заказчик
     */
    public newCustomer: Customer = new Customer();

    /**
     * Список заказчиков
     */
    public customerList: Customer[] = [new Customer()];

    /**
     * Список активных уведомлений, содержит
     * id заказчика
     */
    public customerListNotificationActive: Customer[] = [];

    constructor() {
        makeAutoObservable(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    }

    /**
     * Добавление нового заказчика
     * @param e
     */
    public handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        runInAction(() => {
            this.newCustomer = {
                ...this.newCustomer, [e.target.name]: e.target.value
            }
        });
    };

    /**
     * Слушатель для чекбокса
     * @param e
     */
    public handleChangeCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
        runInAction(() => {
            this.newCustomer = {
                ...this.newCustomer, [e.target.name]: e.target.checked
            }
        });
    };

    /**
     * Установка списка заказчиков
     */
    private setCustomerList(customers: Customer[]) {
        runInAction(() => {
            this.customerList = customers;
        });
    }

    /**
     * Получение данных
     */
    public get() {
        server.getCustomers()
            .then(response => {
                this.setCustomerList(response);
            });
    }

    /**
     * Сохранение данных
     */
    public save(date: Date) {
        runInAction(() => {
            this.newCustomer.reminderDate = date;
        });
        server.addCustomer(this.newCustomer)
            .then(() => this.get());
    }

    /**
     * Обновление данных
     */
    public update(id: string, data: any, date: Date) {
        runInAction(() => {
            this.newCustomer.reminderDate = date;
        });
        server.updateCustomer(id, data)
            .then(() => this.get());
    }

    /**
     * Нотификация.
     * Проверяем каждый элемент списка на наличие флага "reminder". Если флаг true
     * проверяем дату: если текущая дата больше даты из записи - проверяем есть ли
     * этот элемент в списке (notificationList) активных нотификаций - если нет показываем
     * нотификацию.
     */
    public start() {
        setInterval(() => {
            const timeNow = new Date();
            this.customerList.forEach((customer: Customer) => {
                let elemDate = Conversation.dateToDateUTC(customer.reminderDate);

                if (customer.reminder && elemDate < timeNow) {

                    if (!this.isHasIdCustomer(customer.id)) {

                        PushNotification.pushNotify(customer.organization);
                        runInAction(() => {
                            this.customerListNotificationActive.push(customer);
                        })
                    }


                }
            })
        }, 7000)
    }

    public startTemp() {
        const timeNow = new Date();
        this.customerList.forEach((customer: Customer) => {
            let elemDate = Conversation.dateToDateUTC(customer.reminderDate);

            if (customer.reminder && elemDate < timeNow) {

                if (!this.isHasIdCustomer(customer.id)) {

                    PushNotification.pushNotify(customer.organization);
                    runInAction(() => {
                        this.customerListNotificationActive.push(customer);
                    })
                }

            }
        })
    }

    /**
     * Проверка на наличие id элемента в списке нотификаций
     * @param customerId
     * @private
     */
    private isHasIdCustomer(customerId: number): boolean {
        let result: boolean = true;
        const id: Customer | undefined =
            this.customerListNotificationActive.find(customer => customer.id === customerId);
        if (id === undefined) result = false
        return result;
    }

    /**
     * Удаление элемента
     */
    public remove(idCustomer: number) {
        server.deleteCustomer(idCustomer)
            .then(() => this.get());
    }

    /**
     * Устанавливаем данные в поля для редактирования
     */
    public setEditPlace(id?: number) {
        if (id !== undefined) {
            const customerEdit = this.customerList.find(customer => customer.id === id);
            if (customerEdit !== undefined) {
                runInAction(() => {
                    this.newCustomer = customerEdit;
                })

            }
        } else {
            runInAction(() => {
                this.newCustomer = new Customer();
            })
        }
    }

    /**
     * Получение даты для установления в локальный стейт при редактировании
     * данных
     */
    public getDateForState(id: number): any {
        const customerEdit = this.customerList.find(customer => customer.id === id)?.reminderDate
        if (customerEdit !== undefined) {
            return customerEdit;
        } else {
            return new Date();
        }
    }
}