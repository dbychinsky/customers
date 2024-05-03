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
import { useNavigateHelper } from 'router/hooks/useNavigateHelper';
import clsx from 'clsx';
import { HistoryType } from 'store/contactEditStore/types';

/**
 * @description Интерфейс компонента "contactDetails".
 *
 * @see ContactDetails
 */
interface ContactDetailsProps {
    /**
     * @description  Идентификатор контакат.
     */
    contactId: string | null;
    /**
     * @description  Функция показа окна подтверждения.
     */
    setIsShowConfirm: (value: boolean) => void;
}

/**
 * @description Компонент, отображающий детали контакта.
 *
 * @see IContactDetailsProps
 */
export const ContactDetails = observer(({ contactId, setIsShowConfirm }: ContactDetailsProps) => {
    const { contactListStore } = useStores();
    const { navigateToEditContactPage } = useNavigateHelper();
    const [isHasReminder, setIsHasReminder] = useState(false);
    const [activeContact, setActiveContact] = useState<Contact>(new Contact());
    const classWrapperContactDetails = clsx(styles.contactDetails, { [styles.isHasReminder]: isHasReminder });

    useEffect(() => {
        if (contactListStore.contactList.find((contact) => contact.id === activeContact.id)) {
            setIsHasReminder(true);
        }
    }, [activeContact.id, contactListStore.contactList]);

    useEffect(() => {
        const targetContact = contactListStore.contactList.find((contact) => contact.id === contactId);
        if (targetContact) {
            setActiveContact(targetContact);
        }
    }, [contactId, contactListStore.contactList]);

    return (
        <div className={classWrapperContactDetails}>
            <div className={styles.contactDetailsWrapper}>
                <div className={styles.header}>
                    {activeContact.organization.length !== 0 ? (
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
                        <History historyListSorted={getHistorySorted()} className={styles.historyModal} />
                    </div>
                </div>
                <div className={styles.actionBar}>
                    <ButtonImage
                        onClick={() => navigateToEditContactPage(activeContact.id.toString())}
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
        </div>
    );

    function getHistorySorted(): HistoryType[] {
        return activeContact?.historyList.slice().sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
    }
});
