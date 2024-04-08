import React, { useEffect } from "react";
import styles from "./CreateContactPage.module.scss";
import { HeadingH1 } from "components/headingH1/headingH1";
import { AddPhone } from "components/createContact/addPhone/addPhone";
import { useStores } from "store/RootStoreContext";
import { useNavigateHelper } from "router/hooks/useNavigateHelper";
import { AddEmail } from "components/createContact/addEmail/AddEmail";
import { AddNameContact } from "components/createContact/addNameContact/AddNameContact";
import { Button } from "components/button/Button";
import { observer } from "mobx-react";

/**
 * @description Страница создания контакта.
 */
export const CreateContactPage = observer(() => {
    const { authStore, contactListStore, contactEditStore } = useStores();
    const { navigateToDashboardPage } = useNavigateHelper();

    useEffect(() => {
        if (!authStore.isAuth) {
            navigateToDashboardPage();
        }
    }, [authStore.isAuth, navigateToDashboardPage]);

    return (
        <div className={styles.createContactPage}>
            <HeadingH1 title="Создание контакта" />
            <form className={styles.form} onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                handleClickSendContact();
            }}>
                <AddNameContact contactEditStore={contactEditStore} />
                <AddPhone contactEditStore={contactEditStore} />
                <AddEmail contactViewStore={contactListStore} />
                <Button text="send"
                        onClick={handleClickSendContact} />
            </form>
        </div>
    );

    function handleClickSendContact() {
        contactEditStore.validateFields();
        if (contactEditStore.errorList.length === 0) {
            contactEditStore.pushContact();
            navigateToDashboardPage();
        }
    }
});
