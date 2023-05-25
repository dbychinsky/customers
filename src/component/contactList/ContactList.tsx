import React, {useContext, useEffect} from 'react';
import {StoreContext} from "../../App";
import {observer} from "mobx-react";
import Contact from "../contact/Contact";
import {Button} from "../button/Button";
import "./ContactList.scss";
import {useNavigate} from "react-router";
import {RouterPathList} from "../../router/RouterPathList";
import H4 from "../header/H4";
import Search from "../search/Search";
import TextMessage from "../textMessage/TextMessage";


/**
 * Список контактов
 */
const ContactList = observer(() => {
    const contactStore = useContext(StoreContext).contactStore;
    const navigate = useNavigate();

    /**
     * Получаем список контактов
     */
    useEffect(() => {
        contactStore.get();
        contactStore.clearSearchField();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        contactStore.checkNotifyOnTimer();
    }, []);

    /**
     * Добавить контакта
     */
    const addContact = () => {
        navigate(RouterPathList.CONTACT_EDIT_PAGE)
    }

    /**
     * Проверить нотификацию
     */
    const checkNotify = () => {
        contactStore.checkNotifyOnHand();
    }

    /**
     * Обновить данные
     */
    const updateHandData = () => {
        contactStore.get();
    }

    return (
        <div className="contactList">
            <div className="headerList">
                <H4 text="Список контактов"/>
                <Button onClick={updateHandData}
                        classname="updateData imgBtn"
                        text="Обновить данные"/>
                <Button onClick={checkNotify}
                        classname="checkNotify imgBtn"
                        text="Нотифицировать"/>
                <Button onClick={addContact}
                        classname="addContact mainAction"
                        text="Добавить"/>
            </div>
            <Search/>
            {contactStore.contactList.length
                ? <Contact/>
                : <TextMessage message="Нет данных для отображения. Проверьте фильтры."
                               className="big"/>}

        </div>
    );
});

export default ContactList;