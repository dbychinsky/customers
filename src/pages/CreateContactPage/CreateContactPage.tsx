import React, { useEffect } from "react";
import styles from "./CreateContactPage.module.scss";
import { HeadingH1 } from "components/headingH1/headingH1";
import { AddPhone } from "components/createContact/addPhone/addPhone";
import { useStores } from "store/RootStoreContext";
import { useNavigateHelper } from "router/hooks/useNavigateHelper";
import { AddEmail } from "components/createContact/addEmail/AddEmail";
import { AddNameContact } from "components/createContact/addNameContact/AddNameContact";
import { Button } from "components/button/Button";

/**
 * @description Страница создания контакта.
 */
export const CreateContactPage = () => {
    const { authStore, contactViewStore, contactEditStore } = useStores();
    const { navigateToDashboardPage } = useNavigateHelper();

    useEffect(() => {
        if (!authStore.isAuth) {
            navigateToDashboardPage();
        }
    }, [authStore.isAuth, navigateToDashboardPage]);

    return (
        <div className={styles.createContactPage}>
            <HeadingH1 title="Создание контакта" />
            <form>
                <AddNameContact contactEditStore={contactEditStore} />
                <AddPhone contactEditStore={contactEditStore} />
                <AddEmail contactViewStore={contactViewStore} />
                <Button text="send" onClick={addContact} />
            </form>
        </div>
    );

    function addContact() {
        contactEditStore.pushContact();
        navigateToDashboardPage();
    }
};
