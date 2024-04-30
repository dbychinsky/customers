import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import styles from 'pages/LoginPage/loginForm/LoginForm.module.scss';
import { useNavigateHelper } from 'router/hooks/useNavigateHelper';
import { useStores } from 'store/RootStoreContext';
import { InputFieldEnum } from 'components/inputField/types';
import { FormRow } from 'components/formRow/FormRow';
import { Button } from 'components/button/Button';
import { ButtonFormEnum } from 'components/button/types';

export const LoginForm = observer(() => {
    const { authStore } = useStores();
    const { navigateToDashboardPage } = useNavigateHelper();

    useEffect(() => {
        authStore.clearFields();
        authStore.clearSessionStorage();
    }, [authStore]);

    return (
        <form
            className={styles.loginForm}
            onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                handleClickAuthentication();
            }}
        >
            <FormRow
                inputValue={authStore.login}
                inputName='login'
                inputChangeHandler={authStore.handleChangeLogin}
                inputType={InputFieldEnum.text}
                labelText=''
                errorList={authStore.errorList}
                placeHolder='Логин'
                mask={false}
            />
            <FormRow
                inputValue={authStore.password}
                inputName='password'
                inputChangeHandler={authStore.handleChangePassword}
                inputType={InputFieldEnum.password}
                labelText=''
                errorList={authStore.errorList}
                placeHolder='Пароль'
                mask={false}
            />
            {/*<Button text='go' onClick={convertData} />*/}
            <div className={styles.actionBar}>
                <Button
                    onClick={handleClickAuthentication}
                    text='Войти'
                    type={ButtonFormEnum.button}
                    variant='primary'
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
            console.log('Ошибка авторизации');
        }
    }

    // function convertData() {
    //     contactEditStore.convertContactList().then(() => {
    //         contactListStore.getContactList();
    //     });
    // }
});
