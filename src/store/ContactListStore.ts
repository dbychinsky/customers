import React from 'react';
import { makeAutoObservable, runInAction } from 'mobx';
import { Contact } from 'model/Contact';
import { server } from 'App';
import { PushNotification } from 'utils/pushNotification';
import { dateToDateUTC } from 'utils/dateToDateUTC';
import { SortEnum } from 'components/contactList/searchingPanel/SearchingPanel';

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
    contactListSrcBuffer: Contact[] = [];

    /**
     * @description Список контактов используемый при поиске.
     */

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
     * @description Список контактов с активированными уведомлениями.
     */
    contactListNotificationActivated: Contact[] = [];
    /**
     * @description Список контактов с нотификациями.
     */
    reminderListWithNotification: Contact[] = [];
    /**
     * @description Список дней с нотификациями для календаря.
     */
    reminderListDateWithNotification: number[] = [];
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
                    this.contactList = contacts.sort((a, b) => (Number(a.id) > Number(b.id) ? 1 : -1));
                    this.contactListSrcBuffer = contacts.sort((a, b) => (Number(a.id) > Number(b.id) ? 1 : -1));
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
    deleteContactFromList(idContact: string) {
        server.deleteContact(idContact).then(this.getContactList);
    }

    /**
     * @description Получение ближайшей нотификации.
     */
    getNearNotification() {
        this.contactList.forEach((contact: Contact) => {
            if (contact.reminder.bell) {
                this.reminderListWithNotification.push(contact);
            }
        });

        runInAction(() => {
            this.nearContactListNotification = this.reminderListWithNotification.sort(
                (a: Contact, b: Contact) => +new Date(a.reminder.date) - +new Date(b.reminder.date),
            )[0];
        });
    }

    /**
     * @description Получение даты для календаря с напоминаниями.
     */
    getDateForCalendarReminder(date: Date) {
        runInAction(() => {
            this.reminderListDateWithNotification = [];
        });
        this.reminderListWithNotification.forEach((contact) => {
            const contactMonth = new Date(contact.reminder.date).getMonth();
            const propsMonth = date.getMonth();
            const contactYear = new Date(contact.reminder.date).getFullYear();
            const propsYear = date.getFullYear();

            if (contactMonth === propsMonth && contactYear === propsYear) {
                runInAction(() => {
                    this.reminderListDateWithNotification.push(new Date(contact.reminder.date).getDate());
                });
            }
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
                this.contactList = this.contactListSrcBuffer.filter(
                    (contact) =>
                        contact.organization.toUpperCase().includes(searchingValue.toUpperCase()) ||
                        contact.contactFace.toUpperCase().includes(searchingValue.toUpperCase()),
                );
            });
        } else {
            runInAction(() => {
                this.contactList = this.contactListSrcBuffer;
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

            this.contactListSrcBuffer.forEach((contact) => {
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
            this.contactList = this.contactListSrcBuffer;
        }
    }

    /**
     * @description Сортировка по организации.
     */
    handleChangeSortingOrganization(sortState: SortEnum) {
        if (sortState === SortEnum.NO_SORTED) {
            runInAction(() => {
                this.contactList = this.contactList.sort((a, b) =>
                    a.organization.toLowerCase() > b.organization.toLowerCase() ? 1 : -1,
                );
            });
        }

        if (sortState === SortEnum.SORTED_AZ) {
            runInAction(() => {
                this.contactList = this.contactList.sort((a, b) =>
                    b.organization.toLowerCase() > a.organization.toLowerCase() ? 1 : -1,
                );
            });
        }

        if (sortState === SortEnum.SORTED_ZA) {
            runInAction(() => {
                this.contactList = this.contactList.sort((a, b) => (Number(a.id) > Number(b.id) ? 1 : -1));
            });
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
                        this.contactListNotificationActivated.push(contact);
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
    private isHasIdContact(contactId: string): boolean {
        let result = true;
        const id: Contact | undefined = this.contactListNotificationActivated.find(
            (contact) => contact.id === contactId,
        );
        if (id === undefined) result = false;
        return result;
    }

    /**
     * @description Удаление записи из списка активных нотификаций.
     */
    deleteRecordListNotification(id: string) {
        runInAction(() => {
            this.contactListNotificationActivated = this.contactListNotificationActivated.filter(
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
