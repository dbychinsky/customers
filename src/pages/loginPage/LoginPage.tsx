import React, {useContext, useEffect} from 'react';
import InputTextField from "../../component/inputField/InputField";
import {StoreContext} from "../../App";
import {observer} from "mobx-react";
import {Button} from "../../component/button/Button";
import {useNavigate} from "react-router";
import {RouterPathList} from "../../router/RouterPathList";
import "./LoginPage.scss";
import Form, {ActionListType, Field} from "../../component/form/Form";
import InputTextFieldPassword from "../../component/inputFieldPassword/InputFieldPassword";

/**
 * Страница аутентификации
 */
const LoginPage = observer(() => {
    const authStore = useContext(StoreContext).authStore;

    const navigate = useNavigate();

    const auth = () => {
        authStore.auth();
        if (authStore.errorList.length === 0) {
            navigate(RouterPathList.CONTACT_LIST_PAGE);
        } else {
            console.log('Ошибка авторизации')
        }
    };

    useEffect(() => {
        authStore.clearFields();
        authStore.clearSessionStorage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /**
     * Список полей
     */
    const fieldList: Field[] = [
        {
            name: "login",
            label: "Имя пользователя",
            field: <InputTextField
                value={authStore.login}
                changeHandler={authStore.handleChangeLogin}
                name="login"
                type="text"/>
        },
        {
            name: "password",
            label: "Пароль",
            field: <InputTextFieldPassword
                value={authStore.password}
                changeHandler={authStore.handleChangePassword}
                name="password"
                type="password"/>
        }
    ];

    /**
     * Список кнопок
     */
    const actionList: ActionListType[] = [
        {
            name: "submit",
            action: <Button
                onClick={auth}
                classname="mainAction"
                text="Войти"
                type="button"/>
        }
    ];

    return (
        <div className="loginPage">
            <div className="titleLoginPage">
                <h2>
                    <span>Customer</span>
                    <span>care  <span>&</span></span>
                    <span>Service</span>
                </h2>
            </div>
            <div className="contentLoginPage">
                <Form fieldList={fieldList}
                      actionList={actionList}/>
            </div>
        </div>
    );
});

export default LoginPage;