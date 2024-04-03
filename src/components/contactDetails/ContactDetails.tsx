import React from "react";
import styles from "components/contactDetails/ContactDetails.module.scss";
import { observer } from "mobx-react";
import { Contact } from "model/Contact";
import { Contacts } from "components/contactDetails/contacts/Contacts";
import { Products } from "components/contactDetails/products/Products";
import { History } from "components/history/History";
import { Button } from "components/button/Button";
import { Reminder } from "components/reminder/Reminder";

interface IContactDescriptionProps {
    activeContact: Contact | undefined;
    showDetailsHandler: (contactId: number) => void;
}

/**
 * @description Подробная информация о клиенте.
 */
export const ContactDetails = observer(({ activeContact, showDetailsHandler }: IContactDescriptionProps) => {
    return (
        <div className={styles.contactDetails}>
            {activeContact ?
                <>
                    <Contacts activeContact={activeContact} />
                    <Products activeContact={activeContact}
                              isHideComments={false} />
                    <History activeContact={activeContact} isBorderText={true} />
                    <Reminder activeContact={activeContact} isBorderText={true} />
                    <div className={styles.actonButton}>
                        <Button text="Подробнее"
                                variant="custom"
                                onClick={() => showDetailsHandler(activeContact?.id)}
                                className={styles.buttonShowDetails}
                        />
                        <Button text="Редактировать"
                                variant="custom"
                                onClick={() => showDetailsHandler(activeContact?.id)}
                                className={styles.buttonEditDetails}
                        />
                        <Button text="Удалить"
                                variant="custom"
                                onClick={() => showDetailsHandler(activeContact?.id)}
                                className={styles.buttonDelete}
                        />
                    </div>
                </> :
                <div className={styles.selectRecord}>Выберите контакт для отображения деталей</div>}
        </div>
    );
});
