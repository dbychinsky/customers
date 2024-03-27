import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import styles from "./DashboardPage.module.scss";
import { ContactList } from "view/components/ContactList/ContactList";
import { useStores } from "store/RootStoreContext";
import { useNavigateHelper } from "router/hooks/useNavigateHelper";
import { Contact } from "model/Contact";
import { SideBar } from "view/components/SideBar/SideBar";
import { CurrencyWidget } from "view/DashboardPage/CurrencyWidget/CurrencyWidget";
import { StatisticWidget } from "view/DashboardPage/StatisticWidget/StatisticWidget";
import ReactDOM from "react-dom/client";

/**
 * @description Страница дашборда.
 */
export const DashboardPage = observer(() => {
    const { contactStore, authStore } = useStores();
    const { navigateToLoginPage } = useNavigateHelper();
    const [activeContact, setActiveContact] = useState<Contact | undefined>(undefined);
    // const [widthContact, setWidthContact] = useState(0);
    // let widthContactList = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!authStore.isAuth) {
            navigateToLoginPage();
        }
    }, [authStore.isAuth, navigateToLoginPage]);

    useEffect(() => {
        contactStore.getContactList();
        setActiveContact(contactStore.contactList[0]);
    }, [contactStore]);

    // function getWidthBlockContactList() {
    //     if (widthContactList.current !== null) {
    //         setWidthContact(widthContactList.current.offsetWidth);
    //     }
    //     // const getWidth = () => {
    //     //     if (widthContactList.current !== null) {
    //     //         setWidthContact(widthContactList.current.offsetWidth);
    //     //     }
    //     // };
    // }

    // useEffect(() => {
    //     window.addEventListener("resize", getWidthBlockContactList);
    //     return () => window.removeEventListener("resize", getWidthBlockContactList);
    // }, []);
    //
    // if (contactStore.isLoading || !authStore.isAuth) {
    //     return <div>asdasdasdsadasdadsadsa</div>;
    // }


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
            <div className={styles.head}></div>
            <div className={styles.contactListWrapper}>
                <ContactList contactStore={contactStore}
                             handleClickOnContact={handleClickOnContact} />
            </div>
            <div className={styles.sideBarWrapper}>
                <SideBar activeContact={activeContact} />
                <CurrencyWidget />
                <StatisticWidget />
            </div>
        </div>
    );
});
