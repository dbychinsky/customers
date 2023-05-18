import React, {useContext, useEffect} from 'react';
import {StoreContext} from "../../App";
import {observer} from "mobx-react";
import Customer from "../customer/Customer";
import {Button} from "../button/Button";
import "./CustomerList.scss";
import {useNavigate} from "react-router";
import {RouterPathList} from "../../router/RouterPathList";
import InputTextField from "../inputField/InputField";
import FormRow from "../formRow/FormRow";
import H3 from "../header/H3";


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
            <div className="headerList">
                <H3 text="Список заказчиков"/>
                <Button onClick={addCustomer}
                        classname="addCustomer mainAction"
                        text="Добавить"/>
            </div>
            <div className="search">

                <FormRow name="products" label="Продукция" field={
                    <InputTextField value={customerStore.newCustomer.products}
                                    changeHandler={customerStore.handleChange}
                                    name="products" type="text"/>
                }/>

                <FormRow name="contactFace" label="Контактное лицо" field={
                    <InputTextField value={customerStore.newCustomer.contactFace}
                                    changeHandler={customerStore.handleChange}
                                    name="contactFace" type="text"/>
                }/>

                <FormRow name="phone" label="Телефон" field={
                    <InputTextField value={customerStore.newCustomer.phone}
                                    changeHandler={customerStore.handleChange}
                                    name="phone" type="text"/>
                }/>

                <FormRow name="email" label="Email" field={
                    <InputTextField value={customerStore.newCustomer.email}
                                    changeHandler={customerStore.handleChange}
                                    name="email" type="text"/>
                }/>

                <FormRow name="description" label="Описание" field={
                    <InputTextField value={customerStore.newCustomer.email}
                                    changeHandler={customerStore.handleChange}
                                    name="description" type="text"/>
                }/>

                <FormRow name="reminder" label="Напомнить" field={
                    <InputTextField value={customerStore.newCustomer.email}
                                    changeHandler={customerStore.handleChange}
                                    name="description" type="text"/>
                }/>

                <FormRow name="reminderDate" label="Дата" field={
                    <InputTextField value={customerStore.newCustomer.email}
                                    changeHandler={customerStore.handleChange}
                                    name="reminderDate" type="text"/>
                }/>

                <div className="actionBar"></div>
            </div>

            <Customer/>
            <Button onClick={() => customerStore.startTemp()} text="start temp"/>
        </div>
    );
});

export default CustomerList;