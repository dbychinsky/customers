import React from 'react';
import CustomerList from "../../component/customerList/CustomerList";
import {observer} from "mobx-react";
import "./DashboardPage.scss";
import Header from "../../component/header/Header";

/**
 * Страница со списком заказчиков
 */
const DashboardPage = observer(() => {
    return (

        <div className="dashboard">
            <Header/>
            <CustomerList/>
        </div>
    );
});

export default DashboardPage;