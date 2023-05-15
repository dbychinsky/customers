import React, {useContext, useState} from 'react';
import FormRow from "../../component/formRow/FormRow";
import InputTextField from "../../component/inputField/InputField";
import {StoreContext} from "../../App";
import {observer} from "mobx-react";
import {Button} from "../../component/button/Button";
import {useNavigate} from "react-router";
import {RouterPathList} from "../../router/RouterPathList";
import "./LoginPage.scss";
import Form, {ActionListType, Field} from "../../component/form/Form";

/**
 * Страница аутентификации
 */
const LoginPage = observer(() => {
    const authStore = useContext(StoreContext).authStore;
    const navigate = useNavigate();

    const auth = () => {
        authStore.auth();
        if (authStore.errorList.length === 0) {
            navigate(RouterPathList.CUSTOMER_LIST_PAGE);
        } else {
            console.log('Ошибка авторизации')
        }
    };

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
            field: <InputTextField
                value={authStore.password}
                changeHandler={authStore.handleChangePassword}
                name="password"
                type="text"/>
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
                <h1>
                    <span>Customer</span>
                    <span>Service</span>
                    <span>Customer</span>
                    <span>care</span>
                </h1>
            </div>
            <div className="contentLoginPage">
                <Form fieldList={fieldList}
                      actionList={actionList}/>
            </div>
        </div>
    );
});

export default LoginPage;