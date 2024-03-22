import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react";
import {InputFieldEnum} from "components/inputField/types";
import styles from "./LoginForm.module.scss";
import {StoreContext} from "App";
import {Button} from "components/button/Button";
import {useNavigateHelper} from "router/hooks/useNavigateHelper";
import {FormRow} from "components/formRow/FormRow";
import {ButtonFormType} from "components/button/types";

export const LoginForm = observer(() => {
    const authStore = useContext(StoreContext).authStore;
    const {navigateToDashboardPath} = useNavigateHelper();

    useEffect(() => {
        authStore.clearFields();
        authStore.clearSessionStorage();
    }, [authStore])

    function handleClickAuthentication() {
        authStore.authentication();
        if (authStore.errorList.length === 0) {
            navigateToDashboardPath();
        } else {
            console.log("Ошибка авторизации")
        }
    }

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
                     errorList={authStore.errorList}/>
            <FormRow inputValue={authStore.password}
                     inputName="password"
                     inputChangeHandler={authStore.handleChangePassword}
                     inputType={InputFieldEnum.password}
                     labelText="Пароль"
                     errorList={authStore.errorList}/>

            <div className={styles.actionBar}>
                <Button
                    onClick={handleClickAuthentication}
                    text="Войти"
                    type={ButtonFormType.button}
                    variant="primary"
                    isDisabled={!authStore.login || !authStore.password ? true : false}
                />
            </div>
        </form>
    );
});
