import React from 'react';
import { makeAutoObservable, runInAction } from 'mobx';
import { FieldError } from 'components/inputField/types';

/**
 * Store для работы с Auth
 */
export class AuthStore {
    login = '';
    password = '';
    loginApp = '1';
    // private loginApp: string = "Sofi";
    passwordApp = '1';
    // private passwordApp: string = "sf1807";
    errorList: FieldError[] = [];
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
        this.handleChangeLogin = this.handleChangeLogin.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    /**
     * @description Метод установки логина
     * @param e
     */
    public handleChangeLogin(e: React.ChangeEvent<HTMLInputElement>) {
        runInAction(() => {
            this.login = e.target.value;
            this.errorList = this.errorList.filter((item) => item.field !== 'login');
        });
    }

    /**
     * @description Метод установки пароля
     * @param e
     */
    public handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
        runInAction(() => {
            this.password = e.target.value;
            this.errorList = this.errorList.filter((item) => item.field !== 'password');
        });
    }

    /**
     * @description Очистка полей формы при разлогировании
     */
    public clearFields() {
        runInAction(() => {
            this.login = '';
            this.password = '';
        });
    }

    /**
     * @description Метод аутентификации
     */
    public authentication() {
        runInAction(() => {
            this.errorList = [];
        });

        if (this.login !== this.loginApp) {
            runInAction(() => {
                this.errorList.push({ field: 'login', message: 'Неверный логин' });
            });
        }

        if (this.password !== this.passwordApp) {
            runInAction(() => {
                this.errorList.push({ field: 'password', message: 'Неверный пароль' });
            });
        }

        if (this.errorList.length === 0) {
            this.createUserToken();
        }
    }

    /**
     * @description Создание токена пользователя приложением в sessionStorage
     */
    private createUserToken() {
        sessionStorage.setItem('authentication', 'true');
        runInAction(() => {
            this.isAuth = true;
        });
    }

    /**
     * @description Получение токена LS
     * @private
     */
    private loadUserToken() {
        const result = sessionStorage.getItem('authentication');
        if (result) {
            this.isAuth = true;
        }
    }

    /**
     * @description Очищение токена из sessionStorage
     */
    public clearSessionStorage() {
        sessionStorage.clear();
        runInAction(() => {
            this.isAuth = false;
        });
    }

    /**
     * @description Проверка наличия токена в LS
     */
    public checkAuth(): boolean {
        this.loadUserToken();
        return this.isAuth;
    }
}
