import React, { useEffect } from 'react';
import styles from 'pages/CreateContactPage/CreateContactPage.module.scss';
import { HeadingH1 } from 'components/headingH1/headingH1';
import { AddPhone } from 'components/createContact/addPhone/AddPhone';
import { useStores } from 'store/RootStoreContext';
import { useNavigateHelper } from 'router/hooks/useNavigateHelper';
import { AddAddress } from 'components/createContact/addAddress/AddAddress';
import { AddNameContact } from 'components/createContact/addNameContact/AddNameContact';
import { observer } from 'mobx-react';
import { Flip, toast } from 'react-toastify';
import { AddProductList } from 'components/createContact/addProductList/AddProductList';
import { AddReminder } from 'components/createContact/addReminder/AddReminder';
import { AddHistory } from 'components/createContact/addHistory/AddHistory';
import { useParams } from 'react-router-dom';
import { ButtonImage } from 'components/buttonImage/ButtonImage';
import { ReactComponent as Check } from 'common/assets/icon/check.svg';
import { ReactComponent as Cancel } from 'common/assets/icon/cancel_modal.svg';

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
            contactEditStore.getContactById(Number(idContact));
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
                    <ButtonImage
                        onClick={!idContact ? handleClickSendContact : handleClickSendEditContact}
                        image={<Check />}
                        onlyImage={true}
                        variant='add'
                    />
                    <ButtonImage
                        onClick={navigateToDashboardPage}
                        image={<Cancel />}
                        onlyImage={true}
                        variant='deleteContact'
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
                    <ButtonImage
                        onClick={!idContact ? handleClickSendContact : handleClickSendEditContact}
                        image={<Check />}
                        onlyImage={true}
                        variant='add'
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
                .pushEditContact(Number(idContact))
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
                .then(() => deleteNotificationById())
                .then(() => navigateToDashboardPage());
        }
    }

    function deleteNotificationById() {
        const datePrev = contactListStore.contact?.reminder.date;
        const dateNew = contactEditStore.contact.reminder.date;
        if (datePrev !== dateNew) {
            contactListStore.deleteRecordListNotification(contactEditStore.contact.id);
        }
        contactListStore.deleteRecordListNotification(contactEditStore.contact.id);
    }
});
