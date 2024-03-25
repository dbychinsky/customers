import React from "react";
import { AuthStore } from "store/AuthStore";
import styles from "./Header.module.scss";
import clsx from "clsx";
import { observer } from "mobx-react";
import logotype from "../../../common/assets/logotype-small.png";
import { NavLink } from "react-router-dom";
import { RouterPathList } from "router/RouterPathList";

interface IHeaderProps {
    authStore: AuthStore;
}

/**
 * Header.
 */
export const Header = observer(({ authStore }: IHeaderProps) => {
    const classWrapper = clsx(styles.header, { [styles.hidden]: !authStore.isAuth });

    return (
        <div className={classWrapper}>
            <img src={logotype} alt="myManager" className={styles.logotype} />
            <NavLink to={RouterPathList.DASHBOARD_PAGE}>Кабинет</NavLink>
            <NavLink to={RouterPathList.CURRENCY_PAGE}>Валюты</NavLink>
        </div>
    );
});