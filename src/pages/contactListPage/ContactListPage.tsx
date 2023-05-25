import React, {useContext, useEffect} from 'react';
import ContactList from "../../component/contactList/ContactList";
import {observer} from "mobx-react";
import "./ContactListPage.scss";
import Header from "../../component/header/Header";
import ContactListReminderWidget from "../../component/contactListReminderWidget/ContactListReminderWidget";
import H1 from "../../component/header/H1";
import {RouterPathList} from "../../router/RouterPathList";
import {useNavigate} from "react-router";
import {StoreContext} from "../../App";

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
            <Header/>
            <H1 text="Контакты"/>
            <ContactList/>
            <ContactListReminderWidget/>
        </div>
    );
});

export default ContactListPage;