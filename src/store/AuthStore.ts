import {makeAutoObservable, runInAction} from "mobx";
import React from "react";

/**
 * Store для работы с Auth
 */
export class AuthStore {
    public login: string = '';
    public password: string = '';
    private loginApp: string = '1';
    private passwordApp: string = '1';

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
        console.log(this.login)
    }

    /**
     * Метод установки пароля
     * @param e
     */
    public handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
        runInAction(() => {
            this.password = e.target.value
        })
        console.log(this.password)
    }

    /**
     * Метод аутентификации
     * return boolean
     */
    public auth(): boolean {
        let result: boolean = false;
        if (this.login === this.loginApp) {
            if (this.password === this.passwordApp) {
                result = true
            } else {
                console.log('pasw')
            }
        } else {
            console.log('login')
        }
        return result
    }
}
