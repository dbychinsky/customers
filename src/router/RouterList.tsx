import {Route, Routes} from "react-router";
import {RouterPathList} from "./RouterPathList";
import CustomerListPage from "../pages/customerListPage/CustomerListPage";
import CustomerEditPage from "../pages/customerEditPage/CustomerEditPage";
import LoginPage from "../pages/loginPage/LoginPage";
import CustomerListReminderPage from "../pages/customerListReminderPage/CustomerListReminderPage";
import SettingPage from "../pages/settingPage/SettingPage";

/**
 * Роутинг приложения
 */
export const RoutersProject = () => {
    return (
        <Routes>
            <Route path={RouterPathList.ROOT_PATH} element={<LoginPage/>}/>

            <Route path={RouterPathList.CUSTOMER_LIST_PAGE}>
                <Route index element={<CustomerListPage/>}/>
                <Route path={RouterPathList.CUSTOMER_EDIT_PAGE} element={<CustomerEditPage/>}/>
                <Route path={RouterPathList.CUSTOMER_EDIT_ID_PAGE} element={<CustomerEditPage/>}/>
            </Route>

            <Route path={RouterPathList.CUSTOMER_LIST_REMINDER_PAGE}>
                <Route index element={<CustomerListReminderPage/>}/>
                <Route path={RouterPathList.CUSTOMER_EDIT_ID_PAGE} element={<CustomerEditPage/>}/>
            </Route>

            <Route path={RouterPathList.SETTING_PAGE} element={<SettingPage/>}/>

        </Routes>
    );
};

// <Route path={ROOT_PATH} element={<MainPage/>}/>
// <Route path={PROJECT_PAGE_PATH}>
//     <Route index element={<ProjectList/>}/>
//     <Route path={PROJECT_FORM_PATH} element={<ProjectEdit/>}/>
//     <Route path={PROJECT_ID_PATH} element={<ProjectEdit/>}/>
// </Route>