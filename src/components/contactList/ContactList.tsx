import React from 'react';
import styles from 'components/contactList/ContactList.module.scss';
import { ContactListStore } from 'store/ContactListStore';
import { TableHeader } from 'components/contactList/tableHeader/TableHeader';
import { TableBody } from 'components/contactList/tableBody/TableBody';

interface ContactListProps {
    contactStore: ContactListStore;
    handleClickOnContact: (id: number) => void;
    isScrolling: boolean;
}

/**
 * @description Список контактов.
 */
export function ContactList({ contactStore, handleClickOnContact, isScrolling }: ContactListProps) {
    return (
        <div className={styles.contactList}>
            <TableHeader isScrolling={isScrolling} />
            <TableBody contactStore={contactStore} handleClickOnContact={handleClickOnContact} />
        </div>
    );
}
