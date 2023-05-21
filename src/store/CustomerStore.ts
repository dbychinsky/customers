import React from "react";
import {makeAutoObservable, runInAction} from "mobx";
import {Customer} from "../model/Customer";
import {server} from "../App";
import {PushNotification} from "../utility/PushNotification";
import {Conversation} from "../utility/Conversation";
import {ProductList} from "../model/ProductList";

/**
 * Store для работы с LoanStore
 */
export class CustomerStore {

    /**
     * Новый заказчик
     */
    public newCustomer: Customer = new Customer();

    /**
     * Новый проект, принадлежащий заказчику
     */
    public product: string = '';

    /**
     * Список проектов, принадлежащие заказчику
     */
    public productLists: ProductList[] = [];


    /**
     * Проект для добавления в архив, принадлежащий заказчику
     */
    public productArchive: string = '';

    /**
     * Список проектов в архиве, принадлежащие заказчику
     */
    public productListsArchive: ProductList[] = [];

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
        this.handleChangeProducts = this.handleChangeProducts.bind(this);
        this.handleChangeProductsArchive = this.handleChangeProductsArchive.bind(this);
        this.addProjectInList = this.addProjectInList.bind(this);
        this.addProjectInListArchive = this.addProjectInListArchive.bind(this);
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
     * Добавление нового проекта
     * @param e
     */
    public handleChangeProducts(e: React.ChangeEvent<HTMLInputElement>) {
        runInAction(() => {
            this.product = e.target.value;
        });
    };

    /**
     * Удаление проекта
     * @param e
     */
    public deleteRecordProductList(id: string) {
        runInAction(() => {
            this.productLists = this.productLists.filter(product => product.id !== id);
        });
    };

    /**
     * Добавить проект в список
     */
    public addProjectInList() {
        runInAction(() => {
            this.productLists.push({id: this.createId(this.productLists), name: this.product})
        });
    }

    /**
     * Добавление проекта в архив
     * @param e
     */
    public handleChangeProductsArchive(e: React.ChangeEvent<HTMLInputElement>) {
        runInAction(() => {
            this.productArchive = e.target.value;
        });
    };

    /**
     * Удаление проекта из архива
     * @param e
     */
    public deleteRecordProductListArchive(id: string) {
        runInAction(() => {
            this.productListsArchive = this.productListsArchive.filter(product => product.id !== id);
        });
    };

    /**
     * Добавить проект в список архивных
     */
    public addProjectInListArchive() {
        runInAction(() => {
            this.productListsArchive.push({id: this.createId(this.productListsArchive), name: this.productArchive})
        });
    }

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

        runInAction(() => {
                this.customerList = this.customerList.sort((elem1: any, elem2: any) =>
                    elem2.activeReminder - elem1.activeReminder);

            }
        )
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
        // const products = this.newCustomer.products;
        runInAction(() => {
            this.newCustomer.reminderDate = date;
        });
        runInAction(() => {
            this.newCustomer.products = this.productLists;
        });

        // if (products === '') {
        //     runInAction(() => {
        //         this.newCustomer.products = 'Не печатается'
        //     })
        // }

        server.addCustomer(this.newCustomer)
            .then(() => this.get());
    }

    /**
     * Обновление данных
     */
    public update(id: string, data: any, date: Date) {
        // const products = this.newCustomer.products;
        runInAction(() => {
            this.newCustomer.reminderDate = date;
        });

        runInAction(() => {
            this.newCustomer.products = this.productLists;
        });

        // if (products === '') {
        //     runInAction(() => {
        //         this.newCustomer.products = 'Не печатается'
        //     })
        // }

        server.updateCustomer(id, data)
            .then(() => this.get());
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
     * Удаление записи из списка активных нотификаций
     */
    public deleteRecordListNotification(id: string = '') {
        runInAction(() => {
            this.customerListNotificationActive = this.customerListNotificationActive.filter((customer: Customer) => customer.id !== Number(id))
        })
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
                    this.productLists = customerEdit.products;
                    this.productListsArchive = customerEdit.productsArchive;
                })

            }
        } else {
            runInAction(() => {
                this.newCustomer = new Customer();
                this.productLists = [];
                this.productListsArchive = [];
                this.product = '';
                this.productArchive = '';
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

                        // PushNotification.pushNotify(customer.products);
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
                    // PushNotification.pushNotify(customer.products);
                    runInAction(() => {
                        this.customerListNotificationActive.push(customer);
                    })


                }

            }
        })
        runInAction(() => {
                this.customerList = this.customerList.sort((elem1: any, elem2: any) =>
                    elem2.activeReminder - elem1.activeReminder);

            }
        )
    }

    /**
     * Метод получения id
     */
    public createId<T extends { id: string }>(list: T[]): string {
        if (list.length) {
            return (Number(list[list.length - 1].id) + 1).toString()
        } else {
            return '0'
        }
    }

}