import React, {useContext, useEffect} from 'react';
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
    const settingStore = useContext(StoreContext).settingStore;

    const navigate = useNavigate();

    useEffect(()=>{
        settingStore.get();
    })

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
                <h2>
                    <span>Contact</span>
                    <span>care  <span>&</span></span>
                    <span>Service</span>
                </h2>
            </div>
            {/*<div className="titleLoginPage">*/}
            {/*    <H2>*/}
            {/*        <span>Contact</span>*/}
            {/*        <span>Service</span>*/}
            {/*        <span>Contact</span>*/}
            {/*        <span>Care</span>*/}
            {/*    </H2>*/}
            {/*</div>*/}
            <div className="contentLoginPage">
                <Form fieldList={fieldList}
                      actionList={actionList}/>
            </div>
        </div>
    );
});

export default LoginPage;