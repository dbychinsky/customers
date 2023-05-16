import React from 'react';
import CustomerList from "../../component/customerList/CustomerList";
import {Button} from "../../component/button/Button";
import {useNavigate} from "react-router";
import {RouterPathList} from "../../router/RouterPathList";
import {observer} from "mobx-react";
import "./CustomerListPage.scss";
import H1 from "../../component/header/H1";

/**
 * Страница со списком заказчиков
 */
const CustomerListPage = observer(() => {

    return (
        <div className="customerListPage">
            {/*<H1 text="Заказчики"/>*/}
            <div className="customerListWrapper">
                <CustomerList/>
            </div>
        </div>
    );
});

export default CustomerListPage;