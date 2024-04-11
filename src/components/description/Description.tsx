import React from "react";
import styles from "components/description/Description.module.scss";
import { Contact } from "model/Contact";


interface DescriptionProps {
    activeContact: Contact | undefined;
}

/**
 * @description Компонент вывода комментария.
 */
export function Description({ activeContact }: DescriptionProps) {
    return (
        <div className={styles.description}>
            {activeContact?.description}
        </div>
    );
};
