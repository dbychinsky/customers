import {Route, Routes} from "react-router";
import {RouterPathList} from "./RouterPathList";
import CustomerListPage from "../pages/CustomerListPage";
import CustomerEditPage from "../pages/CustomerEditPage";
import LoginPage from "../pages/LoginPage";

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
            </Route>

        </Routes>
    );
};

// <Routes>
//     <Route path={RouterPathList.ROOT_PATH} element={<LoginPage/>}/>
//     <Route path={RouterPathList.ROOM_LIST_PAGE}>
//         <Route index element={<RoomViewPage/>}/>
//         <Route path={RouterPathList.ROOM_LIST_PAGE} element={<RoomViewPage/>}/>
//
//         <Route path={RouterPathList.ROOM_506}>
//             <Route index element={<Room506Page/>}/>
//             <Route path={RouterPathList.PLACE_EDIT_PAGE} element={<PlaceEdit/>}/>
//             <Route path={RouterPathList.PLACE_EDIT_ID_PAGE} element={<PlaceEdit/>}/>
//         </Route>
//
//         <Route path={RouterPathList.ROOM_607}>
//             <Route index element={<Room607Page/>}/>
//             <Route path={RouterPathList.PLACE_EDIT_PAGE} element={<PlaceEdit/>}/>
//             <Route path={RouterPathList.PLACE_EDIT_ID_PAGE} element={<PlaceEdit/>}/>
//             <Route path={RouterPathList.SHELF_607} element={<Shelf607/>}/>
//         </Route>
//     </Route>
// </Routes>