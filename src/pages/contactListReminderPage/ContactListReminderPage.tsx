import {observer} from "mobx-react";
import ContactListReminder from "../../component/contactListReminder/ContactListReminder";
import "./ContactListReminderPage.scss";
import Header from "../../component/header/Header";
import H1 from "../../component/header/H1";
import {useNavigate} from "react-router";
import {useContext, useEffect} from "react";
import {StoreContext} from "../../App";
import {RouterPathList} from "../../router/RouterPathList";

const ContactListReminderPage = observer(() => {
    const navigate = useNavigate();
    const authStore = useContext(StoreContext).authStore;

    useEffect(() => {
        if (!authStore.checkAuth()) {
            navigate(RouterPathList.ROOT_PATH);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="contactListReminderPage">
            <Header title="Нотификации"/>
            <H1 text="Нотификации"/>
            <ContactListReminder/>
        </div>
    );
});

export default ContactListReminderPage;