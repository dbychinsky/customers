import React, { useEffect, useState } from 'react';
import styles from 'components/contactDetails/ContactDetails.module.scss';
import { useStores } from 'store/RootStoreContext';
import { Contact } from 'model/Contact';
import { observer } from 'mobx-react';
import { ReactComponent as IconPerson } from 'common/assets/icon/iconPerson.svg';
import { ReactComponent as IconPersonTie } from 'common/assets/icon/iconPersonTie.svg';
import { ReactComponent as IconEditContact } from 'common/assets/icon/edit.svg';
import { ReactComponent as IconDeleteContact } from 'common/assets/icon/delete.svg';
import { ButtonImage } from 'components/buttonImage/ButtonImage';
import { Contacts } from 'components/contacts/Contacts';
import { Reminder } from 'components/reminder/Reminder';
import { Products } from 'components/products/Products';
import { History } from 'components/history/History';

/**
 * Интерфейс компонента "contactDetails".
 *
 * @see ContactDetails
 */
interface ContactDetailsProps {
    /**
     * Идентификатор контакат.
     */
    contactId: number | null;
    /**
     * Функция показа окна подтверждения.
     */
    setIsShowConfirm: (value: boolean) => void;
}

/**
 * Компонент, отображающий детали контакта.
 *
 * @see IContactDetailsProps
 */
export const ContactDetails = observer(({ contactId, setIsShowConfirm }: ContactDetailsProps) => {
    const { contactListStore } = useStores();
    const [activeContact, setActiveContact] = useState<Contact>(new Contact());

    useEffect(() => {
        const targetContact = contactListStore.contactList.find((contact) => contact.id === contactId);
        if (targetContact) {
            setActiveContact(targetContact);
        }
    }, [contactId, contactListStore.contactList]);

    return (
        <div className={styles.contactDetails}>
            <div className={styles.contactDetailsWrapper}>
                <div className={styles.header}>
                    {activeContact.organization.length ? (
                        <div className={styles.iconTie}>
                            <IconPersonTie />
                        </div>
                    ) : (
                        <div className={styles.iconPerson}>
                            <IconPerson />
                        </div>
                    )}
                    <div className={styles.contactName}>
                        <div className={styles.organization}>{activeContact.organization}</div>
                        <div className={styles.contactFace}>{activeContact.contactFace}</div>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.columnFirst}>
                        <div className={styles.row}>
                            <Contacts activeContact={activeContact} className={styles.contactsModal} />
                            <Reminder
                                activeContact={activeContact}
                                className={styles.reminderModal}
                                isBorderText={false}
                            />
                        </div>
                        <div className={styles.row}>
                            <Products
                                activeContact={activeContact}
                                className={styles.productsModal}
                                isHideComments={true}
                            />
                        </div>
                    </div>
                    <div className={styles.columnSecond}>
                        <History activeContact={activeContact} className={styles.historyModal} isBorderText={false} />
                    </div>
                </div>
            </div>
            <div className={styles.actionBar}>
                <ButtonImage
                    onClick={() => {
                        console.log('2');
                    }}
                    image={<IconEditContact />}
                    onlyImage={true}
                    className={styles.iconEditContact}
                    variant='editContact'
                />
                <ButtonImage
                    onClick={() => setIsShowConfirm(true)}
                    image={<IconDeleteContact />}
                    onlyImage={true}
                    className={styles.iconDeleteContact}
                    variant='deleteContact'
                />
            </div>
        </div>
    );
});
