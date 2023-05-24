import React, {useContext, useEffect} from 'react';
import {StoreContext} from "../../App";
import {observer} from "mobx-react";
import Customer from "../customer/Customer";
import {Button} from "../button/Button";
import "./CustomerList.scss";
import {useNavigate} from "react-router";
import {RouterPathList} from "../../router/RouterPathList";
import H4 from "../header/H4";
import Search from "../search/Search";


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
        customerStore.clearSearchField();
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

    /**
     * Проверить нотификацию
     */
    const checkNotify = () => {
        customerStore.checkNotifyOnHand();
    }

    /**
     * Обновить данные
     */
    const updateHandData = () => {
        customerStore.get();
    }

    return (
        <div className="customerList">
            <div className="headerList">
                <H4 text="Список заказчиков"/>
                <Button onClick={updateHandData}
                        classname="updateData imgBtn"
                        text="Обновить данные"/>
                <Button onClick={checkNotify}
                        classname="checkNotify imgBtn"
                        text="Нотифицировать"/>
                <Button onClick={addCustomer}
                        classname="addCustomer mainAction"
                        text="Добавить"/>
            </div>
            <Search/>
            <Customer/>
        </div>
    );
});

export default CustomerList;