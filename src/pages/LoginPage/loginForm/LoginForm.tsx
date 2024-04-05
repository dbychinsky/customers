import React, { useEffect } from "react";
import { observer } from "mobx-react";
import styles from "./LoginForm.module.scss";
import { useNavigateHelper } from "router/hooks/useNavigateHelper";

import { useStores } from "store/RootStoreContext";
import { InputFieldEnum } from "components/inputField/types";
import { FormRow } from "components/formRow/FormRow";
import { Button } from "components/button/Button";
import { ButtonFormEnum } from "components/button/types";

export const LoginForm = observer(() => {
    const { authStore } = useStores();
    const { navigateToDashboardPage } = useNavigateHelper();

    useEffect(() => {
        authStore.clearFields();
        authStore.clearSessionStorage();
    }, [authStore]);

    return (
        <form className={styles.loginForm} onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            handleClickAuthentication();
        }}>
            <FormRow inputValue={authStore.login}
                     inputName="login"
                     inputChangeHandler={authStore.handleChangeLogin}
                     inputType={InputFieldEnum.text}
                     labelText="Логин"
                     errorList={authStore.errorList} />
            <FormRow inputValue={authStore.password}
                     inputName="password"
                     inputChangeHandler={authStore.handleChangePassword}
                     inputType={InputFieldEnum.password}
                     labelText="Пароль"
                     errorList={authStore.errorList} />

            <div className={styles.actionBar}>
                <Button
                    onClick={handleClickAuthentication}
                    text="Войти"
                    type={ButtonFormEnum.button}
                    variant="primary"
                    isDisabled={!authStore.login || !authStore.password}
                />
            </div>
        </form>
    );

    function handleClickAuthentication() {
        authStore.authentication();
        if (authStore.errorList.length === 0) {
            navigateToDashboardPage();
        } else {
            console.log("Ошибка авторизации");
        }
    }
});
