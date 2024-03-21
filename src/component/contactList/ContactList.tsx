import React, {useContext, useEffect} from 'react';
import {StoreContext} from "../../App";
import {observer} from "mobx-react";
import Contact from "../contact/Contact";
import {Button} from "../../components/button/Button";
import {useNavigate} from "react-router";
import {RouterPathList} from "../../router/RouterPathList";
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Добавить контакта
     */
    const addContact = () => {
        // navigate(RouterPathList.CONTACT_EDIT_PAGE)
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
                <Button onClick={updateHandData}
                        className="updateData imgBtn"
                        text="Обновить данные"/>
                <Button onClick={checkNotify}
                        className="checkNotify imgBtn"
                        text="Нотифицировать"/>
                <Button onClick={addContact}
                        className="addContact mainAction"
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