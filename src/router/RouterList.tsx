import {Route, Routes} from "react-router";
import {RouterPathList} from "./RouterPathList";
import ContactEditPage from "../pages/contactEditPage/ContactEditPage";
import LoginPage from "../pages/loginPage/LoginPage";
import ContactListReminderPage from "../pages/contactListReminderPage/ContactListReminderPage";
import SettingPage from "../pages/settingPage/SettingPage";
import ContactListPage from "../pages/contactListPage/ContactListPage";

/**
 * Роутинг приложения
 */
export const RoutersProject = () => {
    return (
        <Routes>
            <Route path={RouterPathList.ROOT_PATH} element={<LoginPage/>}/>

            <Route path={RouterPathList.CONTACT_LIST_PAGE}>
                <Route index element={<ContactListPage/>}/>
                <Route path={RouterPathList.CONTACT_EDIT_PAGE} element={<ContactEditPage/>}/>
                <Route path={RouterPathList.CONTACT_EDIT_ID_PAGE} element={<ContactEditPage/>}/>
            </Route>

            <Route path={RouterPathList.CONTACT_LIST_REMINDER_PAGE}>
                <Route index element={<ContactListReminderPage/>}/>
                <Route path={RouterPathList.CONTACT_EDIT_ID_PAGE} element={<ContactEditPage/>}/>
            </Route>

            <Route path={RouterPathList.SETTING_PAGE} element={<SettingPage/>}/>

        </Routes>
    );
};
