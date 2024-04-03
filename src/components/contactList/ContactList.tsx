import React from "react";
import styles from "./ContactList.module.scss";
import { ContactStore } from "store/ContactStore";
import { TableHeader } from "components/contactList/tableHeader/TableHeader";
import { TableBody } from "components/contactList/tableBody/TableBody";

interface IContactListProps {
    contactStore: ContactStore;
    handleClickOnContact: (id: number) => void;
    isScrolling: boolean;
}

/**
 * @description Список контактов.
 */
export const ContactList = ({ contactStore, handleClickOnContact, isScrolling }: IContactListProps) => {
    return (
        <div className={styles.contactList}>
            <TableHeader isScrolling={isScrolling} />
            <TableBody contactStore={contactStore}
                       handleClickOnContact={handleClickOnContact} />
        </div>
    );
};
