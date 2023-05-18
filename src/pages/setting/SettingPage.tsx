import React from 'react';
import Header from "../../component/header/Header";
import H1 from "../../component/header/H1";
import "./SettingPage.scss";

const SettingPage = () => {
    return (
        <div className="settingPage">
            <Header title="Настройки"/>
            <H1 text="Настройки"/>
        </div>
    );
};

export default SettingPage;