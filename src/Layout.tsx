import React from "react";
import { Outlet } from "react-router";
import { useStores } from "store/RootStoreContext";
import styles from "./Layout.module.scss";
import clsx from "clsx";
import { observer } from "mobx-react";
import { Navbar } from "components/navbar/Navbar";

export const Layout = observer(() => {
    const { authStore } = useStores();
    const classWrapperNavbar = clsx(styles.navbar, { [styles.logged]: !authStore.isAuth });
    const classWrapperContent = clsx(styles.content, { [styles.logged]: !authStore.isAuth });

    return (
        <div className={styles.layout}>
            <div className={classWrapperNavbar}>
                <Navbar />
            </div>
            <div className={classWrapperContent}>
                <Outlet />
            </div>
        </div>
    );
});