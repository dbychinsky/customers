import React from 'react';
import CustomerList from "../../component/customerList/CustomerList";
import {observer} from "mobx-react";
import "./DashboardPage.scss";
import Header from "../../component/header/Header";
import CustomerListReminderWidget from "../../component/customerListReminderWidget/CustomerListReminderWidget";

/**
 * Страница со списком заказчиков
 */
const DashboardPage = observer(() => {
    return (

        <div className="dashboard">
            <Header/>
            <CustomerList/>
            <CustomerListReminderWidget/>
        </div>
    );
});

export default DashboardPage;