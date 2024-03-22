import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react";
import {StoreContext} from "App";
import {useRedirectInLoginPage} from "router/hooks/useRedirectInLoginPage";
import styles from "./DashboardPage.module.scss";
import {ContactList} from "view/components/ContactList";

/**
 * @description Страница дашборда.
 */
export const DashboardPage = observer(() => {
    const authStore = useContext(StoreContext).authStore;
    const {redirectToLoginPage} = useRedirectInLoginPage({isAuth: authStore.isAuth});

    useEffect(() => {
        redirectToLoginPage();
    }, [authStore.isAuth, redirectToLoginPage]);


    return (
        <div>
            {authStore.isAuth ?
                <div className={styles.dashboardPage}>
                    <ContactList/>
                    {/* <div className={styles.additionalContent}>
                        <div className={styles.customerDetails}></div>
                        <div className={styles.widgetList}>
                            <div className={styles.statistic}></div>
                            <div className={styles.currency}></div>
                        </div>
                        <div className={styles.alertList}></div>
                    </div>*/}
                </div>
                : null}
        </div>
    );
});
