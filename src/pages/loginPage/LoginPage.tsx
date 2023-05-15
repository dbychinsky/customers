import React, {useContext} from 'react';
import FormRow from "../../component/formRow/FormRow";
import InputTextField from "../../component/inputField/InputField";
import {StoreContext} from "../../App";
import {observer} from "mobx-react";
import {Button} from "../../component/button/Button";
import {useNavigate} from "react-router";
import {RouterPathList} from "../../router/RouterPathList";
import "./LoginPage.scss";

/**
 * Страница аутентификации
 */
const LoginPage = observer(() => {
    const authStore = useContext(StoreContext).authStore;
    const navigate = useNavigate();

    const auth = () => {
        if (authStore.auth()) {
            navigate(RouterPathList.CUSTOMER_LIST_PAGE);
        }
    }

    return (
        <div className="loginPage">
            <div className="titleLoginPage">
                <h1>
                    <span>Customer</span>
                    <span>Service</span>
                    <span>Customer</span>
                    <span>care</span>
                </h1>
            </div>
            <div className="contentLoginPage">
                <div className="form">
                    <FormRow label="Имя пользователя">
                        <InputTextField value={authStore.login}
                                        changeHandler={authStore.handleChangeLogin}
                                        name="login"
                                        type="text"/>
                    </FormRow>
                    <FormRow label="Пароль">
                        <InputTextField value={authStore.password}
                                        changeHandler={authStore.handleChangePassword}
                                        name="password"
                                        type="text"/>
                    </FormRow>
                    <div className="actionBar">
                        <Button onClick={auth}
                                classname="mainAction"
                                text="Войти"/>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default LoginPage;