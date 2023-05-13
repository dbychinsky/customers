import React from 'react';
import CustomerList from "../component/customerList/CustomerList";
import {Button} from "../component/button/Button";
import {useNavigate} from "react-router";
import {RouterPathList} from "../router/RouterPathList";
import {observer} from "mobx-react";

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
        <div className="customerPage">
            <h1>Заказчики</h1>
            <Button onClick={addCustomer} text="add"/>
            <CustomerList/>
        </div>
    );
});

export default CustomerListPage;