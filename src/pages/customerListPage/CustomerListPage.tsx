import React from 'react';
import CustomerList from "../../component/customerList/CustomerList";
import {observer} from "mobx-react";
import "./CustomerListPage.scss";
import Header from "../../component/header/Header";
import CustomerListReminderWidget from "../../component/customerListReminderWidget/CustomerListReminderWidget";

/**
 * Страница со списком заказчиков
 */
const CustomerListPage = observer(() => {
    return (

        <div className="customerListPage">
            <Header/>
            <CustomerList/>
            <CustomerListReminderWidget/>
        </div>
    );
});

export default CustomerListPage;