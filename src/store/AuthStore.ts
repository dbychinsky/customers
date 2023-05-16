import {makeAutoObservable, runInAction} from "mobx";
import React from "react";

/**
 * Тип ошибки к полю
 */
export type FieldError = {

    /**
     * Имя поля
     */
    field: string,

    /**
     * Текстовое сообщение
     */
    message: string
}

/**
 * Store для работы с Auth
 */
export class AuthStore {
    public login: string = '';
    public password: string = '';
    private loginApp: string = '1';
    private passwordApp: string = '1';
    public errorList: FieldError[] = [];
    public isAuth: boolean = false;

    constructor() {
        makeAutoObservable(this);
        this.handleChangeLogin = this.handleChangeLogin.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    /**
     * Метод установки логина
     * @param e
     */
    public handleChangeLogin(e: React.ChangeEvent<HTMLInputElement>) {
        runInAction(() => {
            this.login = e.target.value
        })
    };

    /**
     * Метод установки пароля
     * @param e
     */
    public handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
        runInAction(() => {
            this.password = e.target.value
        })
    };

    /**
     * Очистка полей формы при разлогировании
     */
    public clearFields() {
        runInAction(() => {
            this.login = '';
            this.password = '';
        })
    }

    /**
     * Метод аутентификации
     */
    public auth() {
        runInAction(() => {
            this.errorList = [];
        })
        if (this.login !== this.loginApp) {
            runInAction(() => {
                this.errorList.push({field: 'login', message: 'Неверный логин'})
            })
        } else {
            if (this.password !== this.passwordApp) {
                runInAction(() => {
                    this.errorList.push({field: 'password', message: 'Неверный пароль'})
                })
            } else {
                this.createUserToken();
            }
        }
    }

    /**
     * Создание токена пользователя приложением в sessionStorage
     */
    private createUserToken() {
        sessionStorage.setItem('authentication', 'true');
        runInAction(() => {
            this.isAuth = true;
        });
    }

    /**
     * Получение токена LS
     * @private
     */
    private loadUserToken() {
        const result = sessionStorage.getItem('authentication');
        if (result) {
            this.isAuth = true;
        }
    }

    /**
     * Очищение токена из sessionStorage
     */
    public clearSessionStorage() {
        sessionStorage.clear();
        runInAction(() => {
            this.isAuth = false;
        });
    };

    /**
     * Проверка наличия токена в LS
     */
    public checkAuth() {
        this.loadUserToken();
    }


}
