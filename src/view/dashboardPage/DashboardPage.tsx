import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react";
import {StoreContext} from "App";
import {useRedirectInLoginPage} from "router/hooks/useRedirectInLoginPage";

/**
 * @description Страница дашборда
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
                <h1>dashboard</h1> : null}
        </div>
    );
});
