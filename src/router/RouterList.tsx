import {Route, Routes} from "react-router";
import {RouterPathList} from "./RouterPathList";
import {DashboardPage} from "view/dashboardPage/DashboardPage";
import {LoginPage} from "view/loginPage/LoginPage";
import {CurrencyPage} from "view/currencyPage/CurrencyPage";

/**
 * @description Роутинг приложения
 */
export const RoutersProject = () => {
    return (
        <Routes>

            <Route path={RouterPathList.LOGIN_PAGE} element={<LoginPage/>}/>
            <Route path={RouterPathList.DASHBOARD_PAGE} element={<DashboardPage/>}/>
            <Route path={RouterPathList.CURRENCY_PAGE} element={<CurrencyPage/>}/>


            {/*<Route path={RouterPathList.ROOT_PATH} element={<LoginPage/>}/>*/}

            {/*<Route path={RouterPathList.CONTACT_LIST_PAGE}>*/}
            {/*    <Route index element={<ContactListPage/>}/>*/}
            {/*    <Route path={RouterPathList.CONTACT_EDIT_PAGE} element={<ContactEditPage/>}/>*/}
            {/*    <Route path={RouterPathList.CONTACT_EDIT_ID_PAGE} element={<ContactEditPage/>}/>*/}
            {/*</Route>*/}

            {/*<Route path={RouterPathList.CONTACT_LIST_REMINDER_PAGE}>*/}
            {/*    <Route index element={<ContactListReminderPage/>}/>*/}
            {/*    <Route path={RouterPathList.CONTACT_EDIT_ID_PAGE} element={<ContactEditPage/>}/>*/}
            {/*</Route>*/}
        </Routes>
    );
};
