import React, {useContext, useEffect} from 'react';
import {StoreContext} from "../../App";
import {observer} from "mobx-react";
import Customer from "./customer/Customer";
import {Button} from "../button/Button";

/**
 * Список заказчиков
 */
const CustomerList = observer(() => {

    const customerStore = useContext(StoreContext).customerStore;

    /**
     * Получаем список заказчиков
     */
    useEffect(() => {
        customerStore.get();
    }, []);

    useEffect(() => {
        // customerStore.start();
    }, [])

    return (
        <div className="customerList">
            <h2>Список заказчиков</h2>
            <Customer/>
            <Button onClick={() => customerStore.startTemp()} text="start temp"/>
        </div>
    );
});

export default CustomerList;