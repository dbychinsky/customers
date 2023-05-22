import {observer} from "mobx-react";
import CustomerListReminder from "../../component/customerListReminder/СustomerListReminder";
import "./CustomerListReminderPage.scss";
import Header from "../../component/header/Header";
import H1 from "../../component/header/H1";

const CustomerListReminderPage = observer(() => {

    return (
        <div className="customerListReminderPage">
            <Header title="Нотификации"/>
            <H1 text="Нотификации"/>
            <CustomerListReminder/>
        </div>
    );
});

export default CustomerListReminderPage;