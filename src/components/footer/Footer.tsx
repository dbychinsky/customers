import React from 'react';
import clsx from "clsx";
import styles from "components/footer/Footer.module.scss";
import {AuthStore} from "store/AuthStore";
import {observer} from "mobx-react";

interface IFooterProps {
    authStore: AuthStore;
}

/**
 * @description Футтер приложения.
 */
export const Footer = observer(({authStore}: IFooterProps) => {
    const classWrapper = clsx(styles.footer, {[styles.hidden]: !authStore.isAuth});

    return (
        <div className={classWrapper}>
            footer
        </div>
    );
});
