import React, {useContext} from 'react';
import FormRow from "../component/formRow/FormRow";
import InputTextField from "../component/inputField/InputField";
import {StoreContext} from "../App";
import {observer} from "mobx-react";
import {Button} from "../component/button/Button";
import {useNavigate} from "react-router";
import {RouterPathList} from "../router/RouterPathList";

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
            <div className="form">
                <FormRow label="Login">
                    <InputTextField value={authStore.login}
                                    changeHandler={authStore.handleChangeLogin}
                                    name="login"
                                    type="text"/>
                </FormRow>
                <FormRow label="Password">
                    <InputTextField value={authStore.password}
                                    changeHandler={authStore.handleChangePassword}
                                    name="password"
                                    type="text"/>
                </FormRow>
                <Button onClick={auth} text="auth"/>
            </div>
        </div>
    );
});

export default LoginPage;