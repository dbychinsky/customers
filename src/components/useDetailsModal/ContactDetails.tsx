import React, { useEffect, useState } from "react";
import styles from "components/useDetailsModal/ContactDetails.module.scss";
import { useStores } from "store/RootStoreContext";
import { Contact } from "model/Contact";
import { observer } from "mobx-react";
import { Contacts } from "components/contacts/Contacts";
import { Products } from "components/products/Products";
import { History } from "components/history/History";
import { Reminder } from "components/reminder/Reminder";

/**
 * Интерфейс компонента "ContactDetails".
 *
 * @see ContactDetails
 */
interface IContactDetailsProps {
    /**
     * Идентификатор контакат.
     */
    contactId: number | null;
    /**
     * Функция закрытия модального окна.
     */
    closeModal: () => void;
}

/**
 * Компонент, отображающий детали контакта.
 *
 * @see IContactDetailsProps
 */
export const ContactDetails = observer(({ contactId, closeModal }: IContactDetailsProps) => {
    const { contactViewStore } = useStores();
    const [activeContact, setActiveContact] = useState<Contact>(new Contact());

    useEffect(() => {
        const targetContact = contactViewStore.contactList.find((contact) => contact.id === contactId);
        if (targetContact) {
            setActiveContact(targetContact);
        }
    }, [contactId, contactViewStore.contactList]);

    return (
        <div className={styles.contactDetails}>
            <div className={styles.contactDetailsWrapper}>
                <div className={styles.header}>
                    <div>{activeContact.organization}</div>
                    <div>{activeContact.contactFace}</div>
                </div>
                <div className={styles.content}>
                    <div className={styles.row}>
                        <Contacts activeContact={activeContact} className={styles.contactsModal} />
                        <Reminder activeContact={activeContact}
                                  className={styles.reminderModal}
                                  isBorderText={false} />
                    </div>
                    <div className={styles.row}>
                        <Products activeContact={activeContact}
                                  className={styles.productsModal}
                                  isHideComments={true} />
                        <History activeContact={activeContact} className={styles.historyModal}
                                 isBorderText={false} />
                    </div>
                </div>
            </div>
        </div>
    );
});

