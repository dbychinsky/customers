import React, {useContext, useEffect} from 'react';
import styles from './ContactList.module.scss'
import {StoreContext} from "App";

/**
 * @description Список контактов.
 */
export const ContactList = () => {
    const contactStore = useContext(StoreContext).contactStore;

    useEffect(() => {
        contactStore.get();
    }, []);

    return (
        <div className={styles.contactList}>
            {contactStore.contactList.map((contact) => (<div key={contact.id}>
                <div>{contact.organization}</div>
            </div>))}
        </div>

    );
};
