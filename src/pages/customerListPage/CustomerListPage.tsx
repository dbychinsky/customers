import React from 'react';
import CustomerList from "../../component/customerList/CustomerList";
import {Button} from "../../component/button/Button";
import {useNavigate} from "react-router";
import {RouterPathList} from "../../router/RouterPathList";
import {observer} from "mobx-react";
import CustomerListReminder from "../../component/customerList/cutomerListReminder/СustomerListReminder";
import "./CustomerListPage.scss";

/**
 * Страница со списком заказчиков
 */
const CustomerListPage = observer(() => {
    const navigate = useNavigate();

    /**
     * Добавит заказчика
     */
    const addCustomer = () => {
        navigate(RouterPathList.CUSTOMER_EDIT_PAGE)
    }

    return (
        <div className="customerListPage">
            <h1>Заказчики</h1>
            <Button onClick={addCustomer} text="add"/>
            <div className="customerListWrapper">
                <CustomerList/>
                <CustomerListReminder/>
            </div>
        </div>
    );
});

export default CustomerListPage;