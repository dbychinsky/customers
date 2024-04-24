import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import styles from 'pages/DashboardPage/DashboardPage.module.scss';
import { useStores } from 'store/RootStoreContext';
import { useNavigateHelper } from 'router/hooks/useNavigateHelper';
import { CurrencyWidget } from 'components/currencyWidget/CurrencyWidget';
import { ReminderStatisticWidget } from 'components/reminderStatisticWidget/ReminderStatisticWidget';
import clsx from 'clsx';
import { ContactList } from 'components/contactList/ContactList';
import { useContactDetailsModal } from 'components/contactDetails/useContactDetailsModal';
import { ToastContainer } from 'react-toastify';
import { ScrollTop } from 'components/scrollTop/ScrollTop';
import { CalendarWidget } from 'components/calendarWidget/CalendarWidget';

/**
 * @description Страница дашборда.
 */
export const DashboardPage = observer(() => {
    const { authStore, contactListStore, contactEditStore, currencyStore } = useStores();
    const { navigateToLoginPage } = useNavigateHelper();
    const [activeContactId, setActiveContactId] = useState<number | null>(null);
    const [isScrolling, setIsScrolling] = useState<boolean>(false);
    const classWrapperSideBar = clsx(styles.sideBarWrapper, { [styles.scroll]: isScrolling });
    const { ModalShowDetails, showDetailsHandler, onCloseDetailsModal } = useContactDetailsModal(deleteContact);

    useEffect(() => {
        if (!authStore.isAuth) {
            navigateToLoginPage();
        }
    }, [authStore.isAuth, navigateToLoginPage]);

    useEffect(() => {
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (authStore.isAuth) {
            contactListStore.checkNotifyOnTimer();
        }
    }, [authStore.isAuth, contactListStore, contactEditStore]);

    useEffect(() => {
        contactListStore.getContactList();
    }, [contactListStore, contactEditStore.pushContact]);

    return (
        <div className={styles.dashboardPage}>
            <div className={styles.head} />
            <ContactList
                contactListStore={contactListStore}
                handleClickOnContact={handleClickOnContact}
                isScrolling={isScrolling}
            />
            <div className={classWrapperSideBar}>
                <div className={styles.top}>
                    <ReminderStatisticWidget
                        contactListStore={contactListStore}
                        handleClickOnContact={handleClickOnContact}
                    />
                    <CurrencyWidget currencyStore={currencyStore} />
                </div>
                <div className={styles.bottom}>
                    <CalendarWidget contactListStore={contactListStore} />
                </div>
            </div>

            {ModalShowDetails(activeContactId)}
            <ToastContainer />
            <ScrollTop />
        </div>
    );

    /**
     * Отслеживание положения скролла
     */
    function handleScroll() {
        const scrollPositionLocal = window.scrollY; // => scroll position
        if (scrollPositionLocal > 0) {
            setIsScrolling(true);
        } else {
            setIsScrolling(false);
        }
    }

    /**
     * @description Установка выбранного контакта в состояние.
     * @param id
     */
    function handleClickOnContact(id: number) {
        setActiveContactId(id);
        showDetailsHandler();
    }

    /**
     * @description Удаление контакта.
     */
    function deleteContact() {
        onCloseDetailsModal();
        if (activeContactId) {
            contactListStore.deleteContactFromList(activeContactId);
        }
    }
});
