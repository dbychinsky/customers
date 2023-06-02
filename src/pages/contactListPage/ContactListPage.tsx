import React, {useContext, useEffect} from 'react';
import ContactList from "../../component/contactList/ContactList";
import {observer} from "mobx-react";
import "./ContactListPage.scss";
import ContactListReminderWidget from "../../component/contactListReminderWidget/ContactListReminderWidget";
import {RouterPathList} from "../../router/RouterPathList";
import {useNavigate} from "react-router";
import {StoreContext} from "../../App";
import ScrollTop from "../../component/scrollTop/ScrollTop";

/**
 * Страница со списком контактов
 */
const ContactListPage = observer(() => {
    const navigate = useNavigate();
    const authStore = useContext(StoreContext).authStore;

    useEffect(() => {
        if (!authStore.checkAuth()) {
            navigate(RouterPathList.ROOT_PATH);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="contactListPage">
            {/*<H1 text="Контакты"/>*/}
            <ContactList/>
            <div className="widget">
                <ContactListReminderWidget/>
                {/*<CurrencyTile/>*/}
            </div>
            <ScrollTop/>
        </div>
    );
});

export default ContactListPage;