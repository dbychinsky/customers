import React, {useContext, useEffect} from "react";
import styles from "./ContactList.module.scss"
import {StoreContext} from "App";
import {observer} from "mobx-react";

/**
 * @description Список контактов.
 */
export const ContactList = observer(() => {
    const contactStore = useContext(StoreContext).contactStore;

    useEffect(() => {
        debugger;
        contactStore.getContactList();
    }, [contactStore]);

    return (
        <div className={styles.contactList}>
            {contactStore.contactList.map((contact) => (<div key={contact.id}>
                <div>{contact.organization}</div>
            </div>))}
        </div>

    );
});
