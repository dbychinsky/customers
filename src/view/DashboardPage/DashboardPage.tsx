import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import styles from "./DashboardPage.module.scss";
import { ContactList } from "view/components/ContactList/ContactList";
import { useStores } from "store/RootStoreContext";
import { useNavigateHelper } from "router/hooks/useNavigateHelper";
import { ContactDescription } from "view/components/ContactDescription/ContactDescription";
import { Contact } from "model/Contact";

/**
 * @description Страница дашборда.
 */
export const DashboardPage = observer(() => {
    const { contactStore, authStore } = useStores();
    const { navigateToLoginPage } = useNavigateHelper();
    const [activeContact, setActiveContact] = useState<Contact | undefined>(undefined);

    useEffect(() => {
        if (!authStore.isAuth) {
            navigateToLoginPage();
        }
    }, [authStore.isAuth, navigateToLoginPage]);

    useEffect(() => {
        contactStore.getContactList();
    }, [contactStore]);

    if (contactStore.isLoading || !authStore.isAuth) {
        return <div>asdasdasdsadasdadsadsa</div>;
    }

    /**
     * @description Установка выбранного контакта в состояние.
     * @param id
     */
    function handleClickOnContact(id: number) {
        const targetContact = contactStore.contactList.find((contact) => contact.id === id);
        setActiveContact(targetContact);
    }

    return (
        <div className={styles.dashboardPage}>
            <ContactList contactStore={contactStore}
                         handleClickOnContact={handleClickOnContact} />
            <ContactDescription activeContact={activeContact} />
            {/* <div className={styles.additionalContent}>
                        <div className={styles.customerDetails}></div>
                        <div className={styles.widgetList}>
                            <div className={styles.statistic}></div>
                            <div className={styles.currency}></div>
                        </div>
                        <div className={styles.alertList}></div>
                    </div>*/}
        </div>
    );
});
