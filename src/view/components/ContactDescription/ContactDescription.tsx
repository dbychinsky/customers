import React from 'react';
import styles from "./ContactDescription.module.scss"
import {observer} from "mobx-react";
import {PhoneList} from "view/components/ContactDescription/PhoneList/PhoneList";
import {Contact} from "model/Contact";

interface IContactDescriptionProps {
    activeContact: Contact | undefined;
}

/**
 *@description Подробная информация о клиенте.
 */
export const ContactDescription = observer(({activeContact}: IContactDescriptionProps) => {

    return (
        <div className={styles.contactDescription}>
            <PhoneList activeContact={activeContact}/>
        </div>
    );
});
