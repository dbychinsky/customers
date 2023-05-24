import {observer} from "mobx-react";
import ContactListReminder from "../../component/contactListReminder/ContactListReminder";
import "./ContactListReminderPage.scss";
import Header from "../../component/header/Header";
import H1 from "../../component/header/H1";

const ContactListReminderPage = observer(() => {

    return (
        <div className="contactListReminderPage">
            <Header title="Нотификации"/>
            <H1 text="Нотификации"/>
            <ContactListReminder/>
        </div>
    );
});

export default ContactListReminderPage;