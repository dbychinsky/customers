import React, {useContext, useEffect} from 'react';
import {StoreContext} from "../../App";
import {observer} from "mobx-react";
import Customer from "./customer/Customer";
import {Button} from "../button/Button";
import "./CustomerList.scss";
import H2 from "../header/H2";
import {useNavigate} from "react-router";
import {RouterPathList} from "../../router/RouterPathList";


/**
 * Список заказчиков
 */
const CustomerList = observer(() => {

    const customerStore = useContext(StoreContext).customerStore;
    const navigate = useNavigate();

    /**
     * Получаем список заказчиков
     */
    useEffect(() => {
        customerStore.get();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // customerStore.start();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    /**
     * Добавить заказчика
     */
    const addCustomer = () => {
        navigate(RouterPathList.CUSTOMER_EDIT_PAGE)
    }

    return (
        <div className="customerList">
            <H2 text="Список заказчиков"/>
            <Button onClick={addCustomer} text="add"/>
            <div className="search"></div>
            <Customer/>
            <Button onClick={() => customerStore.startTemp()} text="start temp"/>
        </div>
    );
});

export default CustomerList;