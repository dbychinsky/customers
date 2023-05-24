import React, {useContext, useEffect} from 'react';
import Header from "../../component/header/Header";
import H1 from "../../component/header/H1";
import "./SettingPage.scss";
import {StoreContext} from "../../App";
import FormRow from "../../component/formRow/FormRow";
import InputTextField from "../../component/inputField/InputField";
import {observer} from "mobx-react";
import {Button} from "../../component/button/Button";

const SettingPage = observer(() => {
    const settingStore = useContext(StoreContext).settingStore;

    useEffect(() => {
        settingStore.get();
    }, []);

    return (
        <div className="settingPage">
            <Header title="Настройки"/>
            <H1 text="Настройки"/>
            <p>{settingStore.settingMessages}</p>

            <div className="area">
                <p>Настройки приложения: <span>Таймер, указывает частоту проверки нотификаций</span></p>
                <div>
                    <FormRow name="timerNotification"
                             label="Таймер (мин.)"
                             field={<InputTextField value={settingStore.settingList.timerNotification}
                                                    changeHandler={settingStore.handleChange}
                                                    name="timerNotification"
                                                    type="text"/>}/>
                </div>
            </div>

            <div className="area">
                <p>Данные пользователя: <span></span></p>
                <div>
                    <FormRow name="userName"
                             label="Имя"
                             field={<InputTextField value={settingStore.settingList.userName}
                                                    changeHandler={settingStore.handleChange}
                                                    name="userName"
                                                    type="text"/>}/>
                </div>
            </div>


            <Button onClick={settingStore.save}
                    text="Сохранить"
                    classname="mainAction"/>
        </div>
    );
});

export default SettingPage;