import React, { ReactElement } from 'react';
import styles from 'components/navbar/Navbar.module.scss';
import { observer } from 'mobx-react';
import logotype from 'common/assets/BigLogotypeColor.jpg';
import { NavLink } from 'react-router-dom';
import { RouterPathList } from 'router/RouterPathList';
import { ReactComponent as Dashboard } from 'common/assets/icon/dashboard.svg';
import { useStores } from 'store/RootStoreContext';

/**
 * @description Навигация.
 */
export const Navbar = observer(() => {
    const { contactListStore } = useStores();

    return (
        <div className={styles.navbar}>
            <div className={styles.logotypeWrapper}>
                <img src={logotype} alt='myManager' className={styles.logotype} />
            </div>
            <div className={styles.linkList}>
                <NavLink to={RouterPathList.DASHBOARD_PAGE} className={styles.link}>
                    <Dashboard className={styles.icon} />
                    <div className={styles.row}>
                        <div>Кабинет</div>
                        {contactListStore.contactListNotificationActivated.length ? getBadge() : null}
                    </div>
                </NavLink>
                {/*<NavLink to={RouterPathList.CALENDAR_PAGE} className={styles.link}>*/}
                {/*    <Calendar className={styles.icon} />*/}
                {/*    <div>Календарь</div>*/}
                {/*</NavLink>*/}
                {/*<NavLink to={RouterPathList.CURRENCY_PAGE} className={styles.link}>*/}
                {/*    <Currency className={styles.icon} />*/}
                {/*    <div>Валюты</div>*/}
                {/*</NavLink>*/}
            </div>
        </div>
    );

    function getBadge(): ReactElement {
        return (
            <div className={styles.badgeNotifications}>
                <div className={styles.badge}>{contactListStore.contactListNotificationActivated.length}</div>
            </div>
        );
    }
});
