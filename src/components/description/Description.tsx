import React from "react";
import styles from "components/description/Description.module.scss";
import { Contact } from "model/Contact";


interface IDescriptionProps {
    activeContact: Contact | undefined;
}

/**
 * @description Компонент вывода комментария.
 */
export const Description = ({ activeContact }: IDescriptionProps) => {
    return (
        <div className={styles.description}>
            {activeContact?.description}
        </div>
    );
};
