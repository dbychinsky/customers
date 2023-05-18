import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react";
import CustomerListReminder from "../../component/customerListReminder/СustomerListReminder";
import H2 from "../../component/header/H2";
import "./CustomerListReminderPage.scss";
import {StoreContext} from "../../App";

const CustomerListReminderPage = observer(() => {
    const customerStore = useContext(StoreContext).customerStore;
    useEffect(() => {

    }, [])

    return (
        <div className="customerListReminderPage">
            <H2 text="Список элементов нотификации"/>
            <CustomerListReminder/>
        </div>
    );
});

export default CustomerListReminderPage;