import React, { useEffect } from 'react';
import styles from 'pages/CreateContactPage/CreateContactPage.module.scss';
import { HeadingH1 } from 'components/headingH1/headingH1';
import { AddPhone } from 'components/createContact/addPhone/AddPhone';
import { useStores } from 'store/RootStoreContext';
import { useNavigateHelper } from 'router/hooks/useNavigateHelper';
import { AddAddress } from 'components/createContact/addAddress/AddAddress';
import { AddNameContact } from 'components/createContact/addNameContact/AddNameContact';
import { Button } from 'components/button/Button';
import { observer } from 'mobx-react';
import { Flip, toast } from 'react-toastify';
import { AddProductList } from 'components/createContact/addProductList/AddProductList';
import { AddReminder } from 'components/createContact/addReminder/AddReminder';
import { AddHistory } from 'components/createContact/addHistory/AddHistory';
import { useParams } from 'react-router-dom';

/**
 * @description Страница создания контакта.
 */
export const CreateContactPage = observer(() => {
    const { authStore, contactListStore, contactEditStore } = useStores();
    const { navigateToDashboardPage } = useNavigateHelper();
    const { idContact } = useParams();

    useEffect(() => {
        if (!authStore.isAuth) {
            navigateToDashboardPage();
        }
    }, [authStore.isAuth, navigateToDashboardPage]);

    useEffect(() => {
        contactEditStore.clearFieldsCreateContact();
    }, [contactEditStore]);

    useEffect(() => {
        if (idContact) {
            contactEditStore.getContactById(idContact);
        }
    }, [contactEditStore, idContact]);

    return (
        <div className={styles.createContactPage}>
            <div className={styles.header}>
                <HeadingH1
                    title={!idContact ? 'Создание контакта' : 'Редактирование контакта'}
                    className={styles.heading}
                />
                <div>
                    <Button text='Отменить' onClick={navigateToDashboardPage} variant='cancel' />
                    <Button
                        text={!idContact ? 'Создать' : 'Сохранить'}
                        onClick={!idContact ? handleClickSendContact : handleClickSendEditContact}
                    />
                </div>
            </div>
            <form
                className={styles.form}
                onSubmit={(e: React.FormEvent) => {
                    e.preventDefault();
                    handleClickSendContact();
                }}
            >
                <AddNameContact contactEditStore={contactEditStore} />
                <AddPhone contactEditStore={contactEditStore} />
                <AddAddress contactEditStore={contactEditStore} />
                <AddProductList contactEditStore={contactEditStore} />
                <div className={styles.rightBlock}>
                    <AddReminder contactEditStore={contactEditStore} />
                    <AddHistory contactEditStore={contactEditStore} />
                </div>
                <div className={styles.send}>
                    <Button
                        text={!idContact ? 'Создать' : 'Сохранить'}
                        onClick={!idContact ? handleClickSendContact : handleClickSendEditContact}
                    />
                </div>
            </form>
        </div>
    );

    function handleClickSendContact() {
        contactEditStore.validateFields();
        if (contactEditStore.errorList.length === 0) {
            contactEditStore
                .pushContact()
                .then(() =>
                    toast.success('Запись добавлена', {
                        position: 'top-right',
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                        transition: Flip,
                    }),
                )
                .then(() => contactListStore.getContactList())
                .then(() => navigateToDashboardPage());
        }
    }

    function handleClickSendEditContact() {
        contactEditStore.validateFields();
        if (contactEditStore.errorList.length === 0) {
            contactEditStore
                .pushEditContact(idContact)
                .then(() =>
                    toast.success('Изменения сохранены', {
                        position: 'top-right',
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                        transition: Flip,
                    }),
                )
                .then(() => contactListStore.getContactList())
                .then(() => navigateToDashboardPage());
        }
    }
});
