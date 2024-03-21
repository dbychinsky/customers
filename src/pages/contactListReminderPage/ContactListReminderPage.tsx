import {observer} from "mobx-react";
import ContactListReminder from "../../component/contactListReminder/ContactListReminder";
import "./ContactListReminderPage.scss";
import {useNavigate} from "react-router";
import {useContext, useEffect} from "react";
import {StoreContext} from "../../App";
import {RouterPathList} from "../../router/RouterPathList";

const ContactListReminderPage = observer(() => {
    const navigate = useNavigate();
    const authStore = useContext(StoreContext).authStore;

    useEffect(() => {
        if (!authStore.checkAuth()) {
            navigate(RouterPathList.DASHBOARD_PAGE);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="contactListReminderPage">
            <ContactListReminder/>
        </div>
    );
});

export default ContactListReminderPage;