import {Route, Routes} from "react-router";
import {RouterPathList} from "./RouterPathList";
import DashboardPage from "../pages/dashboardPage/DashboardPage";
import CustomerEditPage from "../pages/customerEditPage/CustomerEditPage";
import LoginPage from "../pages/loginPage/LoginPage";
import CustomerListReminderPage from "../pages/customerListReminderPage/CustomerListReminderPage";

/**
 * Роутинг приложения
 */
export const RoutersProject = () => {
    return (
        <Routes>
            <Route path={RouterPathList.ROOT_PATH} element={<LoginPage/>}/>

            <Route path={RouterPathList.CUSTOMER_LIST_PAGE}>
                <Route index element={<DashboardPage/>}/>
                <Route path={RouterPathList.CUSTOMER_EDIT_PAGE} element={<CustomerEditPage/>}/>
                <Route path={RouterPathList.CUSTOMER_EDIT_ID_PAGE} element={<CustomerEditPage/>}/>
            </Route>

            <Route path={RouterPathList.CUSTOMER_LIST_REMINDER_PAGE} element={<CustomerListReminderPage/>}/>

        </Routes>
    );
};

// <Route path={ROOT_PATH} element={<MainPage/>}/>
// <Route path={PROJECT_PAGE_PATH}>
//     <Route index element={<ProjectList/>}/>
//     <Route path={PROJECT_FORM_PATH} element={<ProjectEdit/>}/>
//     <Route path={PROJECT_ID_PATH} element={<ProjectEdit/>}/>
// </Route>