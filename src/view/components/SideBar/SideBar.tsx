import React from "react";
import styles from "./SideBar.module.scss";
import { ContactDescription } from "view/components/ContactDescription/ContactDescription";
import { Contact } from "model/Contact";

interface ISideBarProps {
    activeContact: Contact | undefined;
}

/**
 * @description Сайд бар.
 * @param activeContact
 */
export const SideBar = ({ activeContact }: ISideBarProps) => {
    return (
        <div className={styles.sideBar}>
            <ContactDescription activeContact={activeContact} />
        </div>
    );
};
