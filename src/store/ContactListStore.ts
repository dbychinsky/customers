import React from 'react';
import { makeAutoObservable, runInAction } from 'mobx';
import { Contact } from 'model/Contact';
import { server } from 'App';
import { PushNotification } from 'utils/pushNotification';
import { dateToDateUTC } from 'utils/dateToDateUTC';

/**
 * @description Store для отображения контактов.
 * Customer - заказчики.
 * Client - потенциальные заказчики.
 */
export class ContactListStore {
    /**
     * @description Список контактов.
     */
    contactList: Contact[] = [];

    /**
     * @description Список контактов используемый при поиске.
     */
    contactListSearching: Contact[] = [];

    /**
     * @description Контакт.
     */
    contact: Contact | null = null;

    /**
     * @description Флаг загрузки.
     */
    isLoading = false;

    /**
     * @description ПОИСК.
     */
    /**
     * Поле, принимает данные для поиска по организации и контактному лицу.
     */
    searchOrgFace = '';

    /**
     * @description Поле, принимает данные для поиска по телефону и email.
     */
    searchPhoneEmail = '';

    /**
     * @description Таймер проверки нотификаций
     */
    timer = Number(process.env.REACT_APP_TIMER_NOTIFICATION);

    /**
     * @description Список активных уведомлений.
     */
    contactListNotificationActive: Contact[] = [];
    /**
     * @description Список контактов с нотификациями.
     */
    activeReminderList: Contact[] = [];
    /**
     * @description Ближайшая нотификация.
     */
    nearContactListNotification?: Contact;

    constructor() {
        makeAutoObservable(this);
        this.getContactList = this.getContactList.bind(this);
        this.handleChangeSearchOrganization = this.handleChangeSearchOrganization.bind(this);
        this.handleChangeSearchPhone = this.handleChangeSearchPhone.bind(this);
        this.deleteRecordListNotification = this.deleteRecordListNotification.bind(this);
    }

    /**
     * @description Получение спика контактов.
     */
    getContactList() {
        runInAction(() => {
            this.isLoading = true;
        });
        server
            .getContacts()
            .then((contacts) => {
                runInAction(() => {
                    this.contactList = contacts;
                    this.contactListSearching = contacts;
                });
            })
            .then(() => {
                this.getNearNotification();
            })
            .catch((err) => {
                if (err.response) {
                    console.log('client received an error response (5xx, 4xx)');
                } else if (err.request) {
                    console.log('client never received a response, or request never left');
                }
            })
            .finally(() => {
                setTimeout(() => {
                    runInAction(() => {
                        this.isLoading = false;
                    });
                }, 500);
            });
    }

    /**
     * @description Удаление контакта.
     */
    deleteContactFromList(idContact: number) {
        server.deleteContact(idContact).then(this.getContactList);
    }

    getNearNotification() {
        this.contactList.forEach((contact: Contact) => {
            if (contact.reminder.bell) {
                this.activeReminderList.push(contact);
            }
        });

        runInAction(() => {
            this.nearContactListNotification = this.activeReminderList.sort(
                (a: Contact, b: Contact) => +new Date(a.reminder.date) - +new Date(b.reminder.date),
            )[0];
        });
    }

    /**
     * @description Поиск по организации и контактному лицу.
     */
    public handleChangeSearchOrganization(e: React.ChangeEvent<HTMLInputElement>) {
        const searchingValue = e.target.value;

        runInAction(() => {
            this.searchOrgFace = searchingValue;
            this.searchPhoneEmail = '';
        });

        if (searchingValue !== '') {
            runInAction(() => {
                this.contactList = this.contactListSearching.filter(
                    (contact) =>
                        contact.organization.toUpperCase().includes(searchingValue.toUpperCase()) ||
                        contact.contactFace.toUpperCase().includes(searchingValue.toUpperCase()),
                );
            });
        } else {
            runInAction(() => {
                this.contactList = this.contactListSearching;
            });
        }
    }

    /**
     * @description Поиск по номеру телефона.
     */
    handleChangeSearchPhone(e: React.ChangeEvent<HTMLInputElement>) {
        const searchingValue = e.target.value;

        runInAction(() => {
            this.searchPhoneEmail = searchingValue;
            this.searchOrgFace = '';
        });

        if (searchingValue !== '') {
            runInAction(() => {
                this.contactList = [];
            });

            this.contactListSearching.forEach((contact) => {
                contact.phoneList.forEach((phone) => {
                    if (phone.number.toUpperCase().includes(searchingValue.toUpperCase())) {
                        if (
                            this.contactList.find((contactFromList) => contactFromList.id === contact.id) === undefined
                        ) {
                            runInAction(() => {
                                this.contactList.push(contact);
                            });
                        }
                    }
                });
            });
        } else {
            this.contactList = this.contactListSearching;
        }
    }

    /**
     * @description Нотификация.
     * Проверяем каждый элемент списка на наличие флага "reminder". Если флаг true
     * проверяем дату: если текущая дата больше даты из записи - проверяем есть ли
     * этот элемент в списке (notificationList) активных нотификаций - если нет показываем
     * нотификацию.
     */
    checkNotify() {
        const timeNow = new Date();
        this.contactList.forEach((contact: Contact) => {
            const elemDate = dateToDateUTC(contact.reminder.date);
            if (contact.reminder.bell && elemDate < timeNow) {
                if (!this.isHasIdContact(contact.id)) {
                    PushNotification.pushNotify(contact.organization, contact.contactFace);
                    runInAction(() => {
                        this.contactListNotificationActive.push(contact);
                    });
                }
            }
        });
    }

    /**
     * @description Проверка на наличие id элемента в списке нотификаций.
     * @param contactId
     * @private
     */
    private isHasIdContact(contactId: number): boolean {
        let result = true;
        const id: Contact | undefined = this.contactListNotificationActive.find((contact) => contact.id === contactId);
        if (id === undefined) result = false;
        return result;
    }

    /**
     * @description Удаление записи из списка активных нотификаций.
     */
    deleteRecordListNotification(id: number) {
        runInAction(() => {
            this.contactListNotificationActive = this.contactListNotificationActive.filter(
                (contact: Contact) => contact.id !== id,
            );
        });
    }

    /**
     * Нотификация по таймеру
     */
    checkNotifyOnTimer() {
        setInterval(() => {
            this.checkNotify();
        }, this.timer);
    }
}
