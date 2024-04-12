import React from 'react';
import styles from 'components/navbar/Navbar.module.scss';
import { observer } from 'mobx-react';
import logotype from 'common/assets/BigLogotypeColor.jpg';
import { NavLink } from 'react-router-dom';
import { RouterPathList } from 'router/RouterPathList';
import { ReactComponent as Dashboard } from 'common/assets/icon/dashboard.svg';
import { ReactComponent as Calendar } from 'common/assets/icon/calendar.svg';
import { ReactComponent as Currency } from 'common/assets/icon/currency.svg';

/**
 * @description Навигация.
 */
export const Navbar = observer(() => (
    <div className={styles.navbar}>
        <div className={styles.logotypeWrapper}>
            <img src={logotype} alt='myManager' className={styles.logotype} />
        </div>
        <div className={styles.linkList}>
            <NavLink to={RouterPathList.DASHBOARD_PAGE} className={styles.link}>
                <Dashboard className={styles.icon} />
                <div>Кабинет</div>
            </NavLink>
            <NavLink to={RouterPathList.CALENDAR_PAGE} className={styles.link}>
                <Calendar className={styles.icon} />
                <div>Календарь</div>
            </NavLink>
            <NavLink to={RouterPathList.CURRENCY_PAGE} className={styles.link}>
                <Currency className={styles.icon} />
                <div>Валюты</div>
            </NavLink>
        </div>
    </div>
));
