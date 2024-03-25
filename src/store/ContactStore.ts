import {makeAutoObservable, runInAction} from "mobx";
import {Contact} from "model/Contact";
import {server} from "App";

/**
 * Store для работы с LoanStore
 * Customer - заказчики
 * Client - потенциальные заказчики
 */
export class ContactStore {

    /**
     * @description Список контактов.
     */
    contactList: Contact[] = [];

    /**
     * @description Флаг загрузки.
     */
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
        this.getContactList = this.getContactList.bind(this);
    }

    /**
     * @description Получение спика контактов.
     */
    getContactList() {
        runInAction(() => {
            this.isLoading = true;
        })
        server.getContacts().then(contacts => {
            runInAction(() => {
                this.contactList = contacts;
            })
        }).catch(err => {
            if (err.response) {
                console.log("client received an error response (5xx, 4xx)")
            } else if (err.request) {
                console.log("client never received a response, or request never left")

            }
        }).finally(() => {
            setTimeout(() => {
                runInAction(() => {
                    this.isLoading = false;
                })
            }, 2000)
        })
        //     server.getContacts()
        //         .then(response => {
        //             this.setContactList(response);
        //         })
        //         .then(() =>
        //             runInAction(() => {
        //                 this.contactListTemp = this.contactList;
        //             }))
        //         .then(() => {
        //             runInAction(() => {
        //                 this.customer = true
        //                 this.client = true
        //             })
        //         })
        //         .catch(err => {
        //             if (err.response) {
        //                 console.log("client received an error response (5xx, 4xx)")
        //             } else if (err.request) {
        //                 console.log("client never received a response, or request never left")
        //
        //             } else {
        //                 console.log("anything else")
        //             }
        //         })
    }

    /**
     * Добавление нового контакта
     * @param e
     */
    // public handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     runInAction(() => {
    //         this.newContact = {
    //             ...this.newContact, [e.target.name]: e.target.value
    //         }
    //     });
    // };

    /**
     * Добавление нового проекта
     * @param e
     */
    // public handleChangeProducts(e: React.ChangeEvent<HTMLInputElement>) {
    //     runInAction(() => {
    //         this.product = e.target.value;
    //     });
    // };

    /**
     * Добавление нового номера телефона
     * @param e
     */
    // public handleChangePhone(e: React.ChangeEvent<HTMLInputElement>) {
    //     runInAction(() => {
    //         this.phone = e.target.value;
    //     });
    // };

    /**
     * Слушатель для поля поиска по проекту
     * @param e
     */
    // public handleChangeSearchOrganization(e: React.ChangeEvent<HTMLInputElement>) {
    //     runInAction(() => {
    //         this.searchOrganization = e.target.value;
    //     });
    // };

    /**
     * Слушатель для поля поиска по проекту
     * @param e
     */
    // public handleChangeSearchContactFace(e: React.ChangeEvent<HTMLInputElement>) {
    //     runInAction(() => {
    //         this.searchContactFace = e.target.value;
    //     });
    // };

    /**
     * Слушатель для поля поиска по продукту
     * @param e
     */
    // public handleChangeSearchProduct(e: React.ChangeEvent<HTMLInputElement>) {
    //     runInAction(() => {
    //         this.searchProduct = e.target.value;
    //     });
    // };

    /**
     * Слушатель для поля поиска по телефону
     * @param e
     */
    // public handleChangeSearchPhone(e: React.ChangeEvent<HTMLInputElement>) {
    //     runInAction(() => {
    //         this.searchPhone = e.target.value;
    //     });
    // };

    /**
     * Поиск по организации
     */
    // public searchOrgField() {
    //     if (this.searchOrganization !== "") {
    //         runInAction(() => {
    //             this.contactList = this.contactList.filter(elem => {
    //                 return elem.organization.toUpperCase().includes(this.searchOrganization.toUpperCase())
    //             })
    //         })
    //     } else {
    //         runInAction(() => {
    //             this.contactList = this.contactListTemp;
    //         })
    //     }
    // }

    /**
     * Поиск по ФИО
     */
    // public searchContactFaceField() {
    //     if (this.searchContactFace !== "") {
    //         runInAction(() => {
    //             this.contactList = this.contactList.filter(elem => {
    //                 return elem.contactFace.toUpperCase().includes(this.searchContactFace.toUpperCase())
    //             })
    //         })
    //     } else {
    //         runInAction(() => {
    //             this.contactList = this.contactListTemp;
    //         })
    //     }
    // }

    /**
     * Поиск по продукту
     */
    // public searchProductField() {
    //     if (this.searchProduct !== "") {
    //         runInAction(() => {
    //             this.contactList = this.contactList.filter((contact) => {
    //                 return contact.products.find((elem) => elem.toUpperCase().includes(this.searchProduct.toUpperCase()))
    //             })
    //         })
    //     } else {
    //         runInAction(() => {
    //             this.contactList = this.contactListTemp;
    //         })
    //     }
    // }

    /**
     * Поиск по телефону
     */
    // public searchPhoneField() {
    //     if (this.searchPhone !== "") {
    //         runInAction(() => {
    //             this.contactList = this.contactList.filter((contact) => {
    //                 return contact.phoneList.find((elem) => elem.number.toUpperCase().includes(this.searchPhone.toUpperCase()))
    //             })
    //         })
    //     } else {
    //         runInAction(() => {
    //             this.contactList = this.contactListTemp;
    //         })
    //     }
    // }

    /**
     * Очистка полей поиска
     */
    // public clearSearchField() {
    //     runInAction(() => {
    //         this.searchOrganization = "";
    //         this.searchPhone = "";
    //         this.searchProduct = "";
    //         this.searchContactFace = "";
    //     })
    // }

    /**
     * Удаление проекта
     * @param name
     */
    // public deleteRecordProductList(name: string) {
    //     runInAction(() => {
    //         this.productList = this.productList.filter(productName => productName !== name);
    //     });
    // };

    /**
     * Добавить проект в список
     */
    // public addProjectInList() {
    //     runInAction(() => {
    //         this.productList.push(this.product)
    //     });
    //     runInAction(() => {
    //         this.product = "";
    //     });
    // }

    /**
     * Добавление проекта в архив
     * @param e
     */
    // public handleChangeProductsArchive(e: React.ChangeEvent<HTMLInputElement>) {
    //     runInAction(() => {
    //         this.productArchive = e.target.value;
    //     });
    // };

    /**
     * Удаление телефона
     * @param number
     */
    // public deleteRecordPhoneList(number: string) {
    //     runInAction(() => {
    //         this.phoneList.splice(0, this.phoneList.length, ...this.phoneList.filter(phone => phone.number !== number))
    //     });
    // };

    /**
     * Добавить проект в список архивных
     */
    // public addProjectInListArchive() {
    //     runInAction(() => {
    //         this.productListsArchive.push(this.productArchive)
    //     });
    //     runInAction(() => {
    //         this.productArchive = "";
    //     });
    // }


    /**
     * Добавить телефон в список
     */
    // public addPhoneInList() {
    //
    //     runInAction(() => {
    //         this.phoneList.push({number: this.phone, typeList: this.atrListPhone});
    //     });
    //     runInAction(() => {
    //         this.phone = "";
    //     });
    //
    //     runInAction(() => {
    //         this.atrListPhone = []
    //     })
    // }

    /**
     * Удаление телефона из списка
     * @param name
     */
    // public deleteRecordProductListArchive(name: string) {
    //     runInAction(() => {
    //         this.productListsArchive = this.productListsArchive.filter(productName => productName !== name);
    //     });
    // };

    /**
     * Слушатель для чекбокса
     * @param e
     */
    // public handleChangeCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    //     runInAction(() => {
    //         this.newContact = {
    //             ...this.newContact, [e.target.name]: e.target.checked
    //         }
    //     });
    // };

    /**
     * Установка списка контактов
     */
    // private setContactList(contacts: Contact[]) {
    //     runInAction(() => {
    //         this.contactList = contacts;
    //     });
    // }

    /**
     * Получение данных
     */
    // public get() {
    //     server.getContacts()
    //         .then(response => {
    //             this.setContactList(response);
    //         })
    //         .then(() =>
    //             runInAction(() => {
    //                 this.contactListTemp = this.contactList;
    //             }))
    //         .then(() => {
    //             runInAction(() => {
    //                 this.customer = true
    //                 this.client = true
    //             })
    //         })
    //         .catch(err => {
    //             if (err.response) {
    //                 console.log("client received an error response (5xx, 4xx)")
    //             } else if (err.request) {
    //                 console.log("client never received a response, or request never left")
    //
    //             } else {
    //                 console.log("anything else")
    //             }
    //         })
    // };

    /**
     * Сохранение данных
     */
    // public save(date: Date) {
    //     runInAction(() => {
    //         this.newContact.reminderDate = date;
    //     });
    //
    //     runInAction(() => {
    //         this.newContact.products = this.productList;
    //         this.phoneList.forEach((elem) => {
    //             this.newContact.phoneList.push({number: elem.number, typeList: elem.typeList});
    //         })
    //     });
    //
    //     server.addContact(this.newContact)
    //         .then(() => this.get());
    // }

    /**
     * Удаление элемента
     */
    // public remove(idContact: number) {
    //     server.deleteContact(idContact)
    //         .then(() => this.get());
    // }

    /**
     * Обновление данных
     */
    // public update(id: string, data: any, date: Date) {
    //     runInAction(() => {
    //         this.newContact.reminderDate = date;
    //     });
    //
    //     runInAction(() => {
    //         this.newContact.products = this.productList;
    //         this.newContact.phoneList = [];
    //         this.phoneList.forEach((elem) => {
    //             this.newContact.phoneList.push({number: elem.number, typeList: elem.typeList});
    //         })
    //     });
    //
    //     server.updateContact(id, data)
    //         .then(() => this.get());
    // }

    /**
     * Проверка на наличие id элемента в списке нотификаций
     * @param contactId
     * @private
     */
    // private isHasIdContact(contactId: number): boolean {
    //     let result: boolean = true;
    //     const id: Contact | undefined =
    //         this.contactListNotificationActive.find(contact => contact.id === contactId);
    //     if (id === undefined) result = false
    //     return result;
    // }

    /**
     * Удаление записи из списка активных нотификаций
     */
    // public deleteRecordListNotification(id: string = "") {
    //     runInAction(() => {
    //         this.contactListNotificationActive = this.contactListNotificationActive.filter((contact: Contact) => contact.id !== Number(id))
    //     })
    // }

    /**
     * Устанавливаем данные в поля для редактирования
     */
    // public setEditPlace(id?: number) {
    //     if (id !== undefined) {
    //         const contactEdit = this.contactList.find(contact => contact.id === id);
    //         if (contactEdit !== undefined) {
    //             runInAction(() => {
    //                 this.newContact = contactEdit;
    //                 this.productList = contactEdit.products;
    //
    //                 contactEdit.phoneList.forEach((elem) => {
    //                     this.phoneList.push({number: elem.number, typeList: elem.typeList})
    //                 })
    //             })
    //
    //         }
    //     } else {
    //         runInAction(() => {
    //             this.newContact = new Contact();
    //             this.productList = [];
    //             this.productListsArchive = [];
    //             this.product = "";
    //             this.productArchive = "";
    //             this.phoneList = [];
    //             this.phone = "";
    //         })
    //     }
    // }

    /**
     * Получение даты для установления в локальный стейт при редактировании
     * данных
     */
    // public getDateForState(id: number): any {
    //     const contactEdit = this.contactList.find(contact => contact.id === id)?.reminderDate
    //     if (contactEdit !== undefined) {
    //         return contactEdit;
    //     } else {
    //         return new Date();
    //     }
    // }

    /**
     * Нотификация по таймеру
     */
    // public checkNotifyOnTimer() {
    //     setInterval(() => {
    //         this.checkNotify();
    //     }, this.timer)
    // }

    /**
     * Нотификация, вызваная вручную
     */
    // public checkNotifyOnHand() {
    //     this.checkNotify();
    // }

    /**
     * Нотификация.
     * Проверяем каждый элемент списка на наличие флага "reminder". Если флаг true
     * проверяем дату: если текущая дата больше даты из записи - проверяем есть ли
     * этот элемент в списке (notificationList) активных нотификаций - если нет показываем
     * нотификацию.
     */
    // private checkNotify() {
    //     const timeNow = new Date();
    //     this.contactList.forEach((contact: Contact) => {
    //         let elemDate = Conversation.dateToDateUTC(contact.reminderDate);
    //         if (contact.reminder && elemDate < timeNow) {
    //             if (!this.isHasIdContact(contact.id)) {
    //                 PushNotification.pushNotify(contact.organization, contact.contactFace);
    //                 runInAction(() => {
    //                     this.contactListNotificationActive.push(contact);
    //                 })
    //             }
    //
    //         }
    //     });
    // }

    /**
     * Сортировка по названию
     */
    // public sortContactListName = (fieldName: string) => {
    //     runInAction(() => {
    //         this.contactList = this.contactList.sort(function (a: any, b: any) {
    //             let organizationA = a[fieldName].toLowerCase(), organizationB = b[fieldName].toLowerCase()
    //             if (organizationA < organizationB) //сортируем строки по возрастанию
    //                 return -1
    //             if (organizationA > organizationB)
    //                 return 1
    //             return 0 // Никакой сортировки
    //         });
    //     })
    // };

    /**
     * Фильтр. Показать только заказчиков
     * если заказчик = true, показываем
     */
    // private viewCustomer() {
    //     runInAction(() => {
    //         this.contactList = this.contactListTemp.filter((contact) =>
    //             contact.products.length !== 0
    //         )
    //     })
    // }

    /**
     * Фильтр. Показать только клиентов
     */
    // private viewClient() {
    //     runInAction(() => {
    //         this.contactList = this.contactListTemp.filter((contact) =>
    //             contact.products.length === 0
    //         )
    //     })
    // }

    /**
     * Фильтр. Показать все контакты
     */
    // private viewAllContacts() {
    //     runInAction(() => {
    //         this.contactList = this.contactListTemp
    //     })
    // }

    /**
     * Слушатель для чекбокса Заказчик
     * @param e
     */
    // public handleChangeCheckboxFilterCustomer(e: React.ChangeEvent<HTMLInputElement>) {
    //     runInAction(() => {
    //         this.customer = e.target.checked;
    //     });
    //     if (this.customer) {
    //         if (this.client) {
    //             this.viewAllContacts();
    //         } else {
    //             this.viewCustomer()
    //         }
    //     } else {
    //         if (this.client) {
    //             this.viewClient();
    //         } else {
    //             this.contactList = []
    //         }
    //     }
    // };

    /**
     * Слушатель для чекбокса Клиент
     * @param e
     */
    // public handleChangeCheckboxFilterClient(e: React.ChangeEvent<HTMLInputElement>) {
    //     runInAction(() => {
    //         this.client = e.target.checked;
    //     });
    //     if (this.client) {
    //         if (this.customer) {
    //             this.viewAllContacts();
    //         } else {
    //             this.viewClient()
    //         }
    //     } else {
    //         if (this.customer) {
    //             this.viewCustomer();
    //         } else {
    //             this.contactList = []
    //         }
    //     }
    // };

    /**
     * Добавляем атрибут в список
     */
    // public addToListAtrPhone(atr: string) {
    //     runInAction(() => {
    //         this.atrListPhone.push(atr);
    //     })
    // }

    /**
     * Очистка списка с телефонами
     */
    // public clearPhoneList() {
    //     runInAction(() => {
    //         this.phoneList = [];
    //     })
    // }
}
