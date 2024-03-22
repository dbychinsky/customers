import React from 'react';
import {observer} from "mobx-react";
import styles from "view/loginPage/LoginPage.module.scss";
import {LoginForm} from "view/loginPage/form/LoginForm";


/**
 * @description Страница аутентификации
 */
export const LoginPage = observer(() => {
    return (
        <div className={styles.loginPage}>
            <div className={styles.titleLoginPage}>
                <div className={styles.content}>
                    <div className={styles.logotype}/>
                    <div className={styles.imgGirl}></div>
                    <div className={styles.imgBox}>
                        <div className={styles.imgPeople}></div>
                        <div className={styles.imgSchedule}></div>
                        <div className={styles.imgGraph}></div>
                    </div>
                </div>
            </div>
            <div className={styles.contentLoginPage}>
                <div className={styles.title}>Войти</div>
                <LoginForm/>
            </div>
        </div>
    );
});