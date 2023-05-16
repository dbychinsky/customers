import React from 'react';
import {observer} from "mobx-react";
import CustomerListReminder from "../../component/customerList/cutomerListReminder/СustomerListReminder";

const CustomerListReminderPage = observer(() => {
    return (
        <div className="customerListReminder">
            <CustomerListReminder/>
        </div>
    );
});

export default CustomerListReminderPage;