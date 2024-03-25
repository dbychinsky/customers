import React from "react";
import styles from "./ContactList.module.scss";
import {observer} from "mobx-react";
import {ContactStore} from "store/ContactStore";
import {Searching} from "view/components/ContactList/searching/Searching";

interface IContactListProps {
    contactStore: ContactStore;
    handleClickOnContact: (id: number) => void;
}

/**
 * @description Список контактов.
 */
export const ContactList = observer(({contactStore, handleClickOnContact}: IContactListProps) => {
    return (
        <div className={styles.contactList}>
            <div className={styles.tableHeader}>
                <div className={styles.tableHeaderRow}>
                    <div className={styles.organization}>Организация</div>
                    <div className={styles.contactFace}>Контактное лицо</div>
                    <div className={styles.phoneList}>Контактные телефоны</div>
                    <div className={styles.reminder}></div>
                </div>
                <div className={styles.tableHeaderRow}>
                    <Searching/>
                </div>
            </div>
            {contactStore.contactList.map((contact) => (
                <div className={styles.tableBodyRow}
                     key={contact.id}
                     onClick={() => handleClickOnContact(contact.id)}
                     role={"presentation"}>
                    <div className={styles.organization}>{contact.organization}</div>
                    <div className={styles.contactFace}>{contact.contactFace}</div>
                    <div className={styles.phoneList}>{contact.phoneList.map((phone) =>
                        <div key={phone.number}>{phone.number}</div>)}</div>
                    <div className={styles.reminder}>{contact.reminder.toString()}</div>
                </div>))}
        </div>

    );
});
