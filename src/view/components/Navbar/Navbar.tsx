import React from "react";
import styles from "./Navbar.module.scss";
import { observer } from "mobx-react";
import logotype from "../../../common/assets/BigLogotypeColor.jpg";
import { NavLink } from "react-router-dom";
import { RouterPathList } from "router/RouterPathList";

/**
 * Navbar.
 */
export const Navbar = observer(() => {
    return (
        <div className={styles.navbar}>
            <div className={styles.logotypeWrapper}>
                <img src={logotype} alt="myManager" className={styles.logotype} />
            </div>
            <NavLink to={RouterPathList.DASHBOARD_PAGE}>Кабинет</NavLink>
            <NavLink to={RouterPathList.DASHBOARD_PAGE}>Контакты</NavLink>
            <NavLink to={RouterPathList.CURRENCY_PAGE}>Валюты</NavLink>
        </div>
    );
});