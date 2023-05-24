import {makeAutoObservable, runInAction} from "mobx";
import {Setting} from "../model/Setting";
import {server} from "../App";
import React from "react";

/**
 * Store для работы с LoanStore
 */
export class SettingStore {

    /**
     * Список опций
     */
    public settingList: Setting = new Setting();

    /**
     * Сообщения
     */
    public settingMessages: string = '';

    constructor() {
        makeAutoObservable(this);
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
    }

    /**
     * Получение данных
     */
    public get() {
        server.getSetting()
            .then(response => {
                runInAction(() => {
                    this.settingList = response;
                });
            })
            .then(() => {
                    runInAction(() => {
                        this.settingMessages = '';
                    })
                }
            );
    };

    public save() {
        server.updateSetting(this.settingList)
            .then(() => {
                    runInAction(() => {
                        this.settingMessages = 'СОхранено';
                    })
                }
            );
    }

    /**
     * Редактирование параметров
     * @param e
     */
    public handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        runInAction(() => {
            this.settingList = {
                ...this.settingList, [e.target.name]: e.target.value
            }
        });
    };


}
