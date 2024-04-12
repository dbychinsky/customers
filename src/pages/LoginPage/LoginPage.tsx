import React from 'react';
import { observer } from 'mobx-react';
import styles from 'pages/LoginPage/LoginPage.module.scss';
import { LoginForm } from 'pages/LoginPage/loginForm/LoginForm';

/**
 * @description Страница аутентификации
 */
export const LoginPage = observer(() => (
    <div className={styles.loginPage}>
        <div className={styles.titleLoginPage}>
            <div className={styles.content}>
                <div className={styles.logotype} />
                <div className={styles.imgGirl} />
                <div className={styles.imgBox}>
                    <div className={styles.imgPeople} />
                    <div className={styles.imgSchedule} />
                    <div className={styles.imgGraph} />
                </div>
            </div>
        </div>
        <div className={styles.contentLoginPage}>
            <div className={styles.title}>Войти</div>
            <LoginForm />
        </div>
    </div>
));
