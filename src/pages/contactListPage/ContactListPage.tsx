import React from 'react';
import ContactList from "../../component/contactList/ContactList";
import {observer} from "mobx-react";
import "./ContactListPage.scss";
import Header from "../../component/header/Header";
import ContactListReminderWidget from "../../component/contactListReminderWidget/ContactListReminderWidget";
import H1 from "../../component/header/H1";

/**
 * Страница со списком контактов
 */
const ContactListPage = observer(() => {
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